import { Theme, Themes } from "blockly";
import { math } from "blockly/blocks";
// #1f2241 - ring
export default Theme.defineTheme("custom", {
  name: "CustomKarelWorldsTheme",
  base: Themes.Classic,
  componentStyles: {
    workspaceBackgroundColour: "#fcfcfd", //primary-foreground
    toolboxBackgroundColour: "#ededf3", // border
    toolboxForegroundColour: "#1f2241", //primary-foreground
    flyoutBackgroundColour: "#c5c4d4", //card
    flyoutForegroundColour: "#1f2241 ",
    flyoutOpacity: 0.75,
    scrollbarColour: "#494950", //muted-foreground
    insertionMarkerColour: "#fff",
    insertionMarkerOpacity: 0.3,
    scrollbarOpacity: 0.4,
    cursorColour: "#f00",
  },
  blockStyles: {
    logic_blocks: {
      colourPrimary: "#b28fef",
      colourSecondary: "#64C7FF",
      colourTertiary: "#fff",
    },
    loop_blocks: {
      colourPrimary: "#5fab61",
      colourSecondary: "#79FFA1",
      colourTertiary: "#fff",
    },
    math_blocks: {
      colourPrimary: "#add3f0",
      colourSecondary: "#FFC764",
      colourTertiary: "#FFEAC5",
    },
  },
  categoryStyles: {},
  fontStyle: {
    family: "Open Sans, sans-serif",
    weight: "normal",
    size: 12,
  },
});
