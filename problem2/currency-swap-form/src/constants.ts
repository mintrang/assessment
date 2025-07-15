// Token image URL generator
export const tokenImageUrl = (symbol: string) =>
  `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${symbol}.svg`;

// API endpoints
export const ENDPOINTS = {
  RATES: 'https://interview.switcheo.com/',
};

// Mock max balance for demo
export const MAX_BALANCE = 0.11783181; 