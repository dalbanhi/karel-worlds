// import { Graphics } from "@pixi/react";
// import { Graphics as PIXIGraphics } from "pixi.js";
// import { forwardRef, useCallback } from "react";

// interface CircleProps {
//   x: number;
//   y: number;
//   radius: number;
//   color: number;
// }

// const Circle = forwardRef<PIXIGraphics, CircleProps>(
//   function Circle(props, ref) {
//     const { x, y, radius, color } = props;

//     const draw = useCallback(
//       (g: PIXIGraphics) => {
//         g.clear();
//         g.beginFill(color);
//         g.drawCircle(x, y, radius);
//         g.endFill();
//       },
//       [x, y, radius, color]
//     );

//     return <Graphics draw={draw} ref={ref as React.Ref<PIXIGraphics>} />;
//   }
// );

// export default Circle;

import { PixiComponent } from "@pixi/react";
import { Graphics as PIXIGraphics } from "pixi.js";
interface CircleProps {
  x: number;
  y: number;
  radius: number;
  color: number;
}

const Circle = PixiComponent<CircleProps, PIXIGraphics>("Circle", {
  create: () => new PIXIGraphics(),
  applyProps: (g, _, props) => {
    g.clear();
    g.beginFill(props.color);
    g.drawCircle(props.x, props.y, props.radius);
    g.endFill();
  },
});

export default Circle;
