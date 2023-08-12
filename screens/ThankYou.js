import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity, View,Image,Text,TextInput,Linking, ScrollView } from 'react-native';
import { Colors } from '../utils/Constants';
import { SimpleImage } from "../components/CustomImage/index.js";
import CustomText from '../components/CustomText/index.js';
import { Fonts, Sizes } from '../utils/Constants.js';
import { Strings } from '../utils/Constants.js';
import { CartContext } from '../CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
// import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { Loader } from '../components/Loader';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { formatDate } from '../utils/dateUtils';
import { getHeight } from '../utils/metrics';
const ThankYou = ({ navigation, orderResponse, route }) => {
    const { t } = useTranslation('ThankYou');
    const [showLoader, setShowLoader] = useState(false);
    const { changeCartButton, setCartObjsArray, fetchCartId, cartId, cartObjsArray,ratingModal,setRatingModal } = useContext(CartContext);
    const [productItems, setProductItems] = useState(orderResponse)
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const [comment, setComment] = useState('');
    const [defaultRating, setDefaultRating] = useState(0);
    const estimatedDeliveryDate = route?.params?.estimatedDeliveryDate
    const orderReference = route?.params?.orderReference

    const CustomRatingBar = () => {
      return (
        <View style={styles.customRatingBarStyle}>
          {maxRating.map((item, key) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={item}
                onPress={() => setDefaultRating(item)}>
                <Image
                  style={styles.starImageStyle}
                  source={
                    item <= defaultRating
                      ? require("../assets/ColouredStar.png")
                      : require("../assets/SilverStar.png")
                  }
                />
              </TouchableOpacity>
            );
          })}
        </View>
      );
    };
    useEffect(() => {
        if(defaultRating >= 3){
            const APP_STORE_LINK = 'https://apps.apple.com/app/evaluatr/id1644067606';
            const PLAY_STORE_LINK = 'https://play.google.com/store/apps/details?id=com.evaluatr';
            if(Platform.OS =='ios'){
                Linking.openURL(APP_STORE_LINK).catch(err => console.error('An error occurred', err));
            }
            else{
                Linking.openURL(PLAY_STORE_LINK).catch(err => console.error('An error occurred', err));
            }
            
        }

    }, [defaultRating])

    useEffect(() => {
        setProductItems(orderResponse)

    }, [])
    const currentDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        return today
    }

    const currentTime = () => {
        var currentdate = new Date();
        var time = currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        return time;
    }

    const continuePressed = () => {
        setShowLoader(true)
        AsyncStorage.removeItem('promoCodeUsed');
        changeCartButton(false);
        setCartObjsArray([])
        fetchCartId()
        setShowLoader(false)

        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    }

    const PaymentDetails = () => {
        return (
            <>
                <View style={{ flexDirection: 'row', marginTop: Sizes.Size_20 }}>
                    <CustomText size={Sizes.Size_12}
                        style={styles.paymentTextDetails}
                        topMargin={Sizes.Size_10}>{t(`paymentType`)}</CustomText>
                    <CustomText size={Sizes.Size_12}
                        style={styles.paymentTypeStyle}
                        topMargin={Sizes.Size_10}>{t(`cod`)}</CustomText>
                </View>
                {/* <View style={{ flexDirection: 'row' }}>
                    <CustomText size={Sizes.Size_12}
                        style={styles.paymentTextDetails}
                        topMargin={Sizes.Size_10}>{Strings.PAYMENT_ID}</CustomText>
                    <CustomText size={Sizes.Size_12}
                        style={styles.paymentIdStyle}
                        topMargin={Sizes.Size_10}>{`${876545678765}`}</CustomText>
                </View> */}
                <View style={{ flexDirection: 'row' }}>
                    <CustomText size={Sizes.Size_12}
                        style={styles.paymentTextDetails}
                        topMargin={Sizes.Size_10}>{Strings.TRANSACTION_ID}</CustomText>
                    <CustomText size={Sizes.Size_12}
                        style={styles.transactionTypeStyle}
                        topMargin={Sizes.Size_10}>{`${orderResponse?.id}`}</CustomText>
                </View>
                
            </>

        )
    }

    const ListHeader = () => {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.4, paddingBottom: Sizes.Size_20 }}>
                    <View style={styles.container}>
                        <SimpleImage style={styles.bigImageStyle} sourceData={require('../assets/Success.png')} />
                    </View>
                    <CustomText size={Sizes.Size_24}
                        style={styles.thankyouStyle}
                        topMargin={Sizes.Size_20}>{t(`THANK_YOU_MESSAGE`)}</CustomText>
                    <CustomText size={Sizes.Size_14}
                        style={styles.grayTextStyle}
                        topMargin={getHeight(12)}>{t(`refCode`)} {orderReference}</CustomText>
                </View>
                
                <View style={{ flex: 0.3, marginHorizontal: Sizes.Size_14, paddingHorizontal: 20, paddingVertical: 10, borderColor: "#D3DCEC", borderWidth: 2, borderRadius: 8, marginVertical: 5 }}>
                    <CustomText size={Sizes.Size_14}
                        style={styles.orderStyle}
                        topMargin={Sizes.Size_0}>{`${t(`shipment`)} 1`}</CustomText>
                    <CustomText size={Sizes.Size_12}
                        style={styles.estimateTextStyle}
                        topMargin={getHeight(5)}>{`${t(`estDelivery`)}`}</CustomText>
                    <Text style={styles.estimateTextStyle}>{formatDate(estimatedDeliveryDate)}</Text>
                </View>
                {/* <View style={{ flex: 0.3, marginHorizontal: Sizes.Size_14, paddingHorizontal: 20, paddingVertical: 10, borderColor: "#D3DCEC", borderWidth: 1, borderRadius: 8,  marginVertical: 5 }}>
                    <CustomText size={Sizes.Size_16}
                        style={styles.orderStyle}
                        topMargin={Sizes.Size_0}>{`Shipment 2: AN327629`}</CustomText>
                    <CustomText size={Sizes.Size_14}
                        style={styles.estimateTextStyle}
                        topMargin={Sizes.Size_4}>{"Estimated Delivery 30 July 2022 \n9am - 11am "}</CustomText>
                </View> */}
            </View>
        )
    }

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
             <View style={{ alignSelf: 'center' }}>
                <SimpleImage style = {{ width: 75, height: 26}}sourceData={require("../assets/evaluatrlogoGreen.png")} /> 
            </View>
            <ScrollView style={{flex: 0.91, marginTop: 50}}>
                <ListHeader />
            </ScrollView>
            <View style={{flex: 0.11}}>
                <TouchableOpacity style={[styles.showMoreContainerStyle, {backgroundColor: showLoader? 'white' :  "#028E46"}]} onPress={continuePressed}>
                {showLoader ? <View style={styles.checkoutLoader}><Loader /></View> :
                    <Button >
                        <CustomText style={styles.showMoreTextStyle} size={Sizes.Size_14} topMargin={getHeight(12)}>{t(`continueShopping`)}</CustomText>
                    </Button>
                }
                </TouchableOpacity>
            </View>
            <SwipeUpDownModal
        modalVisible={ratingModal}
        onClose={() => {
        setRatingModal(false)
        }}       
        HeaderContent={
        <View style ={{ flex : 1, backgroundColor: 'white', borderTopLeftRadius: 12, borderTopRightRadius: 12, marginTop: 270}}>
            <View style={{ alignItems: 'center', height: 40 }}>
            <Image source={require("../assets/gray-line.png")} style={{width: 39, height: 0, borderWidth: 2.5, borderColor: '#4F4F4F', marginTop: 8, borderRadius: 4, opacity: 0.5}}></Image>
            </View> 
            <Text style={{marginLeft:20,fontFamily:Fonts.POPPINS_BOLD,fontSize:24,lineHeight:30,color:"#333333",marginTop:5}}>{t('shareFeedback')}</Text>
        </View>
        }
        ContentModal={
            <View style ={{flex : 1, marginTop: 305, backgroundColor: 'white', paddingHorizontal: 16 }}>
                 <CustomRatingBar />
                 <View>
                 <TextInput
                        style={{borderColor:"#909FBA" , borderRadius:8,borderWidth:1,marginTop:30,height:119,width:343,textAlignVertical:"top",paddingLeft:20,paddingRight:20,color:"#3B3945",marginBottom:40}}
                        multiline={true}
                        placeholderTextColor={"#3B3945"}
                        placeholder={t('yourComments')}
                        numberOfLines={4}
                        onChangeText={(text) => setComment({text})}
                        value={comment}
                        returnKeyType="done"
                        blurOnSubmit={true}
                        />
                       </View>
                        
                    <Button style = {styles.sendFeedbackstyle} onPress={()=>{setRatingModal(false)}}>
                        <CustomText style={styles.showMoreTextStyle} size={Sizes.Size_14} topMargin={Sizes.Size_16}>{t(`sendFeedback`)}</CustomText>
                    </Button>
               
            </View>
            
        }>
    </SwipeUpDownModal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    bigImageStyle: {
        width: Sizes.Size_80,
        height: getHeight(80),
        marginTop: getHeight(18)
    },
    thankyouStyle: {
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: Fonts.POPPINS_BOLD,
        color: '#333333',
        fontWeight: "700",
        marginHorizontal: 25,
        lineHeight: Sizes.Size_30
    },
    grayTextStyle: {
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: Fonts.POPPINS_REGULAR,
        color: "#333333",
        paddingHorizontal: Sizes.Size_40,
        fontWeight: "400",
        lineHeight: Sizes.Size_18,
    },
    estimateTextStyle: {
        justifyContent: 'center',
        textAlign: 'left',
        fontFamily: Fonts.POPPINS_REGULAR,
        color: "#333333",
        fontWeight: "400",
        lineHeight: getHeight(18),
        fontSize: Sizes.Size_12
    },
    refCode: {
        fontSize: Sizes.Size_14,
        lineHeight: getHeight(18),
        fontFamily: Fonts.POPPINS_REGULAR,
        alignSelf: 'center'
    },
    orderStyle: {
        fontFamily: Fonts.POPPINS_SEMIBOLD,
        color: Colors.headerBlack,
        fontWeight: "600",
        textAlign: 'left',
        fontSize: Sizes.Size_14,
        lineHeight: getHeight(20)
    },
    placedStyle: {
        fontFamily: Fonts.OPENSANS_SEMIBOLD,
        color: Colors.headerBlack,
        fontWeight: "600",
    },
    paymentTextDetails: {
        fontFamily: Fonts.OPENSANS_BOLD,
        color: Colors.headerBlack,
        fontWeight: "600",
    },
    paymentTypeStyle: {
        paddingLeft: Sizes.Size_20,
        fontFamily: Fonts.OPENSANS_SEMIBOLD,
        color: Colors.headerBlack,
        fontWeight: "600",
    },
    paymentIdStyle: {
        paddingLeft: Sizes.Size_40,
        fontFamily: Fonts.OPENSANS_SEMIBOLD,
        color: Colors.headerBlack,
        fontWeight: "600",
    },
    transactionTypeStyle: {
        paddingLeft: Sizes.Size_20,
        fontFamily: Fonts.OPENSANS_SEMIBOLD,
        color: Colors.headerBlack,
        fontWeight: "600",
    },
    showMoreTextStyle: {
        color: "white",
        fontFamily: Fonts.POPPINS_SEMIBOLD,
        lineHeight: Sizes.Size_18
    },
    showMoreContainerStyle: {
        width: '92%',
        height: 45,
        alignSelf: "center",
        alignItems: "center",
        // marginTop: 150,
        borderRadius:8,
        justifyContent: 'center',
        marginBottom: 350
    },
    cancelStyle: {
        fontFamily: Fonts.OPENSANS_SEMIBOLD,
        color: Colors.red_another,
        paddingLeft: Sizes.Size_28,
        fontWeight: "600",
    },
    deliveryTextStyle: {
        fontFamily: Fonts.POPPINS,
        color: Colors.headerBlack,
        fontWeight: "600",
    },
    upToTextStyle: {
        fontFamily: Fonts.OPENSANS_SEMIBOLD,
        color: Colors.charcolGrey,
        paddingBottom: Sizes.Size_20,
        fontWeight: "600",
    },
    footerStyle: {
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: Sizes.Size_20
    },
    welcome: {
        padding: 20,
        flexDirection:"row"
        
    },
    sendFeedbackstyle: {
        width: '92%',
        height: 45,
        alignSelf: "center",
        // marginTop: 150,
        borderRadius:8,
        justifyContent: 'center',
        marginTop:30,
        backgroundColor:"#028E46"
    },
    checkoutLoader: {
        width: Sizes.Size_30,
        height: Sizes.Size_30,
        alignContent: 'center',
      },
     
        customRatingBarStyle: {
            justifyContent: "flex-start",
            flexDirection: 'row',
            marginTop: 60,
          },
          starImageStyle: {
            width: 40,
            height: 40,
            resizeMode: 'cover',
            marginLeft:20
          },

})

export default ThankYou


