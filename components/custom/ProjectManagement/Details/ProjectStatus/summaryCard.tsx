import * as React from "react";

import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

const SummaryCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, title, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center",
        className
      )}
      {...props}
    >
      <div className="w-full text-white text-center text-base font-semibold bg-airseed-light-blue py-2 rounded-t-xl">{title}</div>
      <div className="w-full h-full bg-white border-2 border-airseed-light-blue rounded-b-xl">
        {children}
      </div>
    </div>
  )
);
SummaryCard.displayName = "SummaryCard";

export { SummaryCard };
