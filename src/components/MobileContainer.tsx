import { cn } from "@/lib/utils";
import React from "react";

interface MobileContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const MobileContainer = ({
  children,
  className,
  ...props
}: MobileContainerProps) => {
  return (
    <div className="min-h-screen flex justify-center bg-neutral-200">
      <div
        className={cn(
          "w-full max-w-[430px] min-h-[100dvh] bg-[var(--surface)] flex flex-col",
          "rounded-none sm:rounded-[2rem] sm:my-4 sm:min-h-[calc(100dvh-2rem)] sm:overflow-hidden",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};
