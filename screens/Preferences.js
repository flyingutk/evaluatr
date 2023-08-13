import React, { useState, useEffect, useContext } from 'react';
import { I18nManager, StyleSheet, View,Image,Dimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Mobile from '../components/Mobile';
import { List, Button, Divider, Subheading } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../utils/locale/i18n';
import { useTranslation } from 'react-i18next';
import { flipLayout } from '../utils/layout/layout.util';
import { getExchangeRate } from '../src/services/api/homepage.service.js';
import { RootContext } from '../RootContext';
import { Fonts } from '../utils/Constants';
const Stack = createNativeStackNavigator();
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export function Preferences({ navigation }) {
  const { t } = useTranslation('Preferences');
  const [language, setLanguage] = useState('ar-SA');
  const [currency, setCurrency] = useState('usd');
  const { initialize } = useContext(RootContext);
  const {selectedLanguage}  = useContext(RootContext); 
  useEffect(() => {
    getPreferences();
  }, []);
  const getPreferences = async () => {
    const selectedLanguage = await AsyncStorage.getItem('custPreferredLang');
    setLanguage(selectedLanguage ? selectedLanguage : 'en-US');
    const selectedCurrency = await AsyncStorage.getItem('custPreferredCurr');
    setCurrency(selectedCurrency ? selectedCurrency : 'usd');
    const exchangeRate = await AsyncStorage.getItem('exchangeRate');
    if (!exchangeRate) {
      await fetchExchangeRate();
    }
  };
  const fetchExchangeRate = async () => {
    // Fetch Exchange rate
    if (currency === 'iqd') {
      try {
        const exchangeRateResponse = await getExchangeRate();
        if (
          exchangeRateResponse.data?.factor &&
          exchangeRateResponse?.data?.source?.toLowerCase() === 'usd' &&
          exchangeRateResponse?.data?.target?.toLowerCase() === 'iqd'
        ) {
          await AsyncStorage.setItem(
            'exchangeRate',
            exchangeRateResponse.data?.factor.toString()
          );
        } else {
          console.log('Error in the response of exchange rate');
          setCurrency('usd');
        }
      } catch (error) {
        console.log('Error while fetching exchange rate :: ', error);
        setCurrency('usd');
      }
    }
  };
  /**
   * Store selected language and currency preference.
   */
  const storePreferences = async () => {

    try {
      await AsyncStorage.setItem('custPreferredLang', language);
      await AsyncStorage.setItem('custPreferredCurr', currency);
      //Switch language
      i18n.changeLanguage(language === 'en-US' ? 'en' : 'ar');
      if ((i18n.language === "ar" && !I18nManager.isRTL) ||
        (i18n.language !== "ar" && I18nManager.isRTL)) {
        await flipLayout();
      }
      initialize();
      //await fetchExchangeRate();
    } catch (error) {
      console.log('Error in setting language or currency preference.');
    }
  };

  const PreferencesLister = () => {
    return (
      <View style={{ height:screenHeight*0.85,width:screenWidth*1, justifyContent: 'flex-start', backgroundColor: "#fff"}}>
          <List.Section  titleStyle={{fontFamily:Fonts.POPPINS_REGULAR,fontWeight:"700",color:"#0B1932",fontSize:16}} title={`${ t(`language`) }`} id="1">
          <List.Item right={() => {return language === "en-US" && <Image style={{height:24,width:24,marginRight:20}} source={require("../assets/greenTick.png")} /> }} style={styles.listItem}  titleStyle={{fontFamily:Fonts.POPPINS_REGULAR,fontWeight:language==="en-US"?"600":"400",fontSize:17,lineHeight:18}} title={t(`english`)} onPress={() => setLanguage("en-US")}/>
            <Divider />
           
            <List.Item right={() => {return language === "ar-SA" && <Image style={{height:24,width:24,marginRight:20}} source={require("../assets/greenTick.png")} /> }} style={styles.listItem} titleStyle={{fontFamily:Fonts.POPPINS_REGULAR,fontWeight:language==="ar-SA"?"600":"400",fontSize:17,lineHeight:18}} title={t(`arabic`)} onPress={() => setLanguage("ar-SA")}/>
          </List.Section>
          {/* <List.Section title={`${ t(`currency`) }`} id="2">
            <List.Item right={() => {return currency === "usd" && <List.Icon icon={"check"} /> }} style={styles.listItem} title={t(`usd`)} onPress={() => setCurrency("usd")}/>
            <Divider />
            <List.Item right={() => {return currency === "iqd" && <List.Icon icon={"check"} /> }} style={styles.listItem} title={t(`iqd`)} onPress={() => setCurrency("iqd")}/>
          </List.Section> */}
          <View style={{zIndex:-1,position:"absolute",bottom:0,alignSelf:"flex-end"}}>
            </View>
          <View style={styles.stickyView}
            onPress={storePreferences}
            icon="content-save"
            mode="contained"
            compact="true"
          >
            <Button
              style={styles.stickyButton}
              onPress={storePreferences}
            >
              <Subheading style={{ color: "#fff",fontFamily:Fonts.POPPINS_REGULAR,fontWeight:"600",fontSize:14 }}>{t(`save`)}</Subheading>
            </Button>
          </View>
      </View>
    );
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Preferences"
        component={PreferencesLister}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Language" component={Mobile} />
    </Stack.Navigator>
  );
}

export default Preferences;

const styles = StyleSheet.create({
  listItem: {
    backgroundColor:"#fff", 
    paddingLeft: 25
  },
  stickyButton: { 
    flex: 1, 
    height: 50, 
    justifyContent: "center"
  },
  stickyView:{
    backgroundColor: "#028E46", 
    position: "absolute", 
    flexDirection: "row", 
    bottom: 20, 
    height:screenHeight * 0.06,
    width:'95%',
    borderRadius:8,
    marginBottom:35,
    alignSelf:"center"
  }
})
