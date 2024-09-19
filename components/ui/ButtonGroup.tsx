import { Children, ReactElement, cloneElement } from "react";

import { ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonGroupProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  children: ReactElement<ButtonProps>[];
}

export const ButtonGroup = ({
  className,
  orientation = "horizontal",
  children,
}: ButtonGroupProps) => {
  const totalButtons = Children.count(children);
  const isHorizontal = orientation === "horizontal";
  const isVertical = orientation === "vertical";

  return (
    <div
      className={cn(
        "flex",
        {
          "flex-col": isVertical,
          "w-fit": isVertical,
        },
        className
      )}
    >
      {Children.map(children, (child, index) => {
        const isFirst = index === 0;
        const isLast = index === totalButtons - 1;

        return cloneElement(child, {
          className: cn(
            {
              "rounded-l-none": isHorizontal && !isFirst,
              "rounded-r-none": isHorizontal && !isLast,
              "rounded-t-none": (isHorizontal && isFirst) || isLast,
              "border-x-white": isHorizontal && !isLast && !isFirst,
            },
            child.props.className
          ),
        });
      })}
    </div>
  );
};
