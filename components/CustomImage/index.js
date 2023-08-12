import React from "react";
import {
  Image, 
} from "react-native";
import styles from './styles'

  const CircularImage = ({sourceData, style}) => {
    return(
      <Image style={[styles.circleShape, {...style}]}
       source = {sourceData}/>
    )
  }
  const SimpleImage = ({sourceData, style}) => {
    return(
      <Image style={[styles.imageStyle, {...style}]}
       source = {sourceData}/>
    )
  }
  

export {SimpleImage, CircularImage};