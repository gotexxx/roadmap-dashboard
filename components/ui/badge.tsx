import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-zinc-800 text-zinc-300 border border-zinc-700",
        emerald: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
        blue: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
        violet: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
        orange: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
        red: "bg-red-500/10 text-red-400 border border-red-500/20",
        yellow: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
        pink: "bg-pink-500/10 text-pink-400 border border-pink-500/20",
        cyan: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
        amber: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
        outline: "border border-zinc-700 text-zinc-400",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
