import AsyncStorage from '@react-native-async-storage/async-storage';
import CookieManager from '@react-native-cookies/cookies';
import React, { useContext, useRef } from 'react';
import { CartContext } from "../CartContext";
import { Platform, SafeAreaView } from "react-native";
import { WebView } from 'react-native-webview';

// import { WEB_VIEW_LOGIN, WEB_VIEW_HOME, COOKIE_NAME} from "@env";
import { RootContext } from "../RootContext";

const { initCart, initShippingData, initClientProfileData } = useContext(CartContext);

export function LoginScreen({ navigation }) {
  const CHECK_COOKIE = `setTimeout(() => window.ReactNativeWebView.postMessage("Cookie: " + document.cookie), 0);true;`;
  const { updateUserProfile } = useContext(RootContext);
  const webViewRef = useRef(null);
  /**
   * When the OAuth2 server redirects, check for the URL to intercept the web view.
   *  
   * @param {*} navigationState 
   */
  const onNavigationStateChange = (navigationState) => {
    webViewRef.current.injectJavaScript(CHECK_COOKIE);
    if (navigationState.url == `${WEB_VIEW_HOME}`) {
      console.log(`Navigating to the URL ${navigationState.url}`);

      setTimeout(() => {
        webViewRef.current.injectJavaScript(CHECK_COOKIE);
      }, 2000)
    }
  }
  /**
   * Get all the cookies including auth cookie.
   * @param {*} event 
   */
  const onMessage = (event) => {
    let cookies = CookieManager.get(`${WEB_VIEW_HOME}`);

    if (Platform.OS === "ios") {
      // console.log(CookieManager.get("https://demo.qa.amalcloud.net/", true));
      console.log(CookieManager.getAll(true));
      cookies = CookieManager.getAll(true);
    }


    cookies.then(async (cookie) => {
      const cookieValue = cookie[COOKIE_NAME];
      try {
        await AsyncStorage.setItem("VtexIdclientAutCookie", cookieValue.value);
        let orderFormId = await AsyncStorage.getItem("orderFormId");
        if (orderFormId) {
          await getOrderFormIdDetails(orderFormId)
            .then((response) => {
              initCart(response?.data);
              initShippingData(response?.data?.shippingData);
              initClientProfileData(response?.data?.clientProfileData);
              if(response?.data?.clientProfileData?.email){
                updateUserProfile(response.data.clientProfileData.email);
              }
            })
            .catch((error) => console.log(error));
        }
        // If the auth cookie is available and successfully saved in the Async storage redirect to the home page.
        //console.log(VtexIdclientAutCookie_amalsandbox);
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        CookieManager.clearAll(true);

      } catch (e) {
        //TODO:If auth cookie is not saved successfully reload the login page.
        console.log("Error in saving cookie.", e)
      }

    })
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        javaScriptEnabled={true}
        ref={webViewRef}
        source={{ uri: `${WEB_VIEW_LOGIN}` }}
        onNavigationStateChange={onNavigationStateChange}
        onMessage={onMessage}
        thirdPartyCookiesEnabled={true}
        sharedCookiesEnabled={true}
      />
    </SafeAreaView>
  );
}