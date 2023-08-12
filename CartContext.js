import React, { createContext, useState, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Vibration, Alert } from "react-native";
import { RootContext } from "./RootContext";

export const CartContext = createContext();

export function CartProvider(props) {
  const [items, setItems] = useState([]);
  const [address, setAddress] = useState("");
  const [shippingData, setShippingData] = useState({});
  const [clientProfileData, setClientProfileData] = useState({});
  const [headerHide, setHeaderHide] = useState(false);
  const [checkoutHide, setCheckoutHide] = useState(false);
  const [cartButtonChange, setCartButtonChange] = useState(false);
  const [product, setProduct] = useState({});
  const [selectedItem, setSelectedItem] = useState({});
  const [isStepperVisible, setStepperVisibility] = useState(true);
  const [cartItemsArray, setCartItemsArray] =useState([])
  const [cartObjsArray, setCartObjsArray] =useState([])
  const [cartProductsArray, setCartProductsArray] =useState([])
  const [cartImagesArray, setCartImagesArray] =useState([])
  const [cartPricesArray, setCartPricesArray] =useState([])
  const [cartAvailabilityArray, setCartAvailabilityArray] =useState([])
  const [cartTotalsArray, setCartTotalsArray] =useState([])
  const [itemsCount, setItemsCount] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [ratingModal, setRatingModal] = useState(false)
  const [cartId, setCartId] = useState("")
  const abstractSkuAndSkuQty = {}
  const skuId = {}
  const [skuQty, setSkuQty] =useState({})
  const [skuItemId, setSkuItemId] =useState({})
  const [renderHelper, setRenderHelper] = useState(false)
  const [showTabNav, setShowTabNav] = useState("flex")
  const VIBRATE_SECONDS = 1 * 500;
  const [appliedCoupon, setAppliedCoupon] = useState(undefined)
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(undefined)


  async function addItemToCart(quantity, sku, itemId, item={}, setShowLoader, availableQty) {

    setShowLoader(true);
    let initQty = skuQty[sku]? skuQty[sku] : 0
    if(quantity > 0){
      const response = await addNewItem(cartId,{
        "data": {
          "type": "items",
          "attributes": {
            "sku": `${sku}`,
            "quantity": (initQty + quantity) > availableQty ?  (availableQty - initQty) : quantity
          }
        }
      })
      .catch((err) => { Alert.alert("Add to cart failed", err?.response?.data?.errors[0]?.detail) })
      if(response?.status === 201){
        Vibration.vibrate(VIBRATE_SECONDS);
        return response
      }
      setShowLoader(false);
    }
    else{
      if(initQty + quantity <= 0){
        const response = await deleteItemFromCart(itemId)
        if(response?.status === 204){
          Vibration.vibrate(VIBRATE_SECONDS);
          return response
        }
        setShowLoader(false);
      }
      else{
        const response = await updateExistingItem(cartId,itemId,{
          "data": {
            "type": "items",
            "attributes": {
              "sku": `${sku}`,
              "quantity": initQty + (quantity)
            }
          }
        })
        if(response?.status === 200){
          Vibration.vibrate(VIBRATE_SECONDS);
          return response
        }
      }
      setShowLoader(false);
    }
  }

  async function tieredPricingAddToCart(quantity, sku, itemId, item={}, flag) {
      //setShowLoader(true);
      let cartItem = cartItemsArray.find(cartItem => cartItem?.attributes?.sku == sku)
      let initQty = parseInt(cartItem?.attributes?.quantity)
      if(flag === 'add'){
        if (initQty>0){
          await deleteItemFromCart(sku)
        }
        Vibration.vibrate(VIBRATE_SECONDS);
        await addNewItem(cartId,{
          "data": {
            "type": "items",
            "attributes": {
              "sku": `${sku}`,
              "quantity": quantity
            }
          }
        })
        //setShowLoader(false);
      }
      else{
        Vibration.vibrate(VIBRATE_SECONDS);
        await updateExistingItem(cartId,itemId,{
          "data": {
            "type": "items",
            "attributes": {
              "sku": `${sku}`,
              "quantity": quantity
            }
          }
        })
        //setShowLoader(false);
      }
    }

    const debounce = (func) => {
      let timer=500;
      let tempQty=[0];
      return function (...args) {
        const context = this;
        if (timer){
          tempQty[0] = tempQty[0] + args[0]
          clearTimeout(timer);

        } 
        timer = setTimeout(() => {
          timer = null;
          func.apply(context, tempQty);
          tempQty[0] = 0
        }, 500);
      };
    };

  function getItemsCount() {
    let count = cartObjsArray.reduce((sum, item) => sum + item?.quantity, 0)
    setItemsCount(count)
    return count;
  }

  function getTotalPrice() {
    return cartObjsArray.reduce((sum, item) => sum + item?.price, 0);
  }
  async function deleteItemFromCart(id) {
    const response = await deleteItem(cartId, id)
    if(response?.status === 204){
      setCartObjsArray(cartObjsArray =>
        cartObjsArray.filter(cartObj => {
          return cartObj.sku !== id;
        })
      );
     skuQty[id]=0;
     setSkuQty(skuQty)
     return response
    }
  }

  function changeCartButton(value) {
    return (
      setCartButtonChange(value)
    )
  }

  function initCart(res) {
    const cartIncludedData = res?.data?.included;
    let itemCount = total = 0
    let cartItemArray = []
    let cartTotalArray = []
    let cartProductArray = []
    let cartImageArray = []
    let cartPriceArray = []
    let cartAvailArray = []
    cartTotalArray.push(res?.data?.data?.attributes?.totals)
    setCartTotalsArray(cartTotalArray)

    if (cartIncludedData){
    {cartIncludedData.map((p) => {
      if(p.type == "items"){
        abstractSkuAndSkuQty[p?.attributes?.abstractSku] = parseInt(p?.attributes?.quantity)
        abstractSkuAndSkuQty[p?.attributes?.sku] = parseInt(p?.attributes?.quantity)
        skuId[p?.attributes?.sku] = (p?.id)
        itemCount = itemCount + parseInt(p?.attributes?.quantity)
        total = total + parseInt(p?.attributes?.calculations?.sumPriceToPayAggregation)/100
        cartItemArray.push(p)
      }
      else if(p.type == 'concrete-products'){
        cartProductArray.push(p)
      }
      else if(p.type == 'concrete-product-image-sets'){
        cartImageArray.push(p)
      }
      else if(p.type == 'concrete-product-prices'){
        cartPriceArray.push(p)
      }
      else if(p.type == 'concrete-product-availabilities'){
        cartAvailArray.push(p)
      }
    })}}
    setSkuQty(abstractSkuAndSkuQty)
    setSkuItemId(skuId)
    setItemsCount(itemCount)
    setTotalPrice(total)
    setCartItemsArray(cartItemArray)
    setCartProductsArray(cartProductArray)
    setCartImagesArray(cartImageArray)
    setCartPricesArray(cartPriceArray)
    setCartAvailabilityArray(cartAvailArray)

    let cartObjArray = []
    let itemNum = cartItemsArray?.length
    
    for(index=0;index<itemNum;index++){
      cartObjArray.push(     
        {
          sku: cartItemsArray[index]?.attributes?.sku,
          itemId: cartItemsArray[index]?.id,
          abstractSku: cartItemsArray[index]?.attributes?.abstractSku,
          unitPrice: cartItemsArray[index]?.attributes?.calculations?.unitPrice,
          price: cartItemsArray[index]?.attributes?.calculations?.sumPrice,
          quantity: cartItemsArray[index]?.attributes?.quantity,
          name: cartProductsArray[index]?.attributes?.name,
          id: cartProductsArray[index]?.id,
          brand: cartProductsArray[index]?.attributes?.attributes?.brand,
          image: cartImagesArray[index]?.attributes?.imageSets[0]?.images[0]?.externalUrlSmall,
          volumePrices: cartPricesArray[index]?.attributes?.prices[0]?.volumePrices,
          availability: parseInt(cartAvailabilityArray[index]?.attributes?.quantity),
          packSize: cartProductsArray[index]?.attributes?.attributes?.pack_size
        }
      )

    }
    setCartObjsArray(cartObjArray)
    setRenderHelper(true)
  }

  const createNewCart = async () =>{
    if(cartId==="" || cartId === undefined){
        const response = await createCart()
        .then((response) => {setCartId(response?.data?.data[0]?.id)})
        .catch((err) => {console.log('Errors : ',err?.response?.data)});
        fetchCartId()
    }
  }

  const fetchCartId = async () =>{
  }

  const fetchCartsData = async () =>{

  }

  function initShippingData(data) {
    setShippingData(data);
  }

  function initClientProfileData(data) {
    setClientProfileData(data);
  }


  function toggleStepper(visibility) {
    setStepperVisibility(visibility)
  }

  async function addNewItem( cartId, data) {
    const response = await addToCart(cartId, data)
    if(response?.status === 201){
      return response
    }
  }

  async function updateExistingItem(cartId, sku, data) {
    const response = await updateCart(cartId, sku, data)
    if(response?.status === 200){
      return response
    }
  }

  async function addOrderItem( cartId, data) {
    await addReorderCart(cartId, data)
    .then(() => { Vibration.vibrate(VIBRATE_SECONDS); })
    .catch((err) => {console.log('Errors addOrderItem: ',err?.response?.data)});
  }

  async function updateOrderItem(cartId, sku, data) {
    await updateReorderCart(cartId, sku, data)
    .then((response) => {initCart(response)})
    .catch((err) => {console.log('Errors : ',err?.response?.data)});
  }
  
  async function addItemsToShoppingList(cartObjsArray) {
    let listId = await AsyncStorage.getItem("SHOPPINGLIST")
    cartObjsArray.map((item) => {
      addItemToShoppingList(listId, item?.sku).then(
        response=> {
          console.log("Added item to a list", response.status)
        }
      )
      .catch((err)=>console.log("Error:",err))
    })
  }

  const applyCoupon = async (couponCode, setShowLoader) => {
    setShowLoader(true)
    let reqBody = {
      "data": {
          "type": "vouchers",
          "attributes": {
              "code": couponCode
          }
      }
    }
    await addCouponCode(cartId, reqBody).then((response) => {
      setShowLoader(true)
        if (response.status === 201) {
          setAppliedCoupon(couponCode)   
          setCartTotalsArray([response?.data?.data?.attributes?.totals])
          setShowLoader(false)
        }
    }).catch((err) => {
        console.log('Error coupon code: ',err?.response?.data)
        Alert.alert("Promo Code cannot be added","Please try a different code")
        setShowLoader(false)});
}

const deleteCoupon = async (setShowLoader) => {
  if (appliedCoupon) {
  setShowLoader(true)
  await deleteCouponCode(cartId, appliedCoupon).then((response) => {
    if (response.status === 204) {
      setAppliedCoupon(undefined)      
      setShowLoader(false) 
      setRenderHelper(!renderHelper)
    }
  }).catch((err) => {
      console.log('Error coupon code delete: ',err?.response?.data)
      setShowLoader(false)});
  }
}

  async function saveForLater(items) {
  
  }
  return (
    <CartContext.Provider
      value={{
        items,
        shippingData,
        headerHide,
        checkoutHide,
        selectedItem,
        product,
        cartButtonChange,
        clientProfileData,
        isStepperVisible,
        changeCartButton,
        setItems,
        addItemToCart,
        tieredPricingAddToCart,
        initCart,
        initShippingData,
        initClientProfileData,
        deleteItemFromCart,
        address,
        toggleStepper,
        itemsCount,
        totalPrice,
        skuQty,
        setSkuQty,
        cartItemsArray,
        cartProductsArray,
        cartImagesArray,
        addNewItem,
        cartTotalsArray,
        cartId,
        setCartId,
        cartObjsArray,
        setCartObjsArray,
        setSkuItemId,
        skuItemId,
        fetchCartId,
        fetchCartsData,
        getItemsCount,
        getTotalPrice,
        renderHelper,
        setRenderHelper,
        addOrderItem,
        updateOrderItem,
        addItemsToShoppingList,
        saveForLater,
        showTabNav,
        setShowTabNav,
        debounce,
        applyCoupon,
        deleteCoupon,
        appliedCoupon,
        setAppliedCoupon,
        ratingModal,
        setRatingModal,
        selectedDeliveryDate,
        setSelectedDeliveryDate,
        cartAvailabilityArray
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
