"use client"

import { memo } from "react"
import { FeatureSlider } from "./feature-slider"
import { webhooksApiFeatures } from "@/constants/slider-features"

export const WebhooksAPISlider = memo(function WebhooksAPISlider() {
  return <FeatureSlider features={webhooksApiFeatures} />
}) 