import { useState, useEffect, useMemo } from "react";
import { fetchRates } from "../api/swapApi";
import { MAX_BALANCE } from "../constants";

export interface RateItem {
  currency: string;
  price: number;
  [key: string]: any;
}

export function useSwapFormLogic() {
  const [rates, setRates] = useState<{ [key: string]: RateItem }>({});
  const [fromToken, setFromToken] = useState<string>("");
  const [toToken, setToToken] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const tokens = useMemo(() => Object.keys(rates), [rates]);
  const filteredTokens = useMemo(() => {
    return tokens.filter(symbol =>
      symbol.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [tokens, debouncedSearchTerm]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const data = await fetchRates();
        const convertedRates: { [key: string]: RateItem } = {};
        data.forEach((item: RateItem) => {
          if (!convertedRates[item.currency]) {
            convertedRates[item.currency] = item;
          }
        });
        setRates(convertedRates);
      } catch (err) {
        console.error("Failed to load prices", err);
      }
    };
    fetchPrices();
  }, []);

  const validateInput = () => {
    if (!amount || isNaN(Number(amount))) {
      setError("Amount must be a valid number");
      return false;
    }
    if (Number(amount) <= 0) {
      setError("Amount must be greater than 0");
      return false;
    }
    if (Number(amount) > MAX_BALANCE) {
      setError("Amount exceeds your available balance");
      return false;
    }
    if (fromToken === toToken) {
      setError("Cannot swap the same token");
      return false;
    }
    if (!rates[fromToken] || !rates[toToken]) {
      setError("Selected token does not have price data");
      return false;
    }
    return true;
  };

  const handleSwap = () => {
    if (!validateInput()) return;
    setError("");
  };

  const handleMax = () => {
    setAmount(MAX_BALANCE.toString());
  };

  const handleSwapDirection = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const handleClickDropdown = (event: React.MouseEvent<HTMLElement>, type: string) => {
    setAnchorEl(event.currentTarget);
    setActiveDropdown(type);
    setSearchTerm("");
  };

  const handleSelectToken = (symbol: string) => {
    if (activeDropdown === "from") setFromToken(symbol);
    else setToToken(symbol);
    setActiveDropdown(null);
  };

  return {
    rates,
    fromToken,
    toToken,
    amount,
    error,
    anchorEl,
    activeDropdown,
    searchTerm,
    tokens,
    filteredTokens,
    setAmount,
    setSearchTerm,
    handleSwap,
    handleMax,
    handleSwapDirection,
    handleClickDropdown,
    handleSelectToken,
    setActiveDropdown,
    setAnchorEl,
    setError,
    validateInput,
  };
} 