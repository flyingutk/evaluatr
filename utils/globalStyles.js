import { Colors } from "./Constants";
import {
  Dimensions,
  } from 'react-native';
const globalStyles = {
  circleShape:{  
    width: 28,
    height: 28,
    borderWidth: 1,
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    backgroundColor: Colors.greyLight
  },
  boldTextStyle:{
    fontWeight: 'bold', 
    fontSize: 16, 
    marginLeft: 4, 
    backgroundColor: Colors.white
  },
  strikeThrough:{
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: Colors.slateGrey,
    fontWeight: 'bold',
    marginLeft: 4,
  },
};
export default globalStyles;

