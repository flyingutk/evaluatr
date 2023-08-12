import * as React from "react";

import { ActivityIndicator } from "react-native";
import { Box } from "../restyle/Index";

export const Loader = ({ color, size = "small", visible = true }) => {
  let loaderColor = color ? color : "#028E46";
  if (!visible) {
    return null;
  }
  return (
    <Box flex={1} justifyContent="center">
      <Box width={"100%"}>
        <ActivityIndicator size={size} animating={true} color={loaderColor} />
      </Box>
    </Box>
  );
};

export const AbsoluteLoader = ({ color, size = "small", visible = false, backgroundColor }) => {
  let loaderColor = color ? color : "#028E46";
  if (!visible) {
    return null;
  }
  return (
    <Box
      position={"absolute"}
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex="z1"
      justifyContent="center"
      alignItems={"center"}
      bg={backgroundColor}
    >
      <ActivityIndicator size={size} animating={true} color={loaderColor} />
    </Box>
  );
};
