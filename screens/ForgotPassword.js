import React, { useState, useRef,useContext,useEffect } from "react";
import {
 StyleSheet,
 View,
 TouchableOpacity,
 Text,
 Alert,
 Image,
Dimensions,
I18nManager
} from "react-native";
import { Loader } from "../components/Loader";
import {  getResetLink } from '../src/services/api/signup.service';
import { RootContext } from "../RootContext";
import PhoneInput from "react-native-phone-number-input";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Fonts ,Colors, Sizes} from "../utils/Constants";

const phoneInput = useRef<PhoneInput>(null);
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const Stack = createNativeStackNavigator();
export function ForgotPass({navigation,route} ) {
  const {selectedLanguage}  = useContext(RootContext); 
  const { t } = useTranslation('ForgotPass');
const ResetPass = ({navigation}) => {
 
  const [text, setText] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [showText, setShowText] = useState(false);
  const [ShowButton, setShowButton] = useState(true);
  const [timerCount, setTimer] = useState(30)
  useEffect(() => {
    if (!ShowButton) {
      // 1000 for 1 second
      setTimeout(() => setShowButton(true), 30000);
      let interval = setInterval(() => {
        setTimer(lastTimerCount => {
            lastTimerCount <= 1 && clearInterval(interval)
            return lastTimerCount - 1
        })
      }, 1000) ;
      if(timerCount <= 0){
        setTimer(30)
      }
      return () => clearInterval(interval)
    }
  }, [ShowButton])
  
  const handleSubmit = async (e) => {
    setShowLoader(true)
    const res = await getResetLink(text).then((response) => {
      setShowLoader(false);
      console.log("response:",response?.status)
    if(response?.status === 204){
      setShowText(true)
      setShowButton(false)
    }
    })
    .catch((err)=>{
      setShowLoader(false);
      Alert.alert(t('somethingWrong'))
      console.log("error:",err?.response?.data)})
    
   
  };
  
  return (
  <>
   <View style={styles.container}>
   
       <View style={styles.welcome}>
       <TouchableOpacity onPress={navigation.goBack}>
                    <View style={{ width: 30, height: 30,flex:1,alignItems:"center",justifyContent:"center" }}>
                        {selectedLanguage === "en-US"?<Image source={require("../assets/BackPress.png")}></Image>:<Image style={{marginTop:7,marginLeft:20}} source={require("../assets/BackPressAr.png")}></Image>}
                    </View>
       </TouchableOpacity>
                <View style ={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Image style = {{width: 75, height: 26}}source={require("../assets/evaluatrlogoGreen.png")} /> 
      </View>
       </View>
       <View style={styles.signin}>
        <Text style={styles.signInHeader}>{t(`SendReset`)}</Text>
        
        </View>
       <View style={styles.wrapper}>
      
     <PhoneInput
         containerStyle={styles.phoneContainer}
         textContainerStyle={{backgroundColor:"#FFFFFF",borderRadius:8}}
         defaultCode={"SA"}
         placeholder={t(`enterPhone`)}
         onChangeFormattedText={newText => {
          setText(newText)}}
         defaultValue={text}
         textInputStyle={styles.inputStyle}
         textInputProps={{ returnKeyType : "done" }}
       />
         
    
     
    
     {showText && <Text style={{color:"#000000",fontFamily:Fonts.POPPINS_SEMIBOLD,fontSize:14,lineHeight:18}}>{t('smsText')}</Text>}
      </View>
      
         {showLoader ? <View style={styles.loaderView}><Loader /></View>: 
         
       <View>
         { ShowButton ?
       <TouchableOpacity
         style={styles.button}
         onPress={handleSubmit}
       >
       
         <Text style={styles.buttonText}>{t(`sendLink`)}</Text>
       </TouchableOpacity>:<TouchableOpacity
         style={styles.buttonsilver}
        
       >
       
         <Text style={styles.buttonText}>{t(`resendLink`)} {timerCount} {t('seconds')}</Text>
       </TouchableOpacity>}
       </View>}
   </View>
 
 </>
)
;

};
return (
    
  <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }}>
    <Stack.Screen
      name="MobileNum"
      component={ResetPass}
      options={{ headerShown: false }}
    />
    
  
  </Stack.Navigator>
);
}
const styles = StyleSheet.create({
 container: {
  height:screenHeight*1,
  width:screenWidth*1,
   backgroundColor: "#FFFFFF",
 },

 wrapper: {
   marginTop:20,
   justifyContent: "center",
   alignItems: "center",
   marginLeft:20,  
   marginRight:20,   
 },
 signin:{
  height:screenHeight*0.14,
  width:screenWidth*0.95,
  marginTop:30,
  marginLeft:20,
  justifyContent:"center",
  alignSelf:"center"
 },
phoneContainer: {
  borderRadius: Sizes.Size_8,
  borderColor: "#909FBA",
  borderWidth: Sizes.Size_1,
  backgroundColor:"#D3DCEC",
  height: screenHeight*0.095,
  width:screenWidth*0.87,
  textAlign: 'left',
  marginBottom:10,
},
 signInHeader: {
  marginBottom:10,
  fontFamily:Fonts.POPPINS_BOLD,
  color: '#0B1932',
  display:"flex",
  fontSize: Sizes.Size_24,
},


loaderView: {
  alignSelf:"center",
  width: Sizes.Size_30,
  height: Sizes.Size_30,
  borderRadius: Sizes.Size_6,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: Colors.white,
  marginTop: Sizes.Size_10,
  marginLeft: Sizes.Size_32,
  marginRight: Sizes.Size_36,
  marginBottom: Sizes.Size_10,
},
 button: {
  
  marginLeft: Sizes.Size_24,
  height: screenHeight*0.07,
  width: screenWidth*0.87,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#028E46",
  borderRadius: Sizes.Size_8,
  marginTop:screenHeight * 0.42
 },
 buttonsilver:{marginLeft: Sizes.Size_24,
  height: screenHeight*0.07,
  width: screenWidth*0.87,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#a9a9a9",
  borderRadius: Sizes.Size_8,
  marginTop:screenHeight * 0.42},
 input: {
  height: 40,
  borderWidth: 1,
  padding: 10,
  borderRadius: 5
},
 buttonText: {
   color: "#FFFFFF",
   fontSize: Sizes.Size_14,
   lineHeight: Sizes.Size_18,
   fontFamily: Fonts.POPPINS_SEMIBOLD,
   textTransform: 'uppercase'
 },
 submit: { 
 position:"absolute",
 bottom:0
},
 welcome: {
  padding: 10,
  flexDirection:"row",
  width:screenWidth*1,
  height:screenHeight*0.06
   
 },

inputStyle: {
  textAlign: I18nManager.isRTL? 'right':'left',
  color:"#000000"
},
});

export default ForgotPass;