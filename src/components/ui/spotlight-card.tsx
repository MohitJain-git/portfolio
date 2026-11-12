import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
}

export const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({ children, className, spotlightColor, onMouseMove, ...props }, ref) => {
    const internalRef = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const el = internalRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty("--mouse-x", `${x}px`);
        el.style.setProperty("--mouse-y", `${y}px`);
      }
      onMouseMove?.(e);
    };

    return (
      <div
        ref={(node) => {
          internalRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        onMouseMove={handleMouseMove}
        className={cn(
          "bento-card scroll-reveal-card rounded-2xl overflow-hidden",
          className
        )}
        {...props}
      >
        <div
          className="bento-spotlight"
          style={
            spotlightColor
              ? {
                  background: `radial-gradient(550px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${spotlightColor}, transparent 45%)`,
                }
              : undefined
          }
        />
        <div className="relative z-10 h-full">{children}</div>
      </div>
    );
  }
);

SpotlightCard.displayName = "SpotlightCard";
