import React, { useCallback, useEffect, useState, useContext } from 'react';
import { View, ScrollView, RefreshControl, StyleSheet, TouchableOpacity, FlatList, Image, Text} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Search } from './Search';
import { CategoryCarousel } from '../components/Home/CategoryCarousel';

import ProductsListing from '../components/Home/ProductsListing';
import { useTranslation } from 'react-i18next';
import moment from 'moment'
import { CartContext } from '../CartContext';
import { useIsFocused } from '@react-navigation/native';
import Header from '../components/Header/Header';
import { SearchProvider } from '../SearchContext';
import { Button, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { getHeaderTitle } from '@react-navigation/elements';

import { Fonts, Sizes, Colors } from '../utils/Constants';
import { BrandCarousel } from '../components/Home/BrandsCarousel';

import Notifications from './Notifications';
import ImageGrid from '../components/Home/ImageGrid';

import { RootContext } from '../RootContext';

import { Support, SupportPage } from './Support';



import Metrics, { getWidth, getHeight } from '../utils/metrics';


export const HomePageComponent = ({ navigation }) => {
  const { t } = useTranslation('Home');
  const [homePageApiResponse, setHomePage] = useState([]);
  const isFocused = useIsFocused();
  const [location, setLocation] = useState(undefined);
  const [language, setLanguage] = useState(undefined);
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [Profile,setProfile]=useState([]);
  const { itemsCount, setCartId, getItemsCount, setShowTabNav  } = useContext(CartContext); 
  const { dialCall } = useContext(RootContext);

  useEffect(() => {
    fetchData();
    fetchCartId()
    getItemsCount()
    setShowTabNav("flex")
    fetchOrdersData();
  }, []);

  useEffect(() => {isFocused && itemsCount },[isFocused]);

  const fetchCartId = async () =>{
  }
  async function fetchOrdersData(){
  }
  
  let deliveryDate = moment(orders?.attributes?.createdAt).add(2, 'day').format('dddd,MMMM Do YYYY')
  async function fetchData() {
    AsyncStorage.getItem("custPreferredLang").then(response => {
      if(response) {
        setLanguage(response);
      }
      else { 
        setLanguage("ar-SA");
      }
    });
    
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const topFilterData = [
    {
      'name': t(`myOrders`),
      'image': require('../assets/myOrdersImage.png'),
      'navigate': "Orders"
    },
    {
      'name': t(`priceDrop`),
      'image': require('../assets/priceDropImage.png'),
      'navigate': "PriceDrop"
    },
    {
      'name': t(`myItems`),
      'image': require('../assets/myItemsImage.png'),
      'navigate': "MyItems"
    }
  ]

  const renderTopFilters = ({item} ) => {
    return ( 
      <TouchableOpacity onPress={() => navigation.navigate(item.navigate)}>
        <View style={styles.topFilterButton}>
          <Image source={item.image} style={{alignSelf: 'center'}}></Image>
          <Text style={styles.topFilterName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
     <ScrollView contentInsetAdjustmentBehavior="automatic" 
                refreshControl={<RefreshControl
                                 refreshing={refreshing}
                                 onRefresh={onRefresh}/>}>
     <View style={{ justifyContent: 'center', backgroundColor: Colors.white}}>
      <View style={{backgroundColor: Colors.white, marginBottom: getHeight(15), flexDirection: 'row', alignSelf: 'center'}}>
        <Divider />
        <FlatList
          data={topFilterData}
          horizontal={true}
          contentContainerStyle={{width: Metrics.screenWidth, justifyContent: 'space-evenly'}}
          renderItem={renderTopFilters}>
        </FlatList>
      </View>

      {orders.length !== 0 && <View style={{backgroundColor: Colors.paleYellow, marginBottom: getHeight(15), width: Metrics.screenWidth, alignSelf: 'center'}}>
       <View style={{flexDirection:"row" , marginLeft: getWidth(10), marginTop: getHeight(10), marginRight: getWidth(10)}}>
        <Text style ={{fontFamily:Fonts.POPPINS_BOLD , fontSize: Sizes.Size_14 ,lineHeight: getHeight(18) ,flex:0.8, color: Colors.blackTwo}}>{t('order')} #{orders[orders.length -1]?.id}</Text>
        <View style={{flex:0.25,padding:5,justifyContent:"center",alignItems:"center",borderRadius:8,backgroundColor: Colors.yellow}}>
          <Text style={{textTransform:"capitalize", fontFamily:Fonts.POPPINS_REGULAR, fontSize: Sizes.Size_12, lineHeight: getHeight(16)}}>{orders[orders.length -1]?.attributes?.itemStates[0]}</Text>
        </View>
       </View>
       <Text style={{textTransform:"capitalize",fontFamily:Fonts.POPPINS_REGULAR, fontSize:Sizes.Size_12, lineHeight: getHeight(16), color: Colors.blackTwo, marginLeft: Sizes.Size_10, marginBottom: getHeight(10)}}>{t("delivery")} :<Text style={{fontFamily:Fonts.POPPINS_SEMIBOLD}}>{deliveryDate}</Text></Text>
       <View style ={{flexDirection:'row',marginLeft: Sizes.Size_10, marginBottom: getHeight(10)}}>
       <TouchableOpacity  onPress={()=>{navigation.navigate('Order Detail', {
                            orderId: orders[orders.length -1]?.id
                                })}}>
     <Text style={{alignSelf:"center",textTransform:"uppercase",fontSize: Sizes.Size_12,lineHeight: getHeight(16), fontFamily:Fonts.POPPINS_SEMIBOLD,fontWeight:"600",color: Colors.green}}>{t('viewOrder')}</Text>
 
     </TouchableOpacity>
    <TouchableOpacity onPress={()=>dialCall('+966115101666')}>
        <Text style={{alignSelf:"center",marginLeft:10,textTransform:"uppercase",fontSize:12,lineHeight:16,fontFamily:Fonts.POPPINS_SEMIBOLD,fontWeight:"600",color: Colors.green}}>{t('callUs')}</Text>
        </TouchableOpacity>
       </View>
       </View>}
     {
     homePageApiResponse?.map((item, index) => {
       if(item.__component === "list.category-list"){
         return <CategoryCarousel key={index} data={item} navigation={navigation}/>;
        } else if(item.__component === "list.banner-list"){
          return  <BannerCarousel key={index} data={item} navigation={navigation} />
        } else if(item.__component === "list.product-list"){
          return (<ProductsListing key={index} data={item} navigation={navigation}/>);
        } else if(item.__component === "list.brand-list"){
          return <BrandCarousel key={index} data={item} navigation={navigation}/>;
        } else if(item.__component === "grid.image-grid"){
          return <ImageGrid key={index} data={item} navigation={navigation}/>;
        }
      })
    }
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