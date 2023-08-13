import React, { useCallback, useEffect, useState, useContext } from 'react';
import { View, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Search } from './Search';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../CartContext';
import Header from '../components/Header/Header';
import { SearchProvider } from '../SearchContext';


import { getHeaderTitle } from '@react-navigation/elements';

import { Fonts, Sizes, Colors } from '../utils/Constants';

import Notifications from './Notifications';

import { Support, SupportPage } from './Support';



import Metrics, { getWidth, getHeight } from '../utils/metrics';


export const HomePageComponent = ({ navigation }) => {
  const { t } = useTranslation('Home');
  const [language, setLanguage] = useState(undefined);
  const [refreshing, setRefreshing] = useState(false);
  const [Profile,setProfile]=useState([]);
  const { setShowTabNav  } = useContext(CartContext); 

  useEffect(() => {
    setShowTabNav("flex")
  }, []);


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }




  return (
     <ScrollView contentInsetAdjustmentBehavior="automatic" 
                refreshControl={<RefreshControl
                                 refreshing={refreshing}
                                 onRefresh={onRefresh}/>}>
     <View style={{ justifyContent: 'center', backgroundColor: Colors.white}}>
      
  </View></ScrollView>)
} 

export const Home = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <SearchProvider>
      <Stack.Navigator 
        screenOptions={{
          header: ({ navigation, route, options, back }) => {
            const title = getHeaderTitle(options, route?.name);
            return (
              <Header stack="Home" navigation={navigation} route={route} title={title}/>
            );
          }
        }}
        >
        <Stack.Screen name="evaluatr Home" component={HomePageComponent} options={({ navigation }) => ({
          })} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen component={SupportPage} name="Support" />
        <Stack.Screen component={Support} name="Supportpage" />
      </Stack.Navigator>
      </SearchProvider>
    </View>
  );
}

export default Home

const styles = StyleSheet.create({
  topFilterButton: {
    width: getWidth(113),
    height: getHeight(40),
    marginTop: getHeight(10),
    marginBottom: getHeight(8),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#B0BDD4',
    backgroundColor: Colors.white,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row'
  },
  topFilterName: {
      fontStyle: "normal",
      fontSize: Sizes.Size_12,
      lineHeight: getHeight(18),
      letterSpacing: 0.5,
      color: Colors.green,
      textAlign: 'center',
      textTransform: 'uppercase',
      fontFamily: Fonts.POPPINS_SEMIBOLD,
      textAlignVertical: 'center'
  },
})