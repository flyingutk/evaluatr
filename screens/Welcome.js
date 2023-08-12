import React, { useState, useContext} from "react";
import {
 StyleSheet,
 View,
 TouchableOpacity,
 Text,
 Image,
 Dimensions,
B
} from "react-native";
import { RootContext } from "../RootContext";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { Fonts } from "../utils/Constants";
import BottomNavigation from "../components/BottomNavigator";
import { addShoppingList, getShoppingLists } from "../src/services/api/product.service";
import { customerId } from "../src/services/api/cart.service";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const Stack = createNativeStackNavigator();
export function Welcome({navigation,route} ) {
  const {selectedLanguage}  = useContext(RootContext); 
  const { t } = useTranslation('Welcome');
    const Thankyou =  ({navigation}) => {
      const[Fname,setFname]=useState('')
      const[Lname,setLname]=useState('')
  const handleSubmit = async (e) => {
    addShoppingList().then((response)=>{
      if(response.status == 201){
        getShoppingLists().then((response) => {
          response?.data?.data.map((order) => {
            if(order.attributes.name === 'My Items') {
              AsyncStorage.setItem("SHOPPINGLIST",order.id)
          };  
        })
      })
    }}).catch((err)=>{console.log("Error:",err.response.data)});
    customerId().then((response)=>{
      AsyncStorage.setItem("FNAME",response?.data?.data[0]?.attributes?.firstName)
      AsyncStorage.setItem("LNAME",response?.data?.data[0]?.attributes?.lastName)
      AsyncStorage.setItem("REFID",response?.data?.data[0]?.id)
      AsyncStorage.setItem("MOBILENO",response?.data?.data[0]?.attributes?.phone);
      AsyncStorage.setItem("EMAIL",response?.data?.data[0]?.attributes?.email)

    })
    navigation.navigate("navbar")
  };
  AsyncStorage.getItem("FNAME").then((response)=>setFname(response))
  AsyncStorage.getItem("LNAME").then((response)=>setLname(response))
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
       <View style ={{alignSelf:"center",marginTop:30}}>
       <Image source={require("../assets/greenTick.png")} />
       </View>
       <View style={styles.wrapper}>
         
         <Text style={styles.welcometext}>{t(`welcomeText`)}</Text>
           <Text style={styles.evaluatrtext}>{t(`evaluatrText`)} {Fname} {Lname} !</Text>
       
           </View>
           <View style={{marginLeft:90}}>
         
         <Image source={require("../assets/evaluatrlogo.png")} />
           </View>
           <View style={styles.submit}>
         <TouchableOpacity
           style={styles.button}
           onPress={handleSubmit}
         >
           <Text style={styles.buttonText}>{t(`startBrowsing`)}</Text>
         </TouchableOpacity>
         
         </View>
       
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
      name="Thankyou"
      component={Thankyou}
      options={{ headerShown: false }}
    />
    
    <Stack.Screen

      name="navbar"
      component={BottomNavigation} options={{ headerShown: false }}
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
    evaluatrtext:{
      color :"#333333",
      alignSelf : "center",
      marginLeft:40,
      marginRight:40,
      marginBottom:20,
      alignItems :"center",
     fontSize:14,
     textAlign:"center",
     fontFamily:Fonts.POPPINS_REGULAR,
     fontWeight:"400"
    },
    welcome:{
      padding: 10,
      flexDirection:"row",
      width:screenWidth*1,
      height:screenHeight*0.06
    },
    submit: { 
      position:"absolute",
      bottom:60,
      marginLeft:50
     },
    welcometext:{
        color : "#333333",
        alignSelf : "center",
        marginLeft:40,
        marginRight:40,
        marginBottom : 20,
        alignItems :"center",
       fontSize:24,
       fontFamily:Fonts.POPPINS_BOLD,
       
        alignItems:"center",
        textAlign:"center",
      },
    wrapper: {
     
      justifyContent: "flex-end",
      alignItems: "center",
      height:screenHeight * 0.4,
      width:screenWidth*1   ,
    },
   
    button: {
      marginTop: 20,
      marginBottom:25,
      height: screenHeight * 0.067,
      width: screenWidth * 0.77,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#028E46",
      shadowColor: "rgba(0,0,0,0.4)",
      shadowOffset: {
        width: 1,
        height: 5,
      },
      borderRadius: 10,
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    },
   
    buttonText: {
      color: "white",
      fontSize: 14,
    },
  })

export default Welcome;