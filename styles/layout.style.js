import { StyleSheet } from "react-native";
import {
  fitCotent,
  flexDirectionRow,
  spaceBetween,
  spaceInEnd,
  spaceInFront,
} from "./common.styles";

const orderTitleBase = {
  paddingTop : 13,
  paddingBottom :13,
}

const baseBackgoundColor = {
  backgroundColor: "#FFFFFF",
};

const baseLayout = {
  flex: 1,
};

const screenPadding = {
  padding: 16,
};

const LayoutStyles = StyleSheet.create({
  layout: {
    ...baseLayout,
    ...screenPadding,
    ...baseBackgoundColor
  },
  fitContent: {
    ...fitCotent,
  },
  spaceBetween: {
    ...flexDirectionRow,
    ...spaceBetween,
  },
  spaceInFront: {
    ...flexDirectionRow,
    ...spaceInFront,
  },
  spaceInEnd: {
    ...flexDirectionRow,
    ...spaceInEnd,
  },
  titleContainer : {
    ...orderTitleBase
  }
});

export { LayoutStyles };
