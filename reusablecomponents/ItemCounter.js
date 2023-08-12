import React, { useContext, useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import { CartContext } from '../CartContext';
import { Loader } from '../components/Loader';
import { Colors, Sizes, Fonts } from '../utils/Constants';
import { useTranslation } from 'react-i18next';
import { RootContext } from '../RootContext';
import Metrics, {getHeight, getWidth} from '../utils/metrics';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get("screen").height;

const ItemCounter = ({ item, screen, itemProd, abstractSku, product, searchData, quantity, productBrand, productPrice, productName, productImage, price, volumePrices, view, productAvailability, packSize }) => {  
    const { t } = useTranslation('ItemCounter');
    const [showLoader, setShowLoader] = useState(false);
    const [sendSkuRequest, setSendSkuRequest] = useState(false);
    const { itemRequested } = useContext(RootContext)
    const [profile, setProfile] = useState([])
    const { addItemToCart, skuQty, setSkuQty, setCartObjsArray, skuItemId, getItemsCount, getTotalPrice, debounce, cartObjsArray } = useContext(CartContext);
    let chosenItem = item? item : product
    let selectedSKU = chosenItem?.sku? chosenItem?.sku : product?.id
    let  productCountInCart = skuQty[selectedSKU]? skuQty[selectedSKU] : 0
    let stockQty = (productAvailability?.quantity)? parseInt(productAvailability?.quantity) 
                  : cartObjsArray?.find(prod => prod?.sku === selectedSKU)?.availability


    const addToCart = (delta) => {
      let itemId = skuItemId[selectedSKU]? skuItemId[selectedSKU] : selectedSKU
      addItemToCart(delta, selectedSKU, itemId, chosenItem, setShowLoader, stockQty)
      .then((response) => {
        if(response?.status >= 200 && response?.status <= 210) {
          skuQty[selectedSKU] = productCountInCart + delta >=0 &&  productCountInCart + delta <= stockQty ? 
                                productCountInCart + delta 
                                : productCountInCart + delta <= 0 ? 0 : stockQty
          setSkuQty(skuQty)
          if(skuQty[selectedSKU] > 1 || (skuQty[selectedSKU] === 1 && delta < 0 )){
            setCartObjsArray( cartObjArray => 
              cartObjArray.map((cartObj) => {
                if(selectedSKU === cartObj?.sku){
                  let cost = cartObj?.unitPrice
                  if(cartObj?.volumePrices?.length > 1){
                    cost = volumePrices && volumePrices.find((item) => item?.upperLimit? (skuQty[selectedSKU] >= item?.quantity && skuQty[selectedSKU] <= item.upperLimit) : skuQty[selectedSKU] >= item?.quantity)?.grossAmount

                  }
                  return { ...cartObj, quantity: skuQty[selectedSKU], price: cost * skuQty[selectedSKU] }
                }
                return cartObj
              })
            )
          }
          else if(skuQty[selectedSKU] === 0){
            setCartObjsArray(cartObjsArray =>
              cartObjsArray.filter(cartObj => {
                return cartObj.sku !== selectedSKU;
              })
            )
          }
          else if(skuQty[selectedSKU] === 1 && delta > 0){
            let obj = {
              sku: selectedSKU,
              itemId: itemId,
              abstractSku: abstractSku,
              price: parseInt(productPrice),
              quantity: skuQty[selectedSKU],
              name: productName,
              id: selectedSKU,
              brand: productBrand,
              image: productImage,
              unitPrice: productPrice,
              volumePrices: volumePrices,
              availability: stockQty,
              packSize: packSize
            }
            setCartObjsArray(cartObjsArray => [...cartObjsArray, obj])
          }
          getItemsCount()
          getTotalPrice()
          setShowLoader(false)
        }
      })
      .catch((error) => { setShowLoader(false); console.error(error?.response?.data)});
  }
    const optimizedAddToCart = debounce(addToCart);

    return (
            <>
            { productCountInCart === 0 ?
              <TouchableOpacity style = {{ marginTop: getHeight(14) }} onPress={() => { 
                if(productAvailability?.availability){
                  setShowLoader(true); 
                  optimizedAddToCart(1)
                }
                else{
                  itemRequested?
                  Alert.alert("Item Requested", "Item has been requested") : pass
                }
              }}>
                <View style={view==='listView'? 
                productAvailability?.availability? styles.listAddToEmptyCart : [styles.listAddToEmptyCart, {backgroundColor: Colors.darkGrey}]
                : styles.addToEmptyCart}>
                {showLoader ? <View style={view === 'listView'? styles.listFirstLoader : styles.firstLoader}><Loader /></View> :
                productAvailability?.availability ? view === 'listView' ? <Text style={styles.addToCartText}>{t(`addToCart`)}</Text> : <Image source={require("../assets/addToCartPLP.png")} style={styles.addToCartStyle}></Image> 
                : view === 'listView'? <Text style={styles.addToCartText}>{t(`notify`)}</Text> : <></>
                // <Image source={require("../assets/addToCartPLP.png")} style={[styles.addToCartStyle, {opacity: 0.6}]}></Image>
              }
                </View>
              </TouchableOpacity> : 
              <View style={view==='listView'? styles.listViewContainer : styles.container}>
              <TouchableOpacity activeOpacity={0.6} style={styles.circleMinus} onPress={() => optimizedAddToCart(-1)}>
                {
                    productCountInCart > 1 ? 
                      <Image style={styles.plusMinusBox} source={require("../assets/minusPLP.png")} />
                    :
                    <View style={{width: 32}}>
                      <Image style={styles.trash}source={require("../assets/trashIconPLP.png")} />
                    </View>
                }
            </TouchableOpacity>        
              {showLoader ? <View style={view==='listView'? styles.listLoaderView : styles.loaderView}><Loader /></View>: 
              <View style={view==='listView'? styles.listRectangleShapeView: styles.rectangleShapeView}>
                  <Text style={styles.textStyle}>{productCountInCart}</Text>
              </View> }
            <TouchableOpacity activeOpacity={0.6} style={styles.circlePlus} onPress={() => optimizedAddToCart(1)}>
                <Image style={styles.plusMinusBox} source={require("../assets/plusPLP.png")} />
            </TouchableOpacity>
            </View>}
            </>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: getHeight(34),
        backgroundColor: Colors.greyLight,
        borderRadius: Sizes.Size_8,
        marginTop: getHeight(8)
    },
    listViewContainer: {
      flexDirection: 'row',
      width: Sizes.Size_102,
      height: getHeight(31),
      marginTop: getHeight(14),
      borderRadius: Sizes.Size_8,
    },
    rectangleShapeView: {
        width: Sizes.Size_32,
        height: getHeight(34),
        backgroundColor: Colors.greyLight,
        justifyContent: 'center',
        marginTop: getHeight(1)
    },
    listRectangleShapeView: {
      width: Sizes.Size_42,
      height: getHeight(30),
      borderRadius: Sizes.Size_6
  },
  firstLoader: {
    width: Sizes.Size_30,
    height: getHeight(31),
    alignSelf: 'flex-end'
  },
  listFirstLoader: {
    width: Sizes.Size_105,
    height: getHeight(32),
    backgroundColor: Colors.white,
    alignSelf: 'center',
    // borderColor: Colors.lightGrey,
    // borderWidth: Sizes.Size_1,
    // borderRadius: Sizes.Size_8
  },
    loaderView: {
        width: Sizes.Size_35,
        height: getHeight(31),
        borderRadius: Sizes.Size_8,
        paddingRight: Sizes.Size_4
    },
    listLoaderView: {
      width: Sizes.Size_42,
      height: getHeight(31),
      alignSelf: 'center'
  },
    textStyle: {
        fontFamily: Fonts.POPPINS_SEMIBOLD,
        fontSize: Sizes.Size_12,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: Sizes.Size_0,
        textAlign: "center",
        color: Colors.blackTwo,
        marginTop: 5,
        lineHeight: Sizes.Size_18,
    },
    circleMinus: {
        width: Sizes.Size_34,
        height: getHeight(17),
    },
    circlePlus: {
      width: Sizes.Size_34,
      height: getHeight(17)
    },
    addToEmptyCart: {
      width: Sizes.size_32, 
      height: getHeight(32), 
      backgroundColor: Colors.white
    },
    addToCartStyle: {
      alignSelf: 'flex-end',
      width: Sizes.Size_32,
      height: getHeight(30),
      backgroundColor: Colors.white
    },
    listAddToEmptyCart: {
      borderWidth: Sizes.Size_1, 
      borderColor: '#B0BDD4',
      backgroundColor: Colors.green,
      width: Sizes.Size_105, 
      height: getHeight(32), 
      borderRadius: Sizes.Size_8,
      justifyContent: 'center'
    },
    addToCartText: {
      fontFamily: Fonts.POPPINS_SEMIBOLD,
      fontSize: Sizes.Size_12,
      color: Colors.white,
      lineHeight: getHeight(16),
      textAlignVertical: 'center',
      textAlign: 'center'
    },
    plusMinusBox: {
      width: Sizes.Size_34,
      height: getHeight(34),
      alignSelf: 'center',
      borderWidth: 1,
      borderRadius: 8,
      borderColor: "#B0BDD4"
    },
    trash: {
      width: Sizes.Size_34,
      height: getHeight(34),
      alignSelf: 'center',
      borderWidth: 1,
      borderRadius: 8,
      borderColor: "#B0BDD4"
    }
})

export default ItemCounter
