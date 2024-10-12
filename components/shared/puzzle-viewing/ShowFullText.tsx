import React, { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ShowFullTextProps {
  children: ReactNode;
  isMobile: boolean;
  trigger: ReactNode;
}

const ShowFullText: React.FC<ShowFullTextProps> = ({
  children,
  isMobile,
  trigger,
}) => {
  return isMobile ? (
    <Popover>
      <PopoverTrigger className="underline">{trigger}</PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  ) : (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="flex min-h-fit justify-start underline">
          {trigger}
        </TooltipTrigger>
        <TooltipContent className="w-full">{children}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ShowFullText;
