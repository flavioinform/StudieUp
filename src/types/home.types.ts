import type React from "react"

export interface BeneItem {
  icon: React.FC<{ className?: string }>
  title: string
  desc: string
}