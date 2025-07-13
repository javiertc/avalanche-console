"use client"

import { memo } from "react"
import { FeatureSlider } from "./feature-slider"
import { metricsApiFeatures } from "@/constants/slider-features"

export const MetricsAPISlider = memo(function MetricsAPISlider() {
  return <FeatureSlider features={metricsApiFeatures} />
}) 