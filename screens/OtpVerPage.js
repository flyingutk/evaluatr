import React, { useState, useContext, useEffect } from "react";
import {
 SafeAreaView,
 StyleSheet,
 View,
 TouchableOpacity,
 Text,
 Alert,
 Image,
 Dimensions
} from "react-native";
import { Loader } from "../components/Loader";
import { getOtpVerify,getAuthOtp } from "../src/services/api/signup.service";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {SignupInfo} from "./SignUpPage";
import { useTranslation } from 'react-i18next';
import { Fonts ,Colors, Sizes} from "../utils/Constants";
import OtpInputs from "react-native-otp-inputs";
import { RootContext } from "../RootContext";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const Stack = createNativeStackNavigator();
export function OtpVerify({navigation,route} ) {
  const {selectedLanguage}  = useContext(RootContext); 
  const { t } = useTranslation('OtpPage');
let phone = route.params.phonenum
let otptype = route.params.OtpType
  const OtpVer = ({navigation,phonenum}) => {
    const [text, setText] = useState('')
    const [showLoader, setShowLoader] = useState(false);
    const [left, setLeft] = useState(false);
    const [right, setRight] = useState(false);
    const [showPagination, setShowPagination] = useState(false);
    const [timerCount, setTimer] = useState(30)

  let data={       
    phoneNumber:phone,
      code: text,
      
  }
  const OtpSendOnPhone = ()=>{
    setLeft(true)
    let data = {phoneNumber:phone,
      channel:"sms",
      locale:selectedLanguage === "en-US"?"en-US":"ar-SA"
      }
         getAuthOtp(data).then((response) => {
            if(response?.status === 201){
              setLeft(false)
                console.log("response success")
            }
        }
        ) .catch((err) => {
          setLeft(false)
          console.log("Error:",err?.response)
        });
  }
  useEffect(() => {
    if (!showPagination) {
      // 1000 for 1 second
      setTimeout(() => setShowPagination(true), 30000);
      let interval = setInterval(() => {
        setTimer(lastTimerCount => {
            lastTimerCount <= 1 && clearInterval(interval)
            return lastTimerCount - 1
        })
      }, 1000) 
      return () => clearInterval(interval)
    }
  }, [showPagination])
  const OtpSendOnWhatsapp = ()=>{
    setRight(true)
    let data = {phoneNumber:phone,
      channel:"whatsapp",
      locale:selectedLanguage === "en-US"?"en-US":"ar-SA"
      }
         getAuthOtp(data).then((response) => {
            if(response?.status === 201){
              console.log("response success")
              setRight(false)
            }
        }
        ) .catch((err) => {
          setRight(false)
          console.log("Error:",err?.response)
        });
   
  }
    const handleSubmit = async (e) => {  
      setShowLoader(true);
        const res = await getOtpVerify(data).then((response) => {
          if(response?.status === 201){
            if(response?.data?.response?.approved === true){
              console.log("Success")
              setShowLoader(false);
              navigation.navigate("SignupInfo")
            }
            else if(response?.data?.response?.approved === false){
             
              setShowLoader(false);
              Alert.alert("Invalid OTP !!")
            }
           
              // navigation.navigate("SignupInfo")
                
          }
      }
      ) .catch((err) => {
        console.log("Error:",err?.response?.data)
        Alert.alert("SOMETHING WENT WRONG !! PLEASE TRY AGAIN")
        setShowLoader(false);
         //navigation.navigate("SignupInfo")
      });
      //Alert.alert(err.response.data.error_description)); commented this because for the first time gen of access token key we have to go through the signup flow 
  };
    return (
    <>
     <View style={styles.container}>

     <View style={styles.evaluatrlogo}>
     <TouchableOpacity onPress={navigation.goBack}>
                    <View style={{ width: 30, height: 30,flex:1,alignItems:"center",justifyContent:"center" }}>
                    {selectedLanguage === "en-US"?<Image source={require("../assets/BackPress.png")}></Image>:<Image style={{marginTop:7,marginLeft:20}} source={require("../assets/BackPressAr.png")}></Image>}
                    </View>
       </TouchableOpacity>
                <View style ={{flex:1,justifyContent:"center",alignItems:"center"}}>
      </View>
      </View>
       <View style={styles.signin}>
        <Text style={styles.verify}>{t(`verify`)} {otptype}</Text>
          <Text style={styles.verifyMessage}>{t(`enterOtpMsg`)} {otptype} {phone}</Text>
        </View>
       <SafeAreaView style={styles.wrapper}>

      <OtpInputs
        autoFocus={true}
        numberOfInputs={6}
        inputContainerStyles={styles.underlineStyleBase}
        focusStyles={styles.underlineStyleHighLighted}
        clearTextOnFocus={true}
        inputStyles={styles.otpText}
        handleChange={newText => {
          setText(newText);
        }}
      />
      
      </SafeAreaView>
      <View style={{marginTop:40}}>
      { !showPagination &&
      <View style={{marginLeft:25,flexDirection:"row"}}>
        <Text style={{fontSize:14,lineHeight:18,color:"#F9774D",fontFamily:Fonts.POPPINS_REGULAR}}>{t('wait')} {timerCount} {t('seconds')}</Text>
      </View>}
     { showPagination &&
      <View style={{marginLeft:25,flexDirection:"row"}}>
        <Text style={{fontSize:14,lineHeight:18,color:"#000000",fontFamily:Fonts.POPPINS_REGULAR}}>{t('otpText')}</Text>
        <Text style={{fontSize:14,lineHeight:18,color:"#F9774D",fontFamily:Fonts.POPPINS_REGULAR}}>{t('resend')}</Text>
      </View>}
      {showPagination ?
      <View style={{alignSelf:"center",flexDirection:"row",marginTop:20}}>
      {left ? <View style={styles.loaderView}><Loader /></View>: 
        <TouchableOpacity style={{height:48,width:166,borderRadius:8,borderWidth:1,borderColor:"#028E46",justifyContent:"center",marginRight:10}} onPress={()=>{
         OtpSendOnPhone();
         

        }}>
        <Text style={{color:"#028E46",fontFamily:Fonts.POPPINS_SEMIBOLD,fontSize:14,alignSelf:"center"}}>{t('sms')}</Text>
        </TouchableOpacity >}
        {right ? <View style={styles.loaderView}><Loader /></View>: 
        <TouchableOpacity style={{height:48,width:166,borderRadius:8,borderWidth:1,borderColor:"#028E46",justifyContent:"center"}} onPress={()=>{
         OtpSendOnWhatsapp();
        
        }}>
        <Text style={{color:"#028E46",fontFamily:Fonts.POPPINS_SEMIBOLD,fontSize:14,alignSelf:"center"}}>{t('whatsapp')}</Text>
        </TouchableOpacity>}
      </View>:<View style={{alignSelf:"center",flexDirection:"row",marginTop:20}}>
        <TouchableOpacity style={{height:48,width:166,borderRadius:8,borderWidth:1,borderColor:"#a9a9a9",justifyContent:"center",marginRight:10,backgroundColor:"#f0f8ff",opacity:1}} onPress={()=>{
        }}>
        <Text style={{color:"#a9a9a9",fontFamily:Fonts.POPPINS_SEMIBOLD,fontSize:14,alignSelf:"center"}}>{t('sms')}</Text>
        </TouchableOpacity >
        <TouchableOpacity style={{height:48,width:166,borderRadius:8,borderWidth:1,borderColor:"#a9a9a9",justifyContent:"center",backgroundColor:"#f0f8ff"}} onPress={()=>{
        }}>
        <Text style={{color:"#a9a9a9",fontFamily:Fonts.POPPINS_SEMIBOLD,fontSize:14,alignSelf:"center"}}>{t('whatsapp')}</Text>
        </TouchableOpacity>
      </View>}
      </View>
      <View style={{height:screenHeight*0.35,alignSelf:"flex-end"}}>
      {/* <Image style={{zIndex:-1,height:screenHeight*0.53,marginTop:30,width:screenWidth*0.9}} source={require("../assets/evaluatrlogo.png")} /> */}
    </View>
         {showLoader ? <View style={styles.loaderView}><Loader /></View>: 
      <View>
     
         <TouchableOpacity
           style={styles.button}
           onPress={handleSubmit}
         >
           <Text style={styles.buttonText}>{t(`signUp`)}</Text>
         </TouchableOpacity>
         </View>}
     </View>
   </>
 );

};
return (
    
  <Stack.Navigator
  screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen
      name="OtpVer"
      component={OtpVer}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="SignupInfo" component={SignupInfo}/>
    
  </Stack.Navigator>
);
}
const styles = StyleSheet.create({
 container: {
  height:screenHeight*1,
  width:screenWidth*1,
   backgroundColor: "#FFFFFF",
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
 wrapper: {
  marginTop:20,
  justifyContent: "center",
  alignItems: "center",
  marginLeft:20,
  marginRight:20,
 },
evaluatrlogo:{
  padding: 10,
  flexDirection:"row",
  width:screenWidth*1,
  height:screenHeight*0.06
},
verify: {
  marginBottom: 10,
  fontFamily: Fonts.POPPINS_BOLD,
  color: "#0B1932",
  display:"flex",
  fontSize: Sizes.Size_24,
  lineHeight: Sizes.Size_28
},
verifyMessage: {
  fontFamily: Fonts.POPPINS_REGULAR,
  color: "#333333",
  fontSize: Sizes.Size_14,
  lineHeight: Sizes.Size_18
},

underlineStyleBase: {
  width: 40,
  height: 45,
  borderRadius:8,
  borderWidth: Sizes.Size_1,
  color:"#3B3945",
  borderColor: '#909FBA',
  marginLeft: 10,
  marginRight: 10,
  justifycontent: "center",
  alignSelf:"center",
  flex:1
},
otpText: {
  fontSize: 14, 
  fontFamily: Fonts.POPPINS_REGULAR, 
  alignSelf: 'center',
  flex:1,
  color:"#000000",
  justifyContent:"center"

},
underlineStyleHighLighted: {
  borderColor: "#028E46",
},
signin:{
  height:screenHeight*0.14,
  width:screenWidth*0.95,
  marginTop:60,
  marginLeft:20,
  justifyContent:"center",
  alignSelf:"center"
   },
 button: {

  marginLeft: Sizes.Size_24,
  height: screenHeight*0.07,
  width: screenWidth*0.87,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#028E46",
  borderRadius: Sizes.Size_8,
 },
otpInputField: {
   height: screenHeight*0.095,
  width:screenWidth*0.87,
},
 buttonText: {
   color: "#FFFFFF",
   fontSize: Sizes.Size_14,
   fontFamily: Fonts.POPPINS_SEMIBOLD,
   lineHeight: Sizes.Size_18
 },

 welcome: {
   padding: 20,
 },

 
});

export default OtpVerify;