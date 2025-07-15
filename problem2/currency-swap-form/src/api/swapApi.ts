import { apiClient } from "./apiClient";
import { ENDPOINTS } from "../constants";
import { RateItem } from "../hooks/useSwapFormLogic";

export function fetchRates(): Promise<RateItem[]> {
  return apiClient.get('prices.json').then(res => res.data);
} 