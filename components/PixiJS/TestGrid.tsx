import React from "react";
import { Container, PixiRef } from "@pixi/react";

type IContainer = PixiRef<typeof Container>; // Pixi Container

const App = () => {
  const containerRef = React.useRef<IContainer>(null);
  return <Container ref={containerRef} />;
};
