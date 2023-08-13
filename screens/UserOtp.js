import React, { useState, useRef,useContext } from "react";
import {
 StyleSheet,
 View,
 TouchableOpacity,
 Text,
 Image,
Dimensions,
I18nManager
} from "react-native";
import { Loader } from "../components/Loader";
import {  getAuthOtp } from '../src/services/api/signup.service';
import { RootContext } from "../RootContext";
import PhoneInput from "react-native-phone-number-input";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OtpVerify } from './OtpVerPage';
import { TextInput } from "react-native-paper";
import { useTranslation } from 'react-i18next';
import { Fonts ,Colors, Sizes} from "../utils/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
const phoneInput = useRef<PhoneInput>(null);
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const Stack = createNativeStackNavigator();
export function Mobileotp({navigation,route} ) {
  const {selectedLanguage}  = useContext(RootContext); 
  const { t } = useTranslation('MobileOtp');
const MobileNum = ({navigation}) => {
  const [type, setType] = useState(route?.params?.whichtype);
  const [text, setText] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  
  
  const handleSubmit = async (e) => {
    setShowLoader(true);
    let data = {phoneNumber:text,
    channel:"whatsapp",
    locale:selectedLanguage === "en-US"?"en-US":"ar-SA"
    }
        await AsyncStorage.setItem("MOBILENO",text)
        await AsyncStorage.setItem("TYPE",type)
        const res = await getAuthOtp(data).then((response) => {
          setShowLoader(false);
          if(response?.status === 201){
              navigation.navigate("MobileOtp",{phonenum : text,
              OtpType:type})
                
          }
      }
      ) .catch((err) => {
        console.log("Error:",err?.response)
        setShowLoader(false);
        // navigation.navigate("MobileOtp",{phonenum : text,
        // OtpType:type})
      });
        //Alert.alert(err.response.data.error_description)); commented this because for the first time gen of access token key we have to go through the signup flow 
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
      </View>
       </View>
       <View style={styles.signin}>
        <Text style={styles.signInHeader}>{t(`signIn`)}</Text>
        <Text style={styles.signupText}>{t(`joinUs`)}</Text>
        </View>
       <View style={styles.wrapper}>
      
         {type == "phone"?<PhoneInput
         containerStyle={styles.phoneContainer}
         textContainerStyle={{backgroundColor:"#FFFFFF",borderRadius:8}}
         defaultCode={"SA"}
         placeholder={t(`enterPhone`)}
         onChangeFormattedText={newText => {
          setText(newText)}}
         defaultValue={text}
         textInputStyle={styles.inputStyle}
         textInputProps={{ returnKeyType : "done" }}
       />:<TextInput
            style={styles.hello}
            theme={{colors: {primary: '#028E46'}}}
            onChangeText={newText => {
              setText(newText)}}
              defaultValue={text}
              placeholder={t(`enterEmail`)}
         //setting limit of input
     />
     }
     {
       type=="email"? text =="" || reg.test(text) === false  && <Text style={{ color: "#F9774D" ,fontSize: 14  }}>{t('emailErr')}</Text>:null
     }
     {/* {type === "phone"?
     <TouchableOpacity style={{alignSelf:"flex-start",justifyContent:"flex-start",marginLeft:10}} onPress={()=>setType("email")}>
       <Text style={{color:"#F9774D",fontFamily:Fonts.POPPINS_SEMIBOLD,fontSize:14,lineHeight:18}}>{t('useEmail')}</Text>
     </TouchableOpacity>:<TouchableOpacity style={{alignSelf:"flex-start",justifyContent:"flex-start",marginLeft:15}} onPress={()=>setType("phone")}>
       <Text style={{color:"#F9774D",fontFamily:Fonts.POPPINS_SEMIBOLD,fontSize:14,lineHeight:18}}>
       {t('useMobile')}
       </Text>
     </TouchableOpacity>} */}
     {/* email option hidden for some time */}
       </View>
       <View style={{height:screenHeight*0.36,alignSelf:"flex-end"}}>
      {/* <Image style={{zIndex:-1,height:screenHeight*0.5,marginTop:30,width:screenWidth*0.9}} source={require("../assets/evaluatrlogo.png")} /> */}
    </View>
         {showLoader ? <View style={styles.loaderView}><Loader /></View>: 
       <View>
       <TouchableOpacity
         style={styles.button}
         onPress={handleSubmit}
       >
         {type=="phone"?
         <Text style={styles.buttonText}>{t(`viaSms`)}</Text>:<Text style={styles.buttonText}>{t(`viaEmail`)}</Text>}
       </TouchableOpacity>
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
      component={MobileNum}
      options={{ headerShown: false }}
    />
    
    <Stack.Screen name="MobileOtp" component={OtpVerify}  />
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
  marginTop:60,
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
signupText: {
  fontFamily:Fonts.POPPINS_REGULAR,
  color:"#333333",
  fontSize: Sizes.Size_14,
  lineHeight: Sizes.Size_18,
  marginBottom: Sizes.Size_10
},
hello:{
  height:screenHeight*0.085,
  width:screenWidth*0.85,
marginLeft:40,
marginRight:40,
backgroundColor : "#FFFFFF",
borderColor : "#909FBA",
borderWidth : 1,
borderRadius:10,
marginBottom:10
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
  marginTop:50,
  marginLeft: Sizes.Size_24,
  height: screenHeight*0.07,
  width: screenWidth*0.87,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#028E46",
  borderRadius: Sizes.Size_8,
 },
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
 inputWrapper: {
  flex: 1,
  justifyContent: 'center',
  paddingLeft: 20,
  paddingRight: 20,
},
inputStyle: {
  textAlign: I18nManager.isRTL? 'right':'left'
},
});

export default Mobileotp;