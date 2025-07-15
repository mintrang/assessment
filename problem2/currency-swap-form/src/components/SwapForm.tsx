import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { MAX_BALANCE, tokenImageUrl } from '../constants';
import swapFormStyles from './swapFormStyles';

export interface RateItem {
  currency: string;
  price: number;
  [key: string]: any;
}

export interface SwapFormProps {
  rates: { [key: string]: RateItem };
  fromToken: string;
  toToken: string;
  amount: string;
  error: string;
  anchorEl: null | HTMLElement;
  activeDropdown: string | null;
  searchTerm: string;
  tokens: string[];
  filteredTokens: string[];
  setAmount: (v: string) => void;
  setSearchTerm: (v: string) => void;
  handleSwap: () => void;
  handleMax: () => void;
  handleSwapDirection: () => void;
  handleClickDropdown: (event: React.MouseEvent<HTMLElement>, type: string) => void;
  handleSelectToken: (symbol: string) => void;
  setActiveDropdown: (v: string | null) => void;
  setAnchorEl: (v: HTMLElement | null) => void;
  setError: (v: string) => void;
  validateInput: () => boolean;
}

export default function SwapForm(props: SwapFormProps) {
  const {
    rates,
    fromToken,
    toToken,
    amount,
    error,
    anchorEl,
    activeDropdown,
    searchTerm,
    filteredTokens,
    setAmount,
    setSearchTerm,
    handleSwap,
    handleMax,
    handleSwapDirection,
    handleClickDropdown,
    handleSelectToken,
    setActiveDropdown,
    validateInput,
  } = props;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [swapped, setSwapped] = useState(false);
  const [openToast, setOpenToast] = useState(false);

  const onSwapClick = () => {
    if (!validateInput()) {
      return;
    }
    setOpenConfirm(true);
  };

  const onConfirmSwap = () => {
    setOpenConfirm(false);
    handleSwap();
    setSwapped(true);
    setOpenToast(true);
  };

  const onCancelSwap = () => {
    setOpenConfirm(false);
  };

  const canShowResult =
    amount &&
    !isNaN(Number(amount)) &&
    Number(amount) > 0 &&
    fromToken &&
    toToken &&
    fromToken !== toToken &&
    rates[fromToken] &&
    rates[toToken];

  const calculatedResult = canShowResult
    ? ((Number(amount) * rates[fromToken].price) / rates[toToken].price).toFixed(6)
    : null;

  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (!value || isNaN(Number(value))) {
      props.setError("Amount must be a valid number");
    } else if (Number(value) <= 0) {
      props.setError("Amount must be greater than 0");
    } else if (Number(value) > MAX_BALANCE) {
      props.setError("Amount exceeds your available balance");
    } else {
      props.setError("");
    }
  };

  const renderDropdown = (
    <Popper open={!!activeDropdown} anchorEl={anchorEl} placement="bottom-start">
      <ClickAwayListener onClickAway={() => setActiveDropdown(null)}>
        <Paper sx={{ mt: 1, maxHeight: 360, overflowY: 'auto', width: 280, backgroundColor: '#1e1e1e' }}>
          <Box p={1}>
            <TextField
              placeholder="Search Coin"
              variant="outlined"
              size="small"
              fullWidth
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                input: { color: "white" },
                backgroundColor: "#2c2c2c",
                borderRadius: 1
              }}
            />
          </Box>
          <List>
            {filteredTokens.length === 0 ? (
              <Box px={2} py={1}>
                <Typography color="gray" fontSize={13}>
                  No results found for "{searchTerm}"
                </Typography>
              </Box>
            ) : (
              filteredTokens.map(symbol => (
                <ListItem key={symbol} onClick={() => handleSelectToken(symbol)} sx={{ cursor: 'pointer' }}>
                  <ListItemAvatar>
                    <Avatar src={tokenImageUrl(symbol)} imgProps={{ loading: 'lazy', alt: symbol + ' token' }} sx={{ width: 24, height: 24 }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography color="white">{symbol}</Typography>}
                    secondary={<Typography variant="caption" color="gray">${rates[symbol]?.price?.toFixed(6)}</Typography>}
                  />
                </ListItem>
              ))
            )}
          </List>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );

  return (
    <>
      <Box sx={{ ...swapFormStyles.container }}>
        <Typography variant="h6" gutterBottom color="white" sx={swapFormStyles.title}>
          Swap Tokens
        </Typography>

        <TextField
          fullWidth
          size="small"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          sx={swapFormStyles.amountInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Typography color="white" mr={1}>{fromToken}</Typography>
                <Button variant="text" size="small" onClick={handleMax} sx={swapFormStyles.maxBtn}>
                  MAX
                </Button>
              </InputAdornment>
            )
          }}
        />

        <Typography variant="caption" color="gray" mt={1} display="block" sx={swapFormStyles.availableText}>
          Available: {MAX_BALANCE} {fromToken}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} mt={3}>
          <Button fullWidth onClick={(e) => handleClickDropdown(e, "from")}
            sx={swapFormStyles.tokenBtn}>
            {fromToken ? (
              <Avatar src={tokenImageUrl(fromToken)} imgProps={{ loading: 'lazy', alt: fromToken + ' token' }} sx={swapFormStyles.tokenAvatar} />
            ) : null}
            {fromToken || "Select Token"}
          </Button>

          <IconButton onClick={handleSwapDirection} aria-label="swap tokens" sx={swapFormStyles.directionBtn}>
            <SwapHorizIcon sx={swapFormStyles.directionIcon} />
          </IconButton>

          <Button fullWidth onClick={(e) => handleClickDropdown(e, "to")}
            sx={swapFormStyles.tokenBtn}>
            {toToken ? (
              <Avatar src={tokenImageUrl(toToken)} imgProps={{ loading: 'lazy', alt: toToken + ' token' }} sx={swapFormStyles.tokenAvatar} />
            ) : null}
            {toToken || "Select Token"}
          </Button>
        </Stack>

        {renderDropdown}

        <Button
          fullWidth
          variant="contained"
          sx={swapFormStyles.submitBtn}
          onClick={onSwapClick}
        >
          Swap
        </Button>

        {error ? (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        ) : canShowResult && (
          <>
            <Typography mt={3}>
              You will get: <strong>{calculatedResult}</strong> {toToken}
            </Typography>
            <Typography variant="body2" color="gray" mt={1}>
              1 {fromToken} = {(rates[fromToken].price / rates[toToken].price).toFixed(6)} {toToken}
            </Typography>
          </>
        )}

        <Dialog open={openConfirm} onClose={onCancelSwap} PaperProps={{ sx: swapFormStyles.dialogPaper }}>
          <DialogTitle sx={swapFormStyles.dialogTitle}>Confirm Transaction</DialogTitle>
          <DialogContent>
            <Typography sx={swapFormStyles.dialogContentText}>Are you sure you want to swap?</Typography>
            <Typography sx={swapFormStyles.dialogAmount}><strong>Amount:</strong> {amount} {fromToken}</Typography>
            <Typography sx={swapFormStyles.dialogReceive}><strong>Receive:</strong> {calculatedResult ? calculatedResult : "-"} {toToken}</Typography>
            {fromToken && toToken && rates[fromToken] && rates[toToken] && (
              <Typography variant="body2" sx={swapFormStyles.dialogRate}>
                <strong>Rate:</strong> 1 {fromToken} = {(rates[fromToken].price / rates[toToken].price).toFixed(6)} {toToken}
              </Typography>
            )}
          </DialogContent>
          <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', px: 2, pb: 2 }}>
            <Button onClick={onCancelSwap} color="inherit" sx={swapFormStyles.cancelBtn}>
              Cancel
            </Button>
            <Button onClick={onConfirmSwap} color="primary" variant="contained" sx={swapFormStyles.confirmBtn}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

      </Box>

      <Snackbar
        open={openToast}
        autoHideDuration={2500}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenToast(false)} severity="success" sx={swapFormStyles.toastAlert}>
          Swap successful!
        </Alert>
      </Snackbar>
    </>
  );
}
