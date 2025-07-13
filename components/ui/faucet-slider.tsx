"use client"

import { memo } from "react"
import { FeatureSlider } from "./feature-slider"
import { faucetFeatures } from "@/constants/slider-features"

export const FaucetSlider = memo(function FaucetSlider() {
  return <FeatureSlider features={faucetFeatures} />
}) 