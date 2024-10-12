import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

interface StarRatingInteractiveProps {
  value: number;
  type: string;
  onChange: (value: number) => void;
  onBlur: () => void;
}

const StarRatingInteractive: React.FC<StarRatingInteractiveProps> = ({
  value,
  type,
  onChange,
  onBlur,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  return (
    <span
      onMouseLeave={() => setHoverValue(null)} // Reset hover on mouse leave
      onBlur={onBlur} // Handle blur
      className="flex gap-1"
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const displayValue = hoverValue !== null ? hoverValue : value;

        return (
          <span
            key={star}
            onMouseEnter={() => setHoverValue(star)} // Set hover state
            onClick={() => onChange(star)} // Update form state on click
            className={`cursor-pointer ${
              star <= displayValue ? "text-starYellow" : "text-border"
            }`}
          >
            {star <= displayValue ? (
              <StarFilledIcon className="size-4" />
            ) : (
              <StarIcon className="size-4" />
            )}
          </span>
        );
      })}
    </span>
  );
};

export default StarRatingInteractive;
