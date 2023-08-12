import { SvgXml } from 'react-native-svg';
import React from "react";
import { Platform, Image } from 'react-native';
import { I18nManager } from "react-native";

let backIcon = Platform.OS === 'ios' ? <Image style={{marginLeft: 10}} source={require("../../assets/BackPress.png")}></Image> : <Image style={{marginLeft: 10}} source={require("../../assets/BackPress.png")}></Image>
let backRTLIcon = Platform.OS === 'ios' ? <Image style={{marginLeft: 10}} source={require("../../assets/BackPressAr.png")}></Image> : <Image style={{marginLeft: 10}} source={require("../../assets/BackPressAr.png")}></Image>

export function Back(){
    return I18nManager.isRTL? backRTLIcon : backIcon
}
