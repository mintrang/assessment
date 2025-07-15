interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // FIX 1: Added missing field `blockchain` to match `getPriority(balance.blockchain)`
}

interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // FIX 2: Replaced `any` with `string` for type safety
  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':
        return 20;
      case 'Neo':
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      // FIX 3: Replaced undefined `lhsPriority` with `balancePriority`
      // FIX 4: Adjusted filtering logic to allow balances with amount > 0
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount > 0;
      })
      // FIX 5: Removed redundant priority comparison logic and simplified sorting
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority; // Higher priority first
      });
  }, [balances, prices]);

  // FIX 6: Moved formatting directly into row mapping below; this map is now redundant and unused
  // We can safely remove it if unused elsewhere
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    const formatted = balance.amount.toFixed(); // FIX 7: Ensure `formatted` exists here, instead of using incorrect type
    return (
      <WalletRow
        className={classes.row}
        key={balance.currency} // FIX 8: Replaced unstable `key={index}` with `key={balance.currency}`
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};
