const swapFormStyles = {
  container: {
    width: 400,
    mx: "auto",
    mt: 8,
    p: 3,
    backgroundColor: "#1e1e1e",
    borderRadius: 2,
    color: "#fff",
    boxShadow: 5,
    fontFamily: 'Roboto, sans-serif',
  },
  title: {
    fontWeight: 'bold',
  },
  amountInput: {
    backgroundColor: "#2c2c2c",
    input: { color: "#fff" },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#FFD600',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#FFD600',
    },
  },
  maxBtn: {
    color: "#ffc107"
  },
  availableText: {
    fontWeight: 'bold',
  },
  tokenBtn: {
    backgroundColor: "#2c2c2c",
    color: "white",
    justifyContent: "start",
    pl: 2,
    minHeight: 40,
    textTransform: 'none',
    fontSize: 16,
  },
  tokenAvatar: {
    width: 20,
    height: 20,
    minWidth: 16,
    minHeight: 16,
    maxWidth: 16,
    maxHeight: 16,
    mr: 1,
  },
  directionBtn: {
    minWidth: 40,
    minHeight: 40,
  },
  directionIcon: {
    color: "#aaa"
  },
  dialogPaper: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderRadius: 2,
    minWidth: 320,
    fontFamily: 'Roboto, sans-serif',
  },
  dialogTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    background: 'none',
    textAlign: 'center',
  },
  dialogContentText: {
    mb: 2,
    color: '#fff',
  },
  dialogAmount: {
    mb: 1.5,
    color: '#fff',
  },
  dialogReceive: {
    mb: 1.5,
    color: '#fff',
  },
  dialogRate: {
    color: 'gray',
    mb: 0.5,
  },
  dialogActions: {
    justifyContent: 'space-between',
    px: 2,
    pb: 2,
  },
  cancelBtn: {
    color: '#fff',
    borderRadius: 1,
    border: '1px solid #444',
    background: '#222',
    '&:hover': {
      background: '#333',
      border: '1px solid #888',
    }
  },
  confirmBtn: {
    background: '#f0b90b',
    color: '#222',
    fontWeight: 'bold',
    borderRadius: 1,
    '&:hover': {
      background: '#ffd700',
    }
  },
  toast: {
    bottom: 24,
    right: 24,
  },
  toastAlert: {
    width: '100%',
    fontWeight: 'bold',
    fontSize: 16,
    background: '#222',
    color: '#f0b90b',
    border: '1px solid #f0b90b',
  },
  submitBtn: {
    mt: 3,
    backgroundColor: "#f0b90b",
    color: "black",
    fontWeight: "bold",
    '&:hover': {
      backgroundColor: '#ffd700',
    }
  },
};

export default swapFormStyles; 