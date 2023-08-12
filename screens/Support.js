import React, { useCallback, useEffect, useState, useContext } from 'react';
import { View, ScrollView, RefreshControl, StyleSheet, Dimensions,TouchableOpacity,Linking,FlatList,Image, Text, Alert} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Search } from './Search';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header/Header';
import { SearchProvider } from '../SearchContext';
import { Button, Divider } from 'react-native-paper';


import { Fonts,Colors,Sizes } from '../utils/Constants';

import Notifications from './Notifications';

import { RootContext } from '../RootContext';
import Metrics, { getWidth, getHeight } from '../utils/metrics';
import { colors } from 'react-native-elements';
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get("screen").height;

export const SupportPage = ({ navigation }) => {
    const { t } = useTranslation('SupportModal');
    const { dialCall } = useContext(RootContext)
    const subject = "Callback Requested"
    const [requestCallback, setRequestCallback] = useState(true)



    function openWhatsapp(number) {
        let url = `whatsapp://send?phone=${number}`
        Linking.openURL(url).then((data) => {
            console.log('WhatsApp Opened');
          })
          .catch((error) => {
            console.log("Error in opening whatsapp", error);
          });
    }

    const displayData = [
        {
            'title': !requestCallback? t(`callbackRequested`) : t(`requestCallback`),
            'image': require("../assets/chatSupportIcon.png"),
            'route': 'ticket'
        },
        {
            'title': t(`callUs`),
            'image': require("../assets/phoneSupportIcon.png"),
            'number': '+966115101666',
            'route': 'phone'
        },
        {
            'title': t(`whatsapp`),
            'image': require("../assets/whatsappSupportIcon.png"),
            'number': '+966507840047',
            'route': 'whatsapp'
        }
    ]
        
    function renderItem(item){
        return (
            <TouchableOpacity
                onPress={() => {
                        if (item.route === 'whatsapp') {
                            openWhatsapp(item.number)
                        } 
                        else if (item.route === 'phone') {
                            dialCall(item.number)
                        }
                        else if (item.route === 'ticket') {
                            if(!requestCallback) {
                                Alert.alert(t(`callbackRequested`), t(`callbackAlertMessage`))
                            }
                        }
                    }}>
                <View style={{borderColor: '#D3DCEC', borderWidth: 1, borderRadius: 8, width: screenWidth/1.1, alignSelf: 'center', padding: getHeight(15),marginBottom:getHeight(10)}}>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={item.image}></Image>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={styles.titleStyle}>{item.title}</Text>
                            {item.number && <Text style={styles.numberStyle}>{item.number}</Text>}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        )                  
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
    
    return  (
     
          
            <View style={{flex : 1,  backgroundColor: colors.white}}>
                 <View style={{backgroundColor: Colors.white, marginBottom: getHeight(15), flexDirection: 'row', alignSelf: 'center'}}>
                            <Divider />
                            <FlatList
                                data={topFilterData}
                                horizontal={true}
                                contentContainerStyle={{width: Metrics.screenWidth, justifyContent: 'space-evenly'}}
                                renderItem={renderTopFilters}>
                                </FlatList>
                            </View>
                           
                < Text style={{color: colors.black, fontFamily: Fonts.POPPINS_BOLD, fontSize: Sizes.Size_22, lineHeight: getHeight(30), marginLeft: getHeight(10)}}>{t(`support`)}</Text>
                <FlatList
                    keyExtractor={(item) =>  item?.title}
                    contentContainerStyle={styles.productsListContainer}
                    data={displayData}
                    renderItem={({item}) => renderItem(item)}
                />
              
            </View>
        
  
    )
} 




export const Support = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  return (
   
     <SearchProvider>
  <Stack.Navigator screenOptions={{
                header: ({ navigation, route, options, back }) => {
                    return (
                        <Header stack="Support" navigation={navigation} route={route} />
                    );
                }
            }}>
        
        <Stack.Screen name="Supportpage" component={SupportPage} options={({  }) => ({headerTitle: 'Support' })} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Navigator>
      </SearchProvider>
  
  );
}

export default Support

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
  productsListContainer: {
    height: '72%',
    justifyContent: 'flex-end',
},
titleStyle: {
    textAlignVertical: 'center',
    color: colors.black,
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: Sizes.Size_14,
    lineHeight: getHeight(21),
    marginLeft: getHeight(10)
},
numberStyle: {
    textAlignVertical: 'center',
    color: '#0B1932',
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: Sizes.Size_12,
    lineHeight: getHeight(21),
    marginLeft: getHeight(10)
}
})