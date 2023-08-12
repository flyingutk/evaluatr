import {
    StyleSheet,
  } from "react-native";
  import { Colors } from "../../utils/Constants";
  import globalStyle from "../../utils/globalStyles";

 const styles = StyleSheet.create({
     imageStyle :{
         resizeMode: 'contain',
         height: 30,
         width: 30,
     },
     circleShape:{  
       ...globalStyle.circleShape
    },
})

export default styles