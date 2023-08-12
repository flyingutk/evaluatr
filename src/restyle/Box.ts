import { createBox } from "@shopify/restyle";
import { ViewProps } from "react-native/types";
import { Theme } from "./theme";

const Box = createBox<Theme, ViewProps>();

export default Box;
