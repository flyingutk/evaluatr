import { createText } from "@shopify/restyle";
import { TextProps } from "react-native/types";
import { Theme } from "./theme";

const Text = createText<Theme, TextProps>();

export default Text;
