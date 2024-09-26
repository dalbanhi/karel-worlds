import { Children, ReactElement, cloneElement } from "react";

import { ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonGroupProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  areCardButtons?: boolean;
  children: ReactElement<ButtonProps>[];
}

export const ButtonGroup = ({
  className,
  orientation = "horizontal",
  children,
  areCardButtons,
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

        const cardButtonClasses = {
          "rounded-l-none": isHorizontal && !isFirst,
          "rounded-r-none": isHorizontal && !isLast,
          "rounded-t-none": (isHorizontal && isFirst) || isLast,
          "border-x-white": isHorizontal && !isLast && !isFirst,
        };

        const regularButtonClasses = {
          "rounded-l-md": isHorizontal && isFirst,
          "rounded-r-md": isHorizontal && isLast,
          "rounded-t-md": isVertical && isFirst,
          "rounded-b-md": isVertical && isLast,
        };

        const buttonClasses = areCardButtons
          ? cardButtonClasses
          : regularButtonClasses;

        return cloneElement(child, {
          className: cn(buttonClasses, child.props.className),
        });
      })}
    </div>
  );
};
