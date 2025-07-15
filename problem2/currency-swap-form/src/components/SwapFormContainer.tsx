import React from "react";
import { useSwapFormLogic } from "src/hooks/useSwapFormLogic";
import SwapForm from "src/components/SwapForm";

export default function SwapFormContainer() {
  const logic = useSwapFormLogic();
  return <SwapForm {...logic} />;
} 