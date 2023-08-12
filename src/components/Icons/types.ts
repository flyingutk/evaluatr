import { ImageStyle } from "react-native/types";
import { IconProps } from "../../assets/svgs";

export interface IconsProps {
  icon: IconProps;
  styles?: ImageStyle;
  fill?: string;
  accessibilityLabel?: string;
}
