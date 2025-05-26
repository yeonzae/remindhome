
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow-card hover:shadow-card-hover hover:-translate-y-0.5 active:translate-y-0",
        destructive:
          "bg-destructive text-white shadow-card hover:shadow-card-hover hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "bg-secondary text-white shadow-card hover:shadow-card-hover hover:-translate-y-0.5 active:translate-y-0",
        ghost: "hover:bg-gray-50 hover:text-gray-900",
        link: "text-primary underline-offset-4 hover:underline font-medium",
      },
      size: {
        default: "py-3 px-6 text-base",
        sm: "py-2 px-4 text-sm",
        lg: "py-4 px-8 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
