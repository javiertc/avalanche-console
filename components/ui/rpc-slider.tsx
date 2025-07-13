"use client"

import { memo } from "react"
import { FeatureSlider } from "./feature-slider"
import { rpcFeatures } from "@/constants/slider-features"

export const RPCSlider = memo(function RPCSlider() {
  return <FeatureSlider features={rpcFeatures} />
}) 