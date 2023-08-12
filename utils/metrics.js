import { Dimensions } from "react-native";

const {width, height} = Dimensions.get('window');

const metrics = {
    screenWidth: width < height? width : height,
    screenHeight: width < height? height : width
}

export function getWidth(dimension) {
    return metrics.screenWidth * (dimension/400)
  }
  
export function getHeight(dimension) {
    return metrics.screenHeight * (dimension/800)
  }

export default metrics;