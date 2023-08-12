import React, { useState, useRef ,useContext} from "react";
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
import { RootContext } from "../RootContext";
import { getAuthToken } from "../src/services/api/signup.service";
import PhoneInput from "react-native-phone-number-input";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TextInput } from "react-native-paper";
import { Fonts ,Colors, Sizes} from "../utils/Constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavigation from "../components/BottomNavigator";
import { useTranslation } from 'react-i18next';
import ForgotPass, { forgotPass } from "./ForgotPassword";

const phoneInput = useRef<PhoneInput>(null);
const Stack = createNativeStackNavigator();
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export function EmailLogin({navigation,route} ) {
  const {selectedLanguage}  = useContext(RootContext);
  const UserEmail = ({navigation}) => {
    let passreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])/
    const { t } = useTranslation('UserLogin');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const TokenStore = async (val) => {
      await AsyncStorage.setItem("TOKEN",val)
      const token =await  AsyncStorage.getItem("TOKEN"); 
    } 
    const RefTokenStore = async (val) => {
      await AsyncStorage.setItem("REFTOKEN",val)
      const token =await  AsyncStorage.getItem("REFTOKEN");
    } 
    let data = {
      password: pass,
      username: email
    }
    const handleSubmit = async (e) => {
          setShowLoader(true);
          const res = await getAuthToken(data).then((response) => {
            if(response?.status === 200){
              setShowLoader(true);
              console.log('responsee',response)
              TokenStore(response?.data?.token);   
              // RefTokenStore(response?.data?.data?.attributes?.refreshToken); 
              AsyncStorage.setItem("USERNAME",email);
              // customerId().then((response)=>{
              //   console.log("response",response?.data?.data[0]);
              //   AsyncStorage.setItem("FNAME",response?.data?.data[0]?.attributes?.firstName)
              //   AsyncStorage.setItem("LNAME",response?.data?.data[0]?.attributes?.lastName)
              //   AsyncStorage.setItem("REFID",response?.data?.data[0]?.id)
              //   AsyncStorage.setItem("MOBILENO",response?.data?.data[0]?.attributes?.phone);
              //   AsyncStorage.setItem("EMAIL",response?.data?.data[0]?.attributes?.email)
          
              // })
               navigation.navigate("navbar")    
            }
        }
        ) .catch((err) => {
          setShowLoader(false);
          if(err?.response?.status === 401 || 422 ){
            console.log("Errors:",err?.response)
            if(err?.response?.data?.errors[0]?.detail==="username => This value should not be blank."){
              Alert.alert(t('emptyUser'))
            }
            else if (err?.response?.data?.errors[0]?.detail==="password => This value should not be blank."){
              Alert.alert(t('emptyPass'))
            }
            else if (err?.response?.data?.errors[0]?.detail==="Failed to authenticate user."){
              Alert.alert(t('wrongDetails'))
            }
          
        }})
    };
    
    return (
    <>
    <View style={styles.container}>
    
      <View style={styles.welcome}>
        <TouchableOpacity onPress={navigation.goBack}>
          <View style={{ width: 30, height: 30 ,flex:1,alignItems:"center",justifyContent:"center"}}>
          {selectedLanguage === "en-US"?<Image source={require("../assets/BackPress.png")}></Image>:<Image style={{marginTop:7,marginLeft:20}} source={require("../assets/BackPressAr.png")}></Image>}
          </View>
        </TouchableOpacity>
        <View style ={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Image style = {{width: 75, height: 26}}source={require("../assets/evaluatrlogoGreen.png")} /> 
        </View>
      </View>
      <View style={styles.signin}>
        <Text style={styles.loginText}>{t(`logIn`)}</Text>
        <Text style={styles.enterText}>{t(`enterEmailPass`)}</Text>
      </View>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.hello}
          onChangeText={newText => {
          setEmail(newText)}}
          defaultValue={email}
          placeholder={t(`enterEmails`)}
          caretHidden={false}
          //setting limit of input
        />
        {/* <PhoneInput
        containerStyle={styles.phoneContainer}
        defaultCode="SA"
        placeholder={t(`enterEmail`)}
        textContainerStyle={{backgroundColor:"#FFFFFF",borderRadius:8}}
        onChangeFormattedText={(newText) => {
        setEmail(newText)}}
        defaultValue={email}
        textInputStyle={styles.inputStyle}
        textInputProps={{ returnKeyType : "done" }}
      /> */}
        
        <TextInput
          style={styles.hello}
          secureTextEntry={true}
          theme={{colors: {primary: '#028E46'}}}
          onChangeText={newText => {
          setPass(newText)}}
          defaultValue={pass}  
          placeholder={t(`enterPass`)}  
          caretHidden={true}
          onSubmitEditing={(e)=>{
            handleSubmit();
       }}
          //setting limit of input
        />  
        {  pass =="" || passreg.test(pass) === false  && <Text style={{ color: "#F9774D" ,fontSize: 12 }}>{t('passErr')}</Text>}
        <TouchableOpacity style={{alignSelf:"flex-end",justifyContent:"flex-end",marginRight:15}} onPress={()=>{navigation.navigate("forgotPass")}}>
          <Text style={{color:"#F9774D",fontFamily:Fonts.POPPINS_SEMIBOLD,fontSize:14,lineHeight:18}}>
          {t('forgotPass')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{height:screenHeight*0.36,alignSelf:"flex-end"}}>
        <Image style={{zIndex:-1,height:screenHeight*0.5,width:screenWidth*0.9}} source={require("../assets/evaluatrlogo.png")} />
      </View>
      {showLoader ? <View style={styles.loaderView}><Loader /></View>: 
      <View style={styles.submit}>
        {email === "" || pass === ""?
        <TouchableOpacity
        style={styles.buttonsilver}
        
      >
      <Text style={styles.silverButtonText}>{t(`logIn`)}</Text>
      </TouchableOpacity>:<TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          
          <Text style={styles.buttonText}>{t(`logIn`)}</Text>
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
      name="User Email"
      component={UserEmail}
      options={{ headerShown: false }}
    />
    
    <Stack.Screen name="navbar" component={BottomNavigation}  />
    <Stack.Screen name="forgotPass" component={ForgotPass}  />
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
 signin:{
   height:screenHeight*0.14,
   width:screenWidth*0.95,
  marginTop:60,
  marginLeft: Sizes.Size_26,
 },
loginText: {
  marginBottom: Sizes.Size_6,
  fontFamily:Fonts.POPPINS_SEMIBOLD,
  color:Colors.headerBlack,
  fontSize: 24
},
enterText: {
  fontFamily:Fonts.POPPINS_REGULAR,
  color:"#333333",
  fontSize:14
},
hello:{
  height:screenHeight*0.08,
  width:screenWidth*0.87,
marginLeft: Sizes.Size_40,
marginRight:40,
backgroundColor : "#FFFFFF",
borderColor : "#909FBA",
borderWidth : 1,
borderRadius: Sizes.Size_8,
marginBottom: Sizes.Size_18
},
 button: {
   marginLeft: Sizes.Size_24,
   height: screenHeight*0.07,
   width: screenWidth*0.87,
   justifyContent: "center",
   alignItems: "center",
   backgroundColor: "#028E46",
   borderRadius: Sizes.Size_8,
   bottom: Platform.OS === 'android'?30:70
 },
 buttonsilver: {
  marginLeft: Sizes.Size_24,
  height: screenHeight*0.07,
  width: screenWidth*0.87,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#D3DCEC",
  borderRadius: Sizes.Size_8,
  bottom: Platform.OS === 'android'?20:50
},
 input: {
  height: 40,
  borderWidth: 1,
  padding: 10,
  borderRadius: 5
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
inputStyle: {
  textAlign: I18nManager.isRTL? 'right':'left'
},
 buttonText: {
   color: "white",
   fontSize: 14,
 },
 silverButtonText:{
  color:"#909FBA",
  fontSize: 14,
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

 
});

export default EmailLogin;