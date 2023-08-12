import React, { useState,useContext,useEffect } from 'react';
import { Divider} from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { StyleSheet,Image ,Text, FlatList,TouchableOpacity, View,Modal,Dimensions} from 'react-native';
import { RootContext } from '../../RootContext.js';


import { Fonts,Sizes } from '../../utils/Constants.js';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export function BrandFilter({brandfilters, setBrandFacet,brandFacet,setMultiBrands,multibrands}){
    const {selectedLanguage}  = useContext(RootContext); 
    const [filterVisible, setFilterVisible] = useState(false);
    const [selected, setSelected] = useState(false);
    const [item,setItem]=useState('')
    const [itemcount,setItemCount]=useState(0)
    const [displayBrands, setDisplayBrands] = useState([])
    const { t } = useTranslation('BrandFilter');
    const [selectedBrands,setSelectedBrands]=useState([])
    useEffect(() => {
        fetchBrandData()
    },[brandfilters]);

    useEffect(()=>{
        SelectedState();
        SelectedItems();
    },[selected])
   function SelectedState(){
       {item === brandFacet.value ?
        setBrandFacet({key: "brand", value: undefined}):setBrandFacet({key: "brand", value: item.brandName})}

   }
   function SelectedItems(){
       if(item !== brandFacet.value){
           if(!(selectedBrands.includes(item.brandName)) && item.brandName !== undefined){
               setSelectedBrands(selectedBrands.concat(item.brandName))
           }
           else if(selectedBrands.includes(item.brandName)){
            let index = selectedBrands.indexOf(item.brandName)
            delete selectedBrands[index];    
           }
       }
   }

  useEffect(()=>{
    let items = multibrands.filter((item)=>item !== undefined);
    setItemCount(items.length)
 },[multibrands])

   async function fetchBrandData() {
    let displayBrandsArray = []
    getBrands().then((response) => {
        brandfilters?.[0]?.values.map((brand) => {
            response?.data?.data?.attributes?.section[0].brnds.map((brnd) => {
                if (brnd.brandName === brand.value) {
                    displayBrandsArray.push(brnd)
                }
            })   
        })
        setDisplayBrands(displayBrandsArray)
    }).catch((err) => {console.log(err.response)
    }) 
}

    if(!brandfilters || brandfilters?.length == 0)
        return null;
    return ( 
        <View >
            <TouchableOpacity onPress={()=>{setFilterVisible(true)}} >
            <View style={{marginLeft:15,flexDirection:"row",width:screenWidth*0.9}}>
            {brandFacet.value === undefined?
            <Text style={{flex:0.9,fontSize:13,textTransform:"capitalize",color:"#0B1932",fontFamily:Fonts.POPPINS_REGULAR,fontWeight:"500",fontSize:14}}>{t(`brands`)}</Text>:
            <Text style={{flex:0.9,fontSize:13,textTransform:"uppercase",color:"#0B1932",fontFamily:Fonts.POPPINS_REGULAR,fontWeight:"500",fontSize:14}}>{t(`brands`)}({itemcount})</Text>}
            
            <View style={{ flex:0.1,height: 30, width: 30 ,alignItems:"flex-end"}}>
            {selectedLanguage === "en-US"?<Image style={{marginLeft:5}}source={require("../../assets/rightarrow.png")}></Image>:<Image style={{marginTop:5,marginLeft:10}}source={require("../../assets/BackPress.png")}></Image>}
            </View>
           
            </View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={filterVisible}
                onRequestClose={() => {
                    setFilterVisible(false);
                }}>
                <View style={styles.modalBodyWrapper}>
                    <View style={styles.modalBody}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={() => { setBrandFacet({key: "brand", value: undefined});
                                setFilterVisible(false);
                                setSelectedBrands([]) }}>
                                <View style={{ height: 30, width: 30 }}>
                                {selectedLanguage === "en-US"?<Image style={{marginTop:10,marginLeft:15}}source={require("../../assets/BackPress.png")}></Image>:<Image style={{marginTop:7,marginLeft:20}} source={require("../../assets/BackPressAr.png")}></Image>}
                                </View>
                            </TouchableOpacity>
                            <Text style={{marginLeft:150,fontFamily:Fonts.POPPINS_BOLD,color:"#0B1932",fontSize:14,fontWeight:"600"}}>{t(`brands`)}</Text>
                        </View>    
                        <View >
        
                    <FlatList
                    numColumns={3}  
                    keyExtractor={(item) =>  item?.value}
                    style={styles.productsList}
                    contentContainerStyle={styles.productsListContainer}
                      data={displayBrands}
                      renderItem={({item}) => (
                        <TouchableOpacity onPress={() => { 
                            setItem(item)
                            setSelected(!selected);
                            // {brandFacet.value === item.value?setSelected(true):null}
                            }}>
                            <View style={styles.itemContainer}>
                            <View style={styles.brandTopImageContainer}>
                           {/* {selected && brandFacet.value === item.value && <Image style={{height:20 , width:20,marginBottom:-15,alignSelf:"flex-end"}}source={require("../../assets/greenTick.png")}></Image>} */}
                            {selectedBrands.includes(item.brandName)?<Image style={{height:20 , width:20,marginBottom:-15,alignSelf:"flex-end"}}source={require("../../assets/greenTick.png")}></Image>:null}
                        <Image source={item?.brndImage? {uri:item?.brndImage?.data?.attributes?.url} : require("../../assets/imageNotAvailableIcon.jpeg")}
                        style={{alignSelf: "center",
                        height: 90,
                        resizeMode:'contain',
                        width: 90,
                        borderRadius: 9,
                        left: 4,
                        top: 11}}/>
                          </View>
                          <View style={{ flexDirection: 'row', marginStart: Sizes.Size_4 }}>
                                <Text numberOfLines={2} style={styles.brandName}>{item.brandName}</Text>
                            </View>
                          </View>
                          {/* <View style={{flexDirection:"row",marginBottom:5}}>
                           <Text numberOfLines={2} style = {{fontFamily:Fonts.POPPINS_REGULAR,color:"#000000",marginLeft:10,marginRight:10,width:70}}>{item.value}</Text>
                           {brandFacet.value === item.value?<Image style={{height:20 , width:20}}source={require("../../assets/greenTick.png")}></Image>:null}
                           </View> */}
                          </TouchableOpacity>
                        
                    )}
                    />
        </View>
        <View style={{flex:0.1,marginBottom:10,height:20,padding:10,flexDirection:"row",marginLeft:20,position:"absolute",bottom:20}}>
                        <TouchableOpacity style={{backgroundColor:"#FFFFFF",justifyContent:"center",height:screenHeight*0.065,width:screenWidth*0.4,alignSelf:"center",borderRadius:8,marginRight:10,borderColor:"green",borderWidth:1}} onPress={() => { 
                    setBrandFacet({key: "brand", value: undefined});
                    setSelectedBrands([])
                    }}>
                        <Text style={{alignSelf:"center",justifyContent:"center",color:"#028E46",fontFamily:Fonts.POPPINS_REGULAR,fontWeight:"600",fontSize:14,textTransform:"uppercase"}}>{t(`reset`)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:"#028E46",justifyContent:"center",height:screenHeight*0.065,width:screenWidth*0.45,alignSelf:"center",borderRadius:8}} onPress={() => { setFilterVisible(false);setMultiBrands(selectedBrands) }}>
                        <Text style={{alignSelf:"center",justifyContent:"center",color:"#FFFFFF",fontFamily:Fonts.POPPINS_REGULAR,fontWeight:"600",fontSize:14,textTransform:"uppercase"}}>{t(`apply`)}</Text>
                        </TouchableOpacity>
                        </View>
        {/* <View style={{marginBottom:10,height:50}}>
        <TouchableOpacity style={{backgroundColor:"#028E46",height:48,width:343,alignSelf:"center",borderRadius:8,justifyContent:"center"}} onPress={() => { setFilterVisible(false) }}>
        <Text style={{alignSelf:"center",justifyContent:"center",color:"#FFFFFF",fontFamily:Fonts.POPPINS_REGULAR,fontWeight:"600",fontSize:14,textTransform:"uppercase"}}>{t(`apply`)}</Text>
        </TouchableOpacity>
        </View> */}
                        <Divider />        
                    </View>
                </View>
            </Modal>
        </View>       
    
    );
}
const styles = StyleSheet.create({
    priceContainer: {
        margin: 10,
        padding: 10,
        flex: 1,
        alignContent: 'stretch',
        justifyContent: 'center'
        
    },
    modalBodyWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.7)',
        alignItems: 'flex-start'
    },
    modalBody: { 
        height: '100%', 
        width: '100%', 
        backgroundColor: "#FFFFFF", 
        position: 'relative', 
        button: 0, 
        
    },
    brandTopImageContainer: {
        width: 104,
        height: 104,
        borderRadius: 8,
        backgroundColor: '#D3DCEC',
        paddingRight: 5,
        marginLeft: 10
  
      },
      itemContainer: {
        width: "100%",
        paddingHorizontal: Sizes.Size_6, 
        paddingBottom: Sizes.Size_22
      },
    modalHeader: {
        marginTop:Platform.OS === 'android'?10:40,
        height: 50, 
        paddingRight: 10,
        width:'auto', 
        alignItems: 'flex-start',
        // marginTop: 100,
        justifyContent: 'center',
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20,
        flexDirection:"row",
        alignSelf:"flex-start"

    },
    productsList: {
        backgroundColor: '#FFFFFF',


      },
      brandName: {
        fontStyle: "normal",
        fontSize: Sizes.Size_14,
        lineHeight: Sizes.Size_18,
        fontWeight: "400",
        color: "#000000",
        marginLeft: 2,
        marginRight: 5,
        marginTop: 5,
        fontFamily: Fonts.POPPINS_REGULAR,
        width: 105,
        textAlign: 'center'
        
    },
      productsListContainer: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 8,
        marginHorizontal: 8,
       
       
      },
});