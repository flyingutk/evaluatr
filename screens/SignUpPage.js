import React, { useState, useContext} from "react";
import {
 SafeAreaView,
 StyleSheet,
 View,
 TouchableOpacity,
 Text,
 Alert,
 TextInput,
 Image,
 Dimensions,
 I18nManager
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loader } from "../components/Loader";
import { SignInfo } from "../src/services/api/signup.service";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserLoc from "./UserLocation";
import { useTranslation } from 'react-i18next';
import { Fonts ,Colors, Sizes} from "../utils/Constants";

import { getAuthToken } from "../src/services/api/signup.service";
import { RootContext } from "../RootContext";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const UserInfo = ({navigation,route}) => {
  
  const {selectedLanguage}  = useContext(RootContext); 
  const { t } = useTranslation('SignupInfo');
  const [Gender, setGender] = useState('');
  const [Phone, setPhone] = useState('');
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Confirm, setConfirm] = useState('');
  const [Type,setType] = useState('')
  const [showLoader, setShowLoader] = useState(false);

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  let passreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])/

    
  AsyncStorage.getItem("TYPE").then((item)=>{
    setType(item)
  })
  AsyncStorage.getItem("MOBILENO").then((res)=>{
      {Type === "phone"?
    setPhone(res):null};
    {Type === "email"?setEmail(res):null}
  })
   
  const TokenStore = async (val) => {
    await AsyncStorage.setItem("TOKEN",val)
    const token =await  AsyncStorage.getItem("TOKEN"); 
  } 
  const RefTokenStore = async (val) => {
    await AsyncStorage.setItem("REFTOKEN",val)
    const token =await  AsyncStorage.getItem("REFTOKEN");
  } 
    async function Userinfo(){
      setShowLoader(true);
      SignInfo((data = {
        data:{
          type: "customers",
          attributes: {
              firstName: Fname,
              lastName: Lname,
              gender: "Male",
              salutation: "Mr",
              email: Email,
              password: Password,
              confirmPassword: Confirm,
              acceptedTerms: true,
              phone:Phone
            }
      }}))
      
    .then(async (response)=>{
      if(response.status == 201){
      await AsyncStorage.setItem("MOBILENO",Phone)
      await AsyncStorage.setItem("REFID",response?.data?.data?.id)
      getAuthToken(data={
        data: {
          attributes: {
              password: Password,
              username: Phone
          },
          type: "access-tokens-v2"
      }
      }).then(async (response) => {
        if(response?.status === 201){
          await AsyncStorage.setItem("FNAME",Fname)
          await AsyncStorage.setItem("LNAME",Lname)
          TokenStore(response?.data?.data?.attributes?.accessToken);   
          RefTokenStore(response?.data?.data?.attributes?.refreshToken);  
          setShowLoader(false);
          navigation.navigate("user location")
        }
    }
    ) .catch((err) => {

      if(err?.response?.status === 401 || 422 ){
        console.log("Error",err?.response?.data)
    }
      else{
        console.log("Error",err?.response?.data)
      }
  });
      
    }
     
       
    }).catch((err)=>{
      setShowLoader(false);
      console.log("Error:",err);
      if(err?.response?.status === 401 || 422 ){
        console.log("Error:",err?.response?.data.errors[0].detail);
        if(err?.response?.data.errors[0].detail === "email => This value is not a valid email address."){
        Alert.alert(t('validEmail'))}
        else if(err?.response?.data.errors[0].detail === "password => This value is too short. It should have 8 characters or more."){
          Alert.alert(t('passLen'))}
        else if(err?.response?.data.errors[0].detail === "confirmPassword => This value is too short. It should have 8 characters or more."){
            Alert.alert(t('confirmPassLen'))}
       else if(err?.response?.data.errors[0].detail === "Value in field password should be identical to value in the confirmPassword field."){
             Alert.alert(t('passMismatch'))}
      else if(err?.response?.data.errors[0].detail === "phone => This value should not be blank."){
              Alert.alert(t('emptyPhone'))}
      else if(err?.response?.data.errors[0].detail === "Customer with this phone number already exists."){
              Alert.alert(t('alreadyPhone'))}
      else if(err?.response?.data.errors[0].detail === "Customer with this email already exists."){
              Alert.alert(t('alreadyEmail'))}

    }
      else{
        console.log("Error",err.response.data.data);
        Alert.alert(t('somethingWrong'))
      }

    })}
    
    return (
    <ScrollView>
     <View style={styles.container}>

     <View style={styles.evaluatrlogo}>
     <TouchableOpacity onPress={navigation.goBack}>
                    <View style={{ width: 30, height: 30,flex:1,alignItems:"center",justifyContent:"center" }}>
                    {selectedLanguage === "en-US"?<Image source={require("../assets/BackPress.png")}></Image>:<Image style={{marginTop:7,marginLeft:20}} source={require("../assets/BackPressAr.png")}></Image>}
                    </View>
       </TouchableOpacity>
                <View style ={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Image style = {{width: 75, height: 26}}source={require("../assets/evaluatrlogoGreen.png")} /> 
      </View>
      </View> 
      <View style={styles.screenbar}>
     <Text style={styles.topTabSelected}>{t(`profileDetails`)}</Text>
     <Text style={styles.topTab}>{t(`storeDetails`)}</Text>
     
      </View> 
      <View style={styles.screenbarab}>
      <Image style={{marginTop: -18,width:screenWidth*0.41}} source={require("../assets/greenBar.png")} />
      <Image style={{marginTop: -18, width:screenWidth*0.41,marginLeft: 30}} source={require("../assets/silverBar.png")} />
     </View>
      <View style={styles.signin}>
        <Text numberOfLines={2} style={styles.tellUsHeading}>{t('tellUs')}</Text>
        </View>
        
       <SafeAreaView style={styles.wrapper}>
         
      <TextInput
        style={styles.input}
        placeholderTextColor="#000000" 

        theme={{colors: {primary: '#028E46'}}}
        placeholder={t(`fName`)}
        onChangeText={newname => setFname(newname)}
        defaultValue={Fname}
      />
      <TextInput
        style={styles.input}
        theme={{colors: {primary: '#028E46'}}}
        placeholder={t(`lName`)}
        placeholderTextColor="#000000" 
        onChangeText={newlast => setLname(newlast)}
        defaultValue={Lname}
      />
      {Type === "phone" &&<TextInput
        style={styles.input}
        placeholderTextColor="#000000" 
        theme={{colors: {primary: '#028E46'}}}
        placeholder={t(`email`)}
        onChangeText={newmail => setEmail(newmail)}
        defaultValue={Email}
      />}
      { Email =="" || reg.test(Email) === false  && <Text style={{ color:"#F9774D" ,fontSize: 14,alignSelf:"center",textAlign:"center"  }}>{t('emailErr')}</Text>}
      
      
      <TextInput
       theme={{colors: {primary: '#028E46'}}}
        style={styles.input}
        placeholderTextColor="#000000" 
        placeholder={t(`password`)}
        secureTextEntry={true}
        onChangeText={newpass => setPassword(newpass)}
        defaultValue={Password}
      />
      {  Password =="" || passreg.test(Password) === false  && <Text style={{ color:"#F9774D" ,fontSize: 14,alignSelf:"center",textAlign:"center" }}>{t('passErr')}</Text>}
         <TextInput
          theme={{colors: {primary: '#028E46'}}}
        style={styles.input}
        placeholderTextColor="#000000" 
        placeholder={t(`cPassword`)}
        secureTextEntry={true}
        onChangeText={newconfrm => setConfirm(newconfrm)}
        defaultValue={Confirm}
      />
      {Type === "email" &&
      <PhoneInput
      containerStyle={styles.phoneContainer}
      defaultCode={"SA"}
      placeholder={t(`phonenum`)}
      textContainerStyle={{backgroundColor:"#FFFFFF",borderRadius:8}}
      onChangeFormattedText={newText => {
       setPhone(newText)}}
      defaultValue={Phone}
      textInputStyle={styles.inputStyle}
      textInputProps={{ returnKeyType : "done" }}
    />}
    {!(Confirm == Password || Confirm =="") && <Text style={{ color:"#F9774D" ,fontSize: 14,alignSelf:"center",textAlign:"center" }}>{t('confirmErr')}</Text>}
     
      <View style={{zIndex:-1,height:screenHeight*0.35,alignSelf:"flex-end"}}>
      <Image style={{zIndex:-1,height:screenHeight*0.53,width:screenWidth*0.9,marginTop:-70}} source={require("../assets/evaluatrlogo.png")} />
    </View>
       
       {showLoader ? <View style={styles.loaderView}><Loader /></View>: 
      <View style={{position:"absolute",bottom:50,alignSelf:"center",alignItems:"center",justifyContent:"center"}}>
       {( Fname == "" || Lname == "" || Email == ""  || Password == "" || Confirm == "" || Phone == "")?
        <TouchableOpacity
           style={styles.buttonsilver}
           
         >
          <Text style={styles.silverButtonText}>{t(`step2`)}</Text>
         </TouchableOpacity>:
         <TouchableOpacity
           style={styles.buttongreen}
           onPress={Userinfo}
         >
           <Text style={styles.buttonText}>{t(`step2`)}</Text>
         </TouchableOpacity>}
         </View>}
      
       {/* <View style={{marginTop:-150,marginLeft:90}}>
         
       <Image source={require("../assets/evaluatrlogo.png")} style ={{zIndex:-1}} />
         </View> */}
         </SafeAreaView>
     </View>
     </ScrollView>
 );

};
const Stack = createNativeStackNavigator();
export function SignupInfo({navigation} ) {
 
  

return (
    
  <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen
      name="UserInfo"
      component={UserInfo}
      options={{ headerShown: false }}
    />
    
    <Stack.Screen
      name="user location"
      component={UserLoc} options={{ headerShown: false }}
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
    
  
  phoneContainer: {
    borderRadius: Sizes.Size_8,
    borderColor: "#909FBA",
    borderWidth: Sizes.Size_1,
    backgroundColor:"#D3DCEC",
    width:screenWidth * 0.9,
    height: screenHeight * 0.09,
    textAlign: 'left'
  },
  signin:{
  height:screenHeight*0.08,
  width:screenWidth*0.95,
  marginLeft:20,
  },
  tellUsHeading: {
    fontFamily:Fonts.POPPINS_BOLD,
    color: "#0B1932",
    display:"flex",
    fontSize : screenWidth * 0.06
},
  tellUsText: {
    fontFamily:Fonts.POPPINS_REGULAR,
    color:"#333333",
    fontSize: Sizes.Size_14,
    lineHeight: Sizes.Size_18
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
    position:"absolute",
    bottom:50
  },
  topTab: {
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: Sizes.Size_12,
    lineHeight: 15,
    textAlign: 'center',
    color: '#909FBA',
    marginLeft: Sizes.Size_30,
  },
  topTabSelected: {
    fontFamily: Fonts.POPPINS_SEMIBOLD,
    fontSize: Sizes.Size_12,
    lineHeight: 15,
    textAlign: 'center',
    color: '#0E4924',
   justifyContent:"center",
   marginRight:screenWidth * 0.25
  },
  wrapper: {
   justifyContent: "center",
   alignItems: "center",
   marginLeft:20,
   marginRight:20,
  },
  inputStyle: {
    textAlign: I18nManager.isRTL? 'right':'left'
  },
 evaluatrlogo:{
  padding: 10,
  flexDirection:"row",
  width:screenWidth*1,
  height:screenHeight*0.06
 },
 screenbar:{
  padding: 20,
  alignSelf:"center",
  flexDirection:"row",
  marginTop:3,
  justifyContent:"center",
  alignItems:"center"
},
screenbarab:{
  padding: 20,
  alignSelf:"center",
  flexDirection:"row",
  marginTop:-5,
},
input: {
  color:"#000000",
  height: screenHeight*0.064,
  width:screenWidth*0.9,
  borderWidth: 1,
  padding: 10,
  borderRadius: Sizes.Size_8,
  margin:5,
  textAlign: 'left',
  borderColor:"#909FBA",
  justifyContent: 'center'
},
 

buttonsilver: {
  
  marginLeft : 40,
  marginRight : 40,
  height: screenHeight*0.064,
  width: screenWidth*0.9,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#D3DCEC",
  borderRadius: Sizes.Size_8,
},
buttongreen: {
  
  marginLeft : 40,
  marginRight : 40,
  height: 48,
  width: 343,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#028E46",
  borderRadius: Sizes.Size_8,
  
},
silverButtonText: {
  color: "#909FBA",
  fontSize: Sizes.Size_14,
  lineHeight: Sizes.Size_18,
  fontFamily: Fonts.MONTSERRAT_SEMIBOLD
},
buttonText: {
  color: "#FFFFFF",
  fontSize: Sizes.Size_14,
  lineHeight: Sizes.Size_18,
  fontFamily: Fonts.MONTSERRAT_SEMIBOLD
},
});

export default SignupInfo;