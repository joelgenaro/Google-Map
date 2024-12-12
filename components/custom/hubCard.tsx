import * as React from "react";

import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  Icon?: React.ElementType;
  Description?: React.ReactNode;
}

const HubCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, Icon, Description, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center p-8 gap-6 bg-airseed-light-blue",
        className
      )}
      {...props}
    >
      {Icon && <Icon />}
      {Description && <p className="text-white text-sm">{Description}</p>}
    </div>
  )
);
HubCard.displayName = "HubCard";

export { HubCard };
