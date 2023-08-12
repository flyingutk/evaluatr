import React, { useEffect, useState } from 'react';
import { Adjust, AdjustConfig } from 'react-native-adjust';
import {
  SafeAreaView,
  StatusBar,
  Platform,
  I18nManager,
  AppState,
} from 'react-native';
// import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
// import ReactMoE, { MoEProperties } from 'react-native-moengage';
import { CartProvider } from './CartContext.js';
import BottomNavigation from './components/BottomNavigator';
import './utils/locale/i18n.js';
import i18n from './utils/locale/i18n.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { flipLayout } from './utils/layout/layout.util.js';
import { RootProvider } from './RootContext.js';
import { LogBox } from "react-native";
import Signup from './screens/UserSign.js';
LogBox.ignoreLogs([
  "VirtualizedLists",
  "Each child in a list",
  "The action 'RESET'",
  "Failed prop type",
  "Can't perform a ",
  "ViewPropTypes",
  "Cannot update a component ",
  "VirtualizedLists should never be nested",
  "React has detected",
  "Unsupported top level event",
  "Require cycle: ",
  "source.uri",
  "new NativeEventEmitter()",
  "Found screen"
]);
// const CODE_PUSH_OPTIONS={
//   checkFrequency:codePush.CheckFrequency.ON_APP_START
// }

const TIME_DIFFERENCE = 1000 * 60 * 60 * 4; //4hrs

const AppStatusBar = () => {
  return (
        <StatusBar
          translucent
          backgroundColor="#ffffff"
          barStyle="dark-content"
        />
  );
};

function App() {
  const [token, setToken] = useState('');
  let res = AsyncStorage.getItem("TOKEN").then((result) => {;
   setToken(result)
})
  let remoteConfigFetchFailureCount = 0;

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    // ReactMoE.initialize();
    initPreferences();
    // crashlytics().log('App Mounted');
  //   const listener = AppState.addEventListener('change', (status) => {
  //     if (Platform.OS === 'ios' && status === 'active') {
  //       Adjust.requestTrackingAuthorizationWithCompletionHandler(
  //         (status) => {}
  //       );
  //     }
  //     const adjustConfig = new AdjustConfig(
  //       ADJUST_TOKEN,
  //       ENVIRONMENT === 'PROD'
  //         ? AdjustConfig.EnvironmentProduction
  //         : AdjustConfig.EnvironmentSandbox
  //     );
  //     adjustConfig.setShouldLaunchDeeplink(true);
  //     adjustConfig.setDeferredDeeplinkCallbackListener(function (deeplink) {
  //       console.log('Deferred deep link URL content: ' + deeplink);
  //     });
  //     Adjust.create(adjustConfig);
  //   });
  //   return listener.remove;
  }, []);

  const initPreferences = async () => {
    const selectedLanguage = await AsyncStorage.getItem('custPreferredLang');
    const selectedCurrency = await AsyncStorage.getItem('custPreferredCurr');
    const timestampFetchExchangerRate = await AsyncStorage.getItem(
      'timestampFetchExchangerRate'
    );
    const currentTimestamp = new Date().getTime();
    if (
      (selectedCurrency && selectedCurrency.toLowerCase() === 'iqd') ||
      (timestampFetchExchangerRate &&
        currentTimestamp - parseInt(timestampFetchExchangerRate) >
          TIME_DIFFERENCE)
    ) {
    }
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage === 'en-US' ? 'en' : 'ar');
    } else {
      i18n.changeLanguage('ar');
      await AsyncStorage.setItem('custPreferredLang', 'ar-SA'); 
    }

    // let properties = new MoEProperties();
    // properties.addAttribute('platformOS', Platform.OS);
    // properties.addAttribute('platformVersion', Platform.Version);
    // properties.setNonInteractiveEvent();
    // ReactMoE.trackEvent('appOpened', properties);

    // This method is calling to register the push notifiaction for iOS only
    // ReactMoE.registerForPush();

    /**
     * Sending push notification token to Adjust SDK
     */
    // const token = await messaging().getToken();
    // if (token) {
    //   Adjust.setPushToken(token);
    // }

    // Flip layout depeding on the selected language
    if((i18n.language === "ar" && !I18nManager.isRTL) || 
       (i18n.language !== "ar" && I18nManager.isRTL)) {
      await flipLayout();
    }
  };

  return (
    <RootProvider>
      <CartProvider>
        <AppStatusBar />
        <SafeAreaView 
        style = {{flex: 1, justifyContent: 'center', backgroundColor: "#ffffff", marginTop: StatusBar.currentHeight}}
        >
          <NavigationContainer>
            {
           token === null ? <Signup/>:<BottomNavigation/>
           }
          </NavigationContainer>
        </SafeAreaView>
      </CartProvider>
    </RootProvider>

  );
}

export default App;
