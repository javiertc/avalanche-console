"use client"

import { memo } from "react"
import { FeatureSlider } from "./feature-slider"
import { dataApiFeatures } from "@/constants/slider-features"

export const DataAPISlider = memo(function DataAPISlider() {
  return <FeatureSlider features={dataApiFeatures} />
}) 