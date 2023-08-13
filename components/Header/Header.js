import React, { useState, useContext } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { SearchMagnifier } from './SearchMagnifier';
import { Back } from './Back.icon';
import { SearchContext } from '../../SearchContext';
import { Close } from './Close.icon';
import { Fonts, Colors } from '../../utils/Constants';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../../CartContext';
import { RootContext } from '../../RootContext';
import { Overlay } from 'react-native-elements';
import { BarcodeScanner } from './Barcode';

import SwipeUpDownModal from 'react-native-swipe-modal-up-down';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get("screen").height;

/**
 * Header brand
 */
const HeaderBrand = () => {
    let {selectedLanguage} = useContext(RootContext);
    return (
            <Image style={headerBrandStyles.container} source={selectedLanguage === "ar-SA" ? 
                                    require('../../assets/adaptive-icon.png') : 
                                    require('../../assets/adaptive-icon.png')  }>            
            </Image>
    )
}


const headerBrandStyles = StyleSheet.create({
    container: {
        width: screenWidth / 3.2,
        height: screenHeight/25,
        alignSelf: 'flex-start',
        resizeMode: 'contain',
        marginTop: 12,
    }
})
/**
 * Header back navigation
 * @param {*} param0 
 * @returns 
 */
const HeaderBack = ({ route, stack, currentRoute, navigation }) => {
    const { toggleStepper  } = useContext(CartContext);
    const { setSsuggestions  } = useContext(SearchContext);
    
    return (<View style={[headerBackStyles.wrapper]}>
        <TouchableOpacity onPress={() => {   
                // currentRoute === 'search' ?
                //  navigation.goBack() : navigation.navigate('Home',{ screen: 'evaluatr Home'})
                toggleStepper(true);
                navigation.goBack();
                setSsuggestions(undefined);

            }}>
            <View style={{ width: 30, height: 30 }}>
                <Back></Back>
            </View>
        </TouchableOpacity>
    </View>)
}


const headerBackStyles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row'
    },
    container: {
        width: 80,
        height: 25,
        alignSelf: 'center',
        resizeMode: 'contain',
    }
})

/**
 * Header notif navigation
 * @param {*} param0 
 * @returns 
 */
 const HeaderNotif = ({ route, stack, currentRoute, navigation }) => {
    const { toggleStepper  } = useContext(CartContext);
    const { setSsuggestions  } = useContext(SearchContext);
    
    return (<View style={[headerNotifStyles.wrapper]}>
        <TouchableOpacity onPress={() => {   
                // currentRoute === 'search' ?
                //  navigation.goBack() : navigation.navigate('Home',{ screen: 'evaluatr Home'})
                toggleStepper(true);
                navigation.goBack();
                setSsuggestions(undefined);

            }}>
            <View style={{ width: 30, height: 30 }}>
                <Back></Back>
            </View>
        </TouchableOpacity>
    </View>)
}


const headerNotifStyles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row'
    },
    container: {
        width: 80,
        height: 25,
        alignSelf: 'center',
        resizeMode: 'contain',
    }
})


/**
 * Header search filed
 * @param {*} param0 
 * @returns 
 */
const HeaderSearch = ({ navigation, route }) => {
    const { t, i18n } = useTranslation('Header');
    const { query, setQquery ,suggestion,setSsuggestions} = useContext(SearchContext);
    const [currentRoute, setCurrentRoute] = useState(route?.name);
    const [searchQuery, setSearchQuery] = useState(query);
    const [searchSuggestion, setSearchSuggestion] = useState(suggestion);
    function clearQuery(){
        setSearchQuery(undefined);
        setQquery(undefined);
        setSsuggestions(undefined);
    }
    return (<View>
        {
            (currentRoute === 'evaluatr Home' || currentRoute === 'ProductDetails') && (<TouchableOpacity onPress={() => {
                clearQuery();
                navigation.navigate('Search')}}>
                <View style={{ height: 40, backgroundColor: '#f3f3f3', borderRadius: 8 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                        <View style={{}}>
                            <SearchMagnifier></SearchMagnifier>
                        </View>
                        <View style={{ marginLeft: 5 }}>
                            <Text style={{ color: '#bababa' , fontFamily: Fonts.POPPINS }}> {t(`search`)}</Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>)
        }

        {
            (currentRoute === 'Search') && (<View style={{ height: 40,  borderRadius: 8 }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center',backgroundColor :"#F0F4FB",borderRadius :8 }}>

                    <TextInput autoFocus={true}
                        style={{
                            height: 40,
                            margin: 12,
                            flex: 1,
                            backgroundColor: '#f3f3f3',
                            borderWidth: 0,
                            padding: 0,
                            fontFamily : Fonts.POPPINS_REGULAR,
                            

                        }}
                        onChangeText={(e) => {
                            setSearchQuery(e);
                            setSearchSuggestion(e);
                            setSsuggestions(searchSuggestion)
                        }}
                        onSubmitEditing={(e)=>{
                             setQquery(searchQuery);
                        }}
                        backgroundColor ="#F0F4FB"
                        placeholderTextColor = {Colors.headerBlack}
                        keyboardType="default"
                        placeholder ={t(`search`)}
                        value={searchQuery}
                        returnKeyType="search"
                    />
                    <TouchableOpacity   onPress={() => { clearQuery() }}>
                        <View style={{ height: 30, width: 40 ,}}>
                            <Close></Close>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>)
        }
    </View>)
}


/**
 * Clickable search 
 * @param {*} param0 
 * @returns 
 */
const ClickableHeader = ({ navigation, route, setBarcodeSelected, barcodeSelected, toggleOverlay }) => {
    const { t, i18n } = useTranslation('Header');
    const [currentRoute, setCurrentRoute] = useState(route?.name);
   
    const onBarcodePressed = () => {
        toggleOverlay()
        setBarcodeSelected(!barcodeSelected)
    }
   
    return (<View style={currentRoute==='evaluatr Home'? {alignItems: 'center', width:screenWidth, marginTop: 5}: {alignItems: 'center', width:screenWidth/1.1}}>
        {
            (<TouchableOpacity onPress={() => {
                navigation.navigate('Home', { screen: 'Search' })
            }}>
                <View style={currentRoute==='evaluatr Home'? { height: 38, width:screenWidth/1.07, backgroundColor: '#F0F4FB', borderRadius: 12}: { height: 38, width:screenWidth/1.15, backgroundColor: '#F0F4FB', borderRadius: 12}}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 10}}>
                        <View style={{}}>
                            <SearchMagnifier></SearchMagnifier>
                        </View>
                        <View style={{ marginLeft: 5}}>
                            <Text style={{ color: '#bababa' ,fontSize:14,fontFamily:Fonts.POPPINS_REGULAR , color: Colors.headerBlack, textAlignVertical: 'center',lineHeight:18}}> {t(`search`)}</Text>
                        </View>
                        <View style ={{flex :0.95,alignItems:"flex-end"}}>
                            <TouchableOpacity
                                onPress={() => { onBarcodePressed() }}
                                style={{width: '11%', height: '75%', alignItems: 'center', justifyContent: 'center'}}>
                                    <Image source={require("../../assets/barCode.png")} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>)}
    </View>)
}

/**
 * Header
 * 
 * @param {*} param0 
 * @returns 
 */
const Header = ({ stack, navigation, route, title }) => {
    const { t, i18n } = useTranslation('Header');
    const [currentRoute, setCurrentRoute] = useState(route?.name)                   
    const homeCurrentRouteArr = ["evaluatr Home","Categories","Category","Brand","PriceDrop","Orders","Order Detail","MyItems","ProductDetails","Search"]
    const [barcodeSelected, setBarcodeSelected] = useState(false)
    const [visible, setVisible] = useState(false);
    const [showProductDetails, setShowProductDetails] = useState(false)
    const [productId, setProductId] = useState(undefined)
    const [showNoProductModal, setShowNoProductModal] = useState(false)

    const toggleOverlay = () => {
        setVisible(!visible);
        setBarcodeSelected(!barcodeSelected)
      };
    return (<View>
                    <View style={{flexDirection: 'row', backgroundColor: '#FFFFFF'}}>
                    {
                        ((stack === 'Cart') ||
                        (stack === 'Home' && currentRoute === 'evaluatr Home') ||
                       (stack === 'Home' && currentRoute === 'Categories') ||
                       (currentRoute === 'Supportpage' ) ||
                        (stack === 'Categories' && currentRoute === 'Categories')) &&
                        (<View style={{ width: screenWidth/1.05, height: screenHeight/18}}
                             >
                            <HeaderBrand stack={stack}></HeaderBrand>
                            <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
                            <Image source={require("../../assets/bellIcon.png")} style={{alignSelf: 'flex-end', marginTop: -28}}/>
                            </TouchableOpacity>
                        </View>)
                    }
                    </View>
            <View style={[styles.headerWrapper]}>  
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            {
                ((stack === 'Categories' && currentRoute === 'Categories') ||
                    (stack === 'Categories' && currentRoute === 'Category') ||
                    (stack === 'Categories' && currentRoute === 'Brand') ||
                    (stack === 'Home' && currentRoute === 'Category') ||
                  (stack === 'Home' && currentRoute === 'PriceDrop') ||
                  (stack === 'Home' && currentRoute === 'Brand') ||
                   (stack === 'Home' && currentRoute === 'Orders') ||
                 (stack === 'Home' && currentRoute === 'Order Detail') ||
                  (stack === 'Home' && currentRoute === 'MyItems') ||
                  (stack === 'Home' && currentRoute === 'Support') ||
                  (currentRoute === "Orders") || (currentRoute === "Order Detail") ||
                  (currentRoute === 'Supportpage' ||   currentRoute === 'MyItems' || currentRoute === 'PriceDrop') ||
                    (currentRoute === 'Search' || currentRoute === 'ProductDetails')) &&
                (<View style={{ width: 30, height: 15 }}>
                    <HeaderBack route={route} stack={stack} currentRoute={currentRoute}  navigation={navigation}></HeaderBack>
                </View>)
            }

            {
                  (stack === 'Home' && currentRoute === 'Notifications') &&
                    (<View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 0.08, flexDirection: 'row', alignSelf: 'center', paddingTop: 5 }}>
                            <HeaderNotif route={route} stack={stack} currentRoute={currentRoute}  navigation={navigation}></HeaderNotif>
                        </View>
                        <View style={{ flex: 0.92, marginLeft: -14 }}>
                            <Text style={{ fontSize: 18, fontWeight: '700',fontFamily:Fonts.POPPINS_REGULAR, color:'#000000', textAlign: 'center' }}>{t(title)}</Text>
                        </View>
                    </View>)
            }
{
                 
            }
            {
                (stack === 'Home' && currentRoute === 'Search') && (

                    <View style={{ flex: 1, height: 40, marginLeft: 5 }}>
                        <HeaderSearch navigation={navigation} route={route}></HeaderSearch>
                    </View>
                )
            }


            {
                (
                    (stack === 'Home' && currentRoute === 'evaluatr Home') ||
                    (stack === 'Home' && currentRoute === 'ProductDetails') ||
                    (stack === 'Home' && currentRoute === 'Category') ||
                    (stack === 'Home' && currentRoute === 'Brand') ||
                    (stack === 'Home' && currentRoute === 'PriceDrop') ||
                    (stack === 'Cart' && currentRoute === 'Categories') ||
                    (stack === 'Categories' && currentRoute === 'Category') ||
                    (stack === 'Categories' && currentRoute === 'Brand') ||
                    (stack === 'Categories' && currentRoute === 'Categories') ||
                    (stack === 'Home' && currentRoute === 'MyItems') ||
                    (stack === 'Categories' && currentRoute === 'ProductDetails')||
                    (currentRoute === 'Supportpage' ||   currentRoute === 'MyItems' || currentRoute === 'PriceDrop' ) 
                ) && (
                    <View style={currentRoute === 'evaluatr Home'? {height: 40}: {height: 40}}>
                        <ClickableHeader navigation={navigation} route={route} setBarcodeSelected={setBarcodeSelected} barcodeSelected={barcodeSelected} toggleOverlay={toggleOverlay}></ClickableHeader>
                    </View>
                )
            }

            {
                (
                    (stack === 'Home' && currentRoute === 'Orders') ||
                     (stack === 'Home' && currentRoute === 'Order Detail') ||
                     (currentRoute === "Orders") || (currentRoute === "Order Detail")
                     
                ) && (
                    
                    <View style={{ flex: 1, flexDirection: 'row',justifyContent: "center" }}>
                        {currentRoute === "Orders"?<Text style={{ fontSize: 14, fontWeight: '600',fontFamily:Fonts.POPPINS_REGULAR, color:'#000000', textAlign: 'center' }}>{t('myOrders')}</Text>:
                        <Text style={{ fontSize: 14, fontWeight: '600',fontFamily:Fonts.POPPINS_REGULAR, color:'#000000', textAlign: 'center' }}>{t(title)}</Text>}
                    </View>
                )
            }
        </View>
    </View>
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
    {barcodeSelected? 
       <BarcodeScanner 
        isBarcodeSelected={barcodeSelected} 
        setIsBarcodeSelected={setBarcodeSelected} 
        setVisible={setVisible} 
        visible={visible} 
        setProductId={setProductId} 
        setShowProductDetails={setShowProductDetails}
        setShowNoProductModal={setShowNoProductModal}/> :<></>}
    </Overlay>
    {productId &&
        <ProductDetailsModal
            showProductDetails={showProductDetails}
            setShowProductDetails={setShowProductDetails}
            navigation={navigation}
            productID={productId}
    />}
    {showNoProductModal && 
    <SwipeUpDownModal
        modalVisible={showNoProductModal}
        onClose={() => {
            setShowNoProductModal(false)
        }}       
        HeaderContent={
            <View style ={{ flex : 1, backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: '70%'}}>
                <View style={{ alignItems: 'center', height: 40 }}>
                    <Image source={require("../../assets/gray-line.png")} style={{width: 39, height: 0, borderWidth: 2.5, borderColor: '#4F4F4F', marginTop: 8, borderRadius: 4, opacity: 0.5, marginBottom: 10}}></Image>
                    <Text style={{fontFamily: Fonts.POPPINS_REGULAR, fontSize: 11, fontWeight: '400', textAlign: 'center', color: '#000000', lineHeight: 14}}>{t(`scanAgain`)}</Text>
                </View> 
            </View>
        }
        ContentModal={
            <View style={{flex : 1, marginTop: '75%', backgroundColor: 'white', paddingHorizontal: 16, justifyContent: 'center'}}>
                <Text style={{color: '#333333', fontFamily: Fonts.POPPINS_BOLD, fontSize: 16, lineHeight: 20, textAlign: 'center', margin: 4}}>{t(`itemNotFound`)}</Text>
                <Text style={{color: '#3B3945', fontFamily: Fonts.POPPINS_REGULAR, fontSize: 14, lineHeight: 20, textAlign: 'center', margin: 4}}>{t(`otherItems`)}</Text>
            </View>
        }>
    </SwipeUpDownModal> }
    </View>)
}


const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#ffffff',
        paddingTop: 10,
        paddingBottom: 10
    }
})

export default Header;