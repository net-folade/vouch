import * as React from "react"

import { cn } from "@/lib/utils"

// Plain <label> in the shadcn-classic style. We skip @radix-ui/react-label
// to avoid adding a dependency — a native label is enough for this demo.
const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
))
Label.displayName = "Label"

export { Label }
