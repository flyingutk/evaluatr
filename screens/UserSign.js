import React from 'react';
import { StyleSheet,Image, Text,Dimensions, View ,TouchableOpacity, ImageBackground} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Mobileotp } from './UserOtp';
import { Fonts, Sizes } from '../utils/Constants';
import EmailLogin from './UserLogin';
import { useTranslation } from 'react-i18next';
import Preferences from './Preferences';
import {SignupInfo} from "./SignUpPage";
const Stack = createNativeStackNavigator();
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export function Signup({ navigation }) {
  

 
  const Signing = (props) => {
    const navigation = props.navigation;
    const { t } = useTranslation('SignUp');
  
    return (
      <>
      
     <View  style={styles.container}>
        <ImageBackground source={require('../assets/imageBack.png')} resizeMode="stretch" style={styles.img}></ImageBackground>
        <TouchableOpacity style={{width:'90%',height:30,marginTop:30, marginHorizontal:20}} onPress={() => navigation.navigate('language')}>
          <Text style={{color:"#FFFFFF",fontFamily:Fonts.POPPINS_REGULAR,fontSize:16, textAlign: 'right'}}>{t(`language`)}</Text>
        </TouchableOpacity>
        
        <View style={styles.evaluatrtext} >
          <Image source={require("../assets/Frame.png")} />
        </View>
        <View style = {styles.maintext}>
          <Text style ={styles.empowerText}>{t(`empowerText`)}</Text>
        </View>
        <View style = {styles.submittext}>
        
         <TouchableOpacity
           style={styles.buttonex}
           onPress={() => navigation.navigate('User Login')}
         >
           <Text style={styles.buttonTextex}> {t(`loginUsername`)}</Text>
         </TouchableOpacity>
         <TouchableOpacity
           style={styles.button}
           onPress={() => navigation.navigate('SignupInfo')}
         >
           <Text style={styles.buttonText}>{t(`signUp`)}</Text>
         </TouchableOpacity>
         {/* <TouchableOpacity
         
           style={styles.button}
           onPress={() => navigation.navigate('Mobileotp',{whichtype : "email"})}
         >
           <Text style={styles.buttonText}>{t(`loginEmail`)} </Text>
         </TouchableOpacity> */}
          {/* email option hidden for some time */}
         </View>
     </View>
   </>
    );
  };
  return (
    
    <Stack.Navigator 
    screenOptions={{

      
      header: ({ navigation}) => {

        
        return (
         
            <View style={[styles.headerWrapper]}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <View style={{ width: 30, height: 30 }}>
                    <Image style={{marginTop:7,marginLeft:7}} source={require("../assets/BackPress.png")}></Image>
                    </View>
                </TouchableOpacity>
            </View>
          
        );
    }
    }}>
      <Stack.Screen
        name="Signing"
        component={Signing}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="language" component={Preferences}  options={{ headerShown: true }}/>
      <Stack.Screen name="Mobileotp" component={Mobileotp} options={{ headerShown: false }} />
      <Stack.Screen name="SignupInfo" component={SignupInfo}/>
      <Stack.Screen name="User Login" component={EmailLogin} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default Signup;

const styles = StyleSheet.create({
  container: {
    height:screenHeight*1,
    width:screenWidth*1,
    backgroundColor:"#0B1932"
     
  },
  submittext :{
  backgroundColor : "#FFFFFF",
  position:"absolute",
  bottom:0,
  height:screenHeight*0.28,
  width:screenWidth*1,
  alignItems: "center",
  paddingTop : 20,
  marginBottom:20,
  borderTopStartRadius: Sizes.Size_8,
  borderTopEndRadius : Sizes.Size_8,
  paddingBottom: 30,
  },
  maintext:{
    marginTop : 10,
    marginLeft: Sizes.Size_32,
    width: 293,
  },
  empowerText: {
    color :"#FFFFFF", 
    fontSize:28 , 
    fontFamily:Fonts.POPPINS_REGULAR,
    fontWeight: '400',
  },
  evaluatrtext:{
    marginTop : 210,
    marginLeft: Sizes.Size_32,
    width:293,
    height:70,
    flexDirection:"row"
  },
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 3,
  },

    
    img: {
      height: screenHeight,
      width: screenWidth,
      justifyContent: 'center',
      alignItems: 'center',
      flex:0.1,
      position:"absolute",
      opacity: 0.35,
      backgroundColor:"#0B1932"
    },
  
  button: {
   
    marginBottom:15,
    height: 48,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF", 
    borderRadius: Sizes.Size_8,
    borderColor : "#028E46",
    borderWidth: Sizes.Size_1
    
  },
  buttonex: {
    marginTop: 20,
    marginBottom:15,
    height: 48,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#028E46",
    borderRadius: Sizes.Size_8,
    borderColor : "#028E46"
    
  },
  buttonText: {
    color: "#028E46",
    fontFamily: Fonts.POPPINS_SEMIBOLD,
    lineHeight: Sizes.Size_18,
    fontSize: Sizes.Size_14,
    textTransform : "uppercase",
    textAlign: 'center'
  },
  buttonTextex: {
    color: "#FFFFFF",
    fontFamily: Fonts.POPPINS_SEMIBOLD,
    lineHeight: Sizes.Size_18,
    fontSize: Sizes.Size_14,
    textTransform : "uppercase",
    textAlign: 'center'
  },
})
