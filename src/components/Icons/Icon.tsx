import React from "react";
import { icons } from "../../assets/svgs";
import { IconsProps } from "./types";

const Icons = (props: IconsProps) => {
  const { styles, icon, fill, accessibilityLabel } = props;

  const SVGIcon = icons[icon].default ? icons[icon].default : icons[icon];

  return <SVGIcon style={styles} fill={fill} {...props} accessibilityLabel={accessibilityLabel} />;
};

export default Icons;
