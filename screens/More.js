import React, { useEffect, useState, useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, TouchableOpacity, Image,FlatList,Dimensions, ScrollView} from 'react-native';
import { useTranslation } from 'react-i18next'
import { Preferences } from './Preferences';
import { LoginScreen } from './LoginScreen';

import moment from 'moment'
import { Signup } from './UserSign';
import { formatPrice } from "../utils/priceUtils";
import { List } from 'react-native-paper';


import { getHeaderTitle } from '@react-navigation/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootContext } from "../RootContext";
import { CartContext } from "../CartContext";

import { Fonts , Sizes } from '../utils/Constants';
import { colors } from 'react-native-elements';
import RNRestart from 'react-native-restart';

import ProfileInfo from './ProfileUpdate';

import Notifications from './Notifications';
const Stack = createNativeStackNavigator();
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const More = ({ navigation }) => {
    const [Phone, setPhone] = useState('');
    const [orders, setOrders] = useState([]);
    const [Profile,setProfile]=useState([]);
    const [First, setFirst] = useState('');
    const [Last, setLast] = useState('');
    const [Email, setEmail] = useState('');
    const [RefId, setRefId] = useState('');
    AsyncStorage.getItem("MOBILENO").then((response)=>{
     setPhone(response)})
    AsyncStorage.getItem("FNAME").then((response)=>{
        setFirst(response)})
    AsyncStorage.getItem("LNAME").then((response)=>{
            setLast(response)})
    AsyncStorage.getItem("EMAIL").then((response)=>{
                setEmail(response)})
    AsyncStorage.getItem("REFID").then((response)=>{
        setRefId(response)})
     const { setShowTabNav } = useContext(CartContext);
    const { removeUserDetails } = useContext(RootContext);
    const { initCart, initShippingData, initClientProfileData } = useContext(CartContext);
    
    const [loggedIn, setLoggedIn] = useState(false);
    const { t } = useTranslation('More');
    useEffect(() => {
        fetchOrdersData();
      }, []);
    const DATA = [
        {
          
          title:t(`profile`),
          image:require('../assets/MyProfile.png')
        },
        {
            title:t(`orders`),
            image:require('../assets/MyOrders.png')
        },
        {
            title:t('stores'),
            image:require('../assets/MyStores.png')
        },
        {
            title:t('myItems'),
            image:require('../assets/MyItems.png')
        },
        {
            title:t('language'),
            image:require('../assets/Language.png')
        },
        {
            title:t('evaluatrCredit'),
            image:require('../assets/evaluatrCredit.png')
        },
        {
            title:t('FAQ'),
            image:require('../assets/FaqLogo.png')
        },
        {
            title:t('notification'),
            image:require('../assets/NotificationLogo.png')
        },
        
      ];
    useEffect(() => {
        getLoggedInStatus();
    }, []);
    async function getLoggedInStatus() {
        AsyncStorage.getItem("VtexIdclientAutCookie").then(response => {
            if (response)
                setLoggedIn(true);
        })
    }
    
      async function fetchOrdersData(){
      }
    const toggleLoggedInStatus = async () => {
        if (loggedIn) {
            AsyncStorage.removeItem("orderFormId").then(async response => {
                AsyncStorage.removeItem("VtexIdclientAutCookie").then(async response => {

                    // UPDATE USER PROFILE DETAILS TO NULL
                    removeUserDetails();
                    // GENERATE NEW ORDER FORM ID FOR USER
                    await createOrderFormId()
                        .then(async (response) => {
                            await AsyncStorage.setItem("orderFormId", response?.data?.orderFormId);
                            // UPDATE CART CONTEXT
                            initCart(response?.data);
                            initShippingData(response?.data?.shippingData);
                            initClientProfileData(response?.data?.clientProfileData);
                        })
                        .catch((error) => console.log(error));

                    setLoggedIn(false)
                });
            })
        } else {
            navigation.navigate("Login");
        }
    }
    return (
        
        <View style={{ flex: 1, backgroundColor: '#ffffff',alignItems:"center" }}>

            <View style={{alignItems:"flex-end",alignSelf:"flex-start",marginLeft:screenWidth*0.06,marginTop:10}}>
            <Text style = {{textTransform:"capitalize",alignSelf:"flex-start",fontFamily:Fonts.POPPINS_REGULAR,color:"#0B1932",fontWeight:"600",fontSize:20}}>{t('hi')} , {First}</Text>
                <Text style = {{alignSelf:"flex-start",fontFamily:Fonts.POPPINS_REGULAR,fontSize:12,color:"#3B3945",fontWeight:"500"}}>{Phone}</Text>
                <Text style = {{alignSelf:"flex-start",fontFamily:Fonts.POPPINS_REGULAR,fontSize:12,color:"#3B3945",fontWeight:"500"}}>{Email}</Text>
                </View>
                <ScrollView>
                <View style={{height:screenHeight * 0.37,width:screenWidth * 0.98}}>
                    <FlatList
                    numColumns={4}  
                    keyExtractor={(item) =>  item?.title}
                    style={styles.productsList}
                    contentContainerStyle={styles.productsListContainer}
                      data={DATA}
                      renderItem={({item}) => (
                          
                        <TouchableOpacity onPress={() => { 
                           
                          if(item.title === t(`orders`)){
                            navigation.navigate("Orders")
                           }
                           else if(item.title === t('language')){
                            navigation.navigate("PreferencesScreen")
                           }
                           else if(item.title === t('myItems')){
                            navigation.navigate("My Items")
                           }
                           else if(item.title === t('FAQ')){
                            navigation.navigate("FAQ")
                           }
                           else if(item.title === t(`orders`)){
                            navigation.navigate("Orders")
                           }
                           else if(item.title === t(`notification`)){
                            navigation.navigate("Notifications")
                           }
                           else if(item.title === t(`stores`)){
                            setShowTabNav("none")
                            navigation.navigate("My stores",{custId:Profile?.id})
                           }
                           else if(item.title === t(`profile`)){
                            navigation.navigate("My Profile",{
                                fName : First,email:Email,phone:Phone,Lname:Last,custId:RefId
                            })
                           }
                        }}>
                            <View style={styles.itemContainer}>
                            
                           
                        <Image source={item.image}
                        style={{alignSelf: "center",
                        height: screenHeight * 0.077,
                        resizeMode:'contain',
                        width: screenHeight * 0.075,
                        marginBottom:7,
                        left: 9,
                        top: 11}}/>
                          <View style={{ flexDirection: 'row', marginStart: Sizes.Size_2,alignItems:"center" }}>
                                <Text numberOfLines={4} style={styles.brandName}>{item.title}</Text>
                           
                          </View>
                          </View>
                          </TouchableOpacity>
                           
                    )}
                    />
                    </View>
                    { orders.length !== 0 && <View style={{height:screenHeight*0.04,width:screenWidth * 0.9,flexDirection:"row",marginBottom:5,marginLeft:screenWidth * 0.05,flex:1}}>
                     <Text style={{fontFamily:Fonts.POPPINS_BOLD,color:"#0B1932",fontSize:22,flex:0.8}}>{t('latestOrders')}</Text>
                        <TouchableOpacity style={{justifyContent:"center",alignSelf:"center",backgroundColor:"rgba(249, 119, 77, 0.12);",width:screenWidth*0.17,height:22,borderRadius:8,marginLeft:screenWidth*0.3,flex:0.45}} onPress={()=>navigation.navigate("Orders")}>
                             <Text style={{color:"#F9774D",fontSize:12,fontWeight:"600",fontFamily:Fonts.POPPINS_REGULAR,alignSelf:"center"}}>{t('view')}</Text>
                        </TouchableOpacity>
                     </View> }
                     <View style={{height:screenHeight * 0.22,marginTop:10}}>
                        <FlatList
                        horizontal
                         data={orders.slice(-5)}
                            initialNumToRender={6}
                            renderItem={({item}) => 
                                (
                                state = item?.attributes?.itemStates[0],
                                
                                <View style={{marginRight:10,marginLeft:10,borderRadius:10,borderWidth:2,borderColor:"#D4D9DE",padding:16,width:screenWidth*0.86}}>
                                <View style={{flexDirection:"row",width:screenWidth * 0.89}}>
                                <Text style={{ flex: 0.5, fontFamily: Fonts.POPPINS_SEMIBOLD, textAlign: 'left', color: '#000000', fontSize: Sizes.Size_16, lineHeight: 19 }}>Order # {item.id}</Text>
                                <Text style={{ flex: 0.4, fontFamily: Fonts.POPPINS_SEMIBOLD, textAlign: 'right', color: '#000000',fontSize: Sizes.Size_14, lineHeight: Sizes.Size_16}}>{(item?.attributes?.currencyIsoCode)} {formatPrice(item?.attributes?.totals?.grandTotal)}</Text>
                               </View>
                               <View style={{flexDirection: 'row'}}>
                               <Text style={{ flex: 0.5, fontFamily: Fonts.POPPINS_REGULAR, textAlign: 'left', color: '#000000', opacity: 0.6, fontSize: 12, lineHeight: 15 }}>{t(`placedOn`)} {moment(item?.attributes?.createdAt).format('LL')}</Text>
                               <Text style={{ flex: 0.5, fontFamily: Fonts.POPPINS_REGULAR, textAlign: 'right', color: '#000000', opacity: 0.6, fontSize: 11, lineHeight: 13, letterSpacing: -0.24 }}>{t(`inclVat`)}</Text>
                             </View>
                             <View style = {{  paddingVertical: 6, paddingHorizontal: 8, 
                                backgroundColor: state == "placed"? "#BAEBB1" : state == "cancellation requested"? "#FFC8CE" : "#FFEAB8", 
                                borderRadius: 38, alignSelf: 'flex-start', marginVertical: 8, flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <Text style={{ color: "#0B1932", fontFamily: Fonts.POPPINS_REGULAR, fontSize: Sizes.Size_12, marginLeft: 0, lineHeight: Sizes.Size_16, fontWeight: '500', letterSpacing: 0}}>{state}</Text>
                            </View>
                            <TouchableOpacity style={{borderRadius:8,borderWidth:1,borderColor:"#B0BDD4",height:screenHeight*0.045,width:screenWidth * 0.4,marginTop:15,justifyContent:"center"}} onPress={()=>{navigation.navigate('Order Detail', {
                            orderId: item.id
                                })}}>
                              <Text style={{alignSelf:"center",fontSize:12,fontFamily:Fonts.POPPINS_REGULAR,fontWeight:"600",color:"#028E46"}}>{t('viewDetails')}</Text>
 
                            </TouchableOpacity>
                             </View>
                            )
                            }
                            />  
                    </View> 
                    {/* <View style={{height:30,width:343,flexDirection:"row",marginBottom:5,marginLeft:10,marginTop:10}}>
                        <Text style={{fontFamily:Fonts.POPPINS_BOLD,flex:0.9,color:"#0B1932",fontSize:22}}>{t('buy')}</Text>
                        <TouchableOpacity style={{justifyContent:"center",alignSelf:"center",backgroundColor:"rgba(249, 119, 77, 0.12);",width:74,height:22,borderRadius:8,marginLeft:120}} onPress={()=>{}}>
                            <Text style={{color:"#F9774D",fontSize:12,fontWeight:"600",fontFamily:Fonts.POPPINS_REGULAR,alignSelf:"center"}}>{t('view')}</Text>
                        </TouchableOpacity>
                     </View>  */}
                     </ScrollView> 
            <TouchableOpacity style={styles.signout}  onPress={() => {
                AsyncStorage.setItem("TOKEN","");
                AsyncStorage.setItem("REFTOKEN","");
               RNRestart.Restart();
        }}>
            <Image style={{width:24,height:24,marginRight:5}} source={require("../assets/SignOut.png")}></Image>
            <Text style={{fontWeight:"500",fontFamily:Fonts.POPPINS_REGULAR,fontSize:16,color:"#FF1F00"}}>{t(`signOut`)}</Text>
            </TouchableOpacity>
            
        </View>
    )
}
export function MoreDetails({ navigation }) {
    const {selectedLanguage}  = useContext(RootContext);
    const { t } = useTranslation('More');
    return (
        <Stack.Navigator
            screenOptions={{
                backgroundColor: '#ffffff',
                header: ({ navigation, route, options, back }) => {

                    const title = getHeaderTitle(options, route.name); // Remove this code if not using.
                    return (
                        <View style={[styles.headerWrapper]}>
                            <TouchableOpacity onPress={navigation.goBack}>
                                <View style={{ width: 30, height: 30 }}>
                                    {selectedLanguage === "en-US"?<Image style={{marginTop:7,marginLeft:20}} source={require("../assets/BackPress.png")}></Image>:<Image style={{marginTop:7,marginLeft:20}} source={require("../assets/BackPressAr.png")}></Image>}
                                </View>
                            </TouchableOpacity>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingRight: 10, justifyContent: "center" }}>
                                <Text style={{ fontSize: 14, fontWeight: '600',fontFamily:Fonts.POPPINS_REGULAR, color:colors.black }}>{title}</Text>
                            </View>
                        </View>
                    );
                }
            }}>
            <Stack.Screen name="MoreScreen" component={More} options={{ headerShown: false }}  />
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: t(`login`) }} />
            <Stack.Screen name="PreferencesScreen" component={Preferences} options={{ title: t(`language`) }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name="My Profile" component={ProfileInfo} options={{ headerShown: false }}/>

        </Stack.Navigator>
    );
}
const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#ffffff',
        paddingTop: 10,
        paddingBottom: 20,
  
    },
    signout:
    {
        backgroundColor:"#FFFFFF",
        position:"absolute",
        bottom:0,
        height:screenHeight * 0.06
        ,width:screenWidth * 0.9,
        alignSelf:'center',
        borderRadius:8,
        borderColor:"#909FBA",
        borderWidth:1,
        marginBottom:30,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
    },
    productsList: {
        backgroundColor: '#FFFFFF',
        
       
    },
    statusBox: {
        width: 85,
        height: 28,
        backgroundColor: '#BAEBB1',
        borderRadius: Sizes.Size_8,
        marginLeft: 0,
        marginTop: Sizes.Size_4,
        justifyContent: 'center'
    },
    statusText: {
        fontFamily: Fonts.POPPINS_REGULAR,
        fontWeight: '500',
        fontSize: Sizes.Size_14,
        lineHeight: 19,
        color: '#0B1932',
        textAlign: 'center'
    },
    productsListContainer: {
        backgroundColor: '#FFFFFF',
        
       
    },
    title: {
        fontSize: 13,
        color: "#000",
        textTransform: "uppercase"
    },
    itemContainer: {
        width: "100%",
        paddingHorizontal: Sizes.Size_6, 
        paddingBottom: Sizes.Size_6,
      },
    modalHeader: {
        marginTop:10,
        height: 50, 
        paddingRight: 10,
        width:'auto', 
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20,
        flexDirection:"row",
        alignSelf:"flex-start",
        

    },
   
      brandName: {
        fontStyle: "normal",
        fontSize: 12,
        lineHeight: Sizes.Size_18,
        fontWeight: "400",
        color: "#000000",
        marginLeft: 2,
        marginRight: 7,
        marginTop: 5,
        left:8,
        fontFamily: Fonts.POPPINS_REGULAR,
        width: screenWidth * 0.16,
        textAlign: 'center',
        alignSelf:"center"
        
    },
      productsListContainer: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 8,
        marginHorizontal: 8,
       
       
      },
      
    brandTopImageContainer: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#D3DCEC',
        paddingRight: 5,
        marginLeft: 2,
        
  
      },
});