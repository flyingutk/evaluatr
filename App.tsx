/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import LoginScreen from './src/views/login';
import {ThemeProvider} from '@shopify/restyle';
import theme from './src/restyle/theme';
import {retrieveData, STORAGE_CONSTANT} from './src/helpers/storageHelpers';
import RootNavigator from './src/navigations/RootNavigator';
import {UserContextProvider} from './src/context/UserContext';
import { RootStackParamList } from './src/navigations/navigationTypes';
const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const AppStack = createNativeStackNavigator();
  const [appLoading, setAppLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => {
    void (async () => {
      try {
        // await RNAnalytics.startSession();
        setAppLoading(true);
        const token = await retrieveData(STORAGE_CONSTANT.USER_TOKEN);
        if (token !== null) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
        setAppLoading(false);
      } catch (e) {
        setAppLoading(false);
      }
    })();
    // setTimeout(() => {
    //   SplashScreen.hide();
    // }, 2000);
  }, []);

  const options: NativeStackNavigationOptions = {
    headerShown: false,
  };
  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamList>>(null);
  if (appLoading) {
    return <ActivityIndicator />;
  }

  return (
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        <SafeAreaView style={styles.safeAreaViewStyle}>
          {/* <BottomSheetModalProvider> */}
          <NavigationContainer ref={navigationRef}>
            <AppStack.Navigator
              screenOptions={options}
              initialRouteName={isLoggedIn ? 'RootStack' : 'Auth'}>
              <AppStack.Screen name="Auth" component={LoginScreen} />
              <AppStack.Screen name="RootStack" component={RootNavigator} />
            </AppStack.Navigator>
          </NavigationContainer>
          {/* </BottomSheetModalProvider> */}
          {/* <Toast config={toastConfig} bottomOffset={IsIos ? 100 : 70} visibilityTime={2000} position="bottom" /> */}
        </SafeAreaView>
      </ThemeProvider>
    </UserContextProvider>
  );
};
const styles = StyleSheet.create({safeAreaViewStyle: {flex: 1}});
export default App;
