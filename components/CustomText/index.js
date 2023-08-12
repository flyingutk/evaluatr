import React from "react";
import {
  Text, 
} from "react-native";
import styles from './styles'

const CustomText = ({isEllipsize, lines, normalStyle, boldStyle, style, topMargin, size, padding, children})=>{
  const fontBoldStyle = boldStyle ? {...boldStyle, fontWeight: 'bold'} : normalStyle
  const ellipseValue = isEllipsize ? "tail": "clip"
  return(
    <Text style={[styles.textStyle, 
    { ...fontBoldStyle, ...style, marginTop: topMargin, fontSize: size, padding}]}
    ellipsizeMode={ellipseValue}
    numberOfLines={lines}
    >
    {children}
  </Text>
  )
}

export default CustomText