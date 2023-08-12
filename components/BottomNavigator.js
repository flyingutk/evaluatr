import React, { useContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CommonActions } from '@react-navigation/native';
import { MoreDetails } from "../screens/More.js";
import { Image, Platform } from "react-native";


import Home  from "../screens/Home";
import { CartContext } from "../CartContext";
import { useTranslation } from 'react-i18next';
import { RootContext } from "../RootContext";
import { Fonts } from "../utils/Constants";

import { Support, SupportPage } from "../screens/Support.js";
const Tab = createBottomTabNavigator();
const  BottomNavigation = ({ navigation }) => {  
  const { initialize, updateUserProfile } = useContext(RootContext);
  const { t, i18n } = useTranslation('BottomNavigator');
  const [showSupportModal, setShowSupportModal] = useState(false)
  const [nav, setNav] = useState(undefined)
  const [prevScreen, setPrevScreen] = useState(undefined)

  const { renderHelper, getItemsCount, fetchCartsData, showTabNav ,cartId} = useContext(CartContext);

  const color = "#A240B7";
  const size = 30;

  useEffect(() => {
    initialize();
  }, []);


  const onCloseModal = () => {
    setShowSupportModal(false)
    nav.navigate(prevScreen)
  }
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#028E46",
        tabBarInactiveTintColor: "#607099",
        initialRouteName: "Home",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel : t(`home`),
          tabBarLabelStyle : {fontFamily:Fonts.POPPINS_REGULAR},
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarIcon: (tabInfo) =>tabInfo.focused ?<Image source={require("../assets/homeGreen.png")}></Image>:<Image source={require("../assets/homeSilver.png")}></Image>
        }}
        listeners={({navigation})=>({
          blur:()=>{
            navigation.dispatch(
              CommonActions.reset({
                index:0,
                routes:[{name:'evaluatr Home'}]
              })
            )
          },
        })}
      />
      <Tab.Screen
        name="Support"
        component={Support}
        options={{
          tabBarLabel : t(`support`),
          tabBarLabelStyle : {fontFamily:Fonts.POPPINS_REGULAR},
          headerShown: false,
          tabBarHideOnKeyboard: true,          
            tabBarIcon: (tabInfo) =>tabInfo.focused ?<Image style={{height:24,width:24}} source={require("../assets/SupportGren.png")}></Image>:<Image source={require("../assets/support.png")}></Image>
          
        }}
        listeners={({navigation})=>({
          blur:()=>{
            navigation.dispatch(
              CommonActions.reset({
                index:0,
                routes:[{name:'Supportpage'}]
              })
            )
          },
        })}
      />
      <Tab.Screen
        name="My Account"
        component={MoreDetails}
        options={{
          tabBarLabel : t(`myAccount`),
          tabBarLabelStyle : {fontFamily:Fonts.POPPINS_REGULAR},
          headerShown: false,
          tabBarStyle: { display: showTabNav },
          tabBarHideOnKeyboard: true,
          tabBarIcon: (tabInfo) =>  tabInfo.focused ?<Image source={require("../assets/userGreen.png")}></Image>:<Image source={require("../assets/userSilver.png")}></Image>
        }}
        listeners={({navigation})=>({
          blur:()=>{
            navigation.dispatch(
              CommonActions.reset({
                index:0,
                routes:[{name:'MoreScreen'}]
              })
            )
          },
        })}
      />
    </Tab.Navigator>
  );
}
export default BottomNavigation