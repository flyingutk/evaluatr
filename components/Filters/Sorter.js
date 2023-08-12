import React, { useEffect, useState ,useContext} from 'react';
import { SvgXml } from 'react-native-svg';
import { View, StyleSheet, Modal, TouchableOpacity ,Image,Text,ScrollView,Dimensions,TextInput, Platform} from 'react-native';
import { Button, Caption, Chip, Divider, List } from 'react-native-paper';
import { Fonts, Sizes } from '../../utils/Constants';
import { BrandFilter } from './BrandFilter';
import { useTranslation } from 'react-i18next';
import { LabelFilter } from './LabelFilter';
import { RootContext } from '../../RootContext.js';
import AsyncStorage from '@react-native-async-storage/async-storage';



const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

let closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Close</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"/></svg>`
const Close = () => {
    return <SvgXml color='#7d7575' xml={closeIcon} width={30} style={{flex:1, flexDirection: 'row'}}/>
}

export function Sorter ( {sorter, setSorter, allFacets, setFacet, showLabel,setHighVal,setLowVal,myItems,setMyItems,myItemsVisible,setMyItemsVisible,selectedBrands,setSelectedBrands}) {
    let brandCount = allFacets?.find((item)=>item.name === "brand")
    let labelCount = allFacets?.find((item)=>item.name === "label")
    const { t } = useTranslation('Sorter');
    const {selectedLanguage}  = useContext(RootContext); 
    const [sortVisible, setSortVisible] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);
    const [priceDropFilter, setPriceDrop] = useState(false);
    const [multibrands,setMultiBrands]=useState([])
    // const [selectedBrands,setSelectedBrands]=useState('')
    let [materialFacet, setMaterialFacet] = useState({key: "material", value: undefined});
    let [brandFacet, setBrandFacet] = useState({key: "brand", value: undefined});
    let [merchantFacet, setMerchantFacet] = useState({key: "merchant", value: undefined});
    let [labelFacet, setLabelFacet] = useState({key: "label", value: undefined});
    // let [priceFacet, setPriceFacet] = useState({key: "pricemin", value: undefined });
    let [minRange, setMinRange] = useState(undefined);
    let [maxRange, setMaxRange] = useState(undefined);
    let brands = []
    let labels =[]
    let merchants =[]
    let materials =[]
    const showLabelFilter = showLabel? showLabel: true
    allFacets?.map((facet) => {
        if(facet?.name === "brand"){
        brands.push(facet);
       }
       else if(facet?.name==="material"){
            materials.push(facet);
        }
        else if(facet?.name==="label"){
            labels.push(facet);
        }
        else if(facet?.name==="merchant_name"){
            merchants.push(facet);
        }});
    useEffect(() => {
        async function fetchMyItems() {

        let listItemsArray = []
      let shoppingListId = await AsyncStorage.getItem("SHOPPINGLIST")
        getShoppingListById(shoppingListId).then((response) => {
          response?.data.included.map((item) => {
            if (item.type === 'concrete-products'){
              listItemsArray.push(item?.id)
              }
            
            })
          
          setMyItems(listItemsArray)
          
        }).catch((err) => {
          console.log('Errors : ',err)
          });
    }

        fetchMyItems()
    }, [])
     useEffect(()=>{
   for(const brands of multibrands ){
       if(brands !== undefined){
       let selected = '&brand[]='.concat(brands);
       if(!(selectedBrands.includes(selected))){
       setSelectedBrands(selectedBrands.concat(selected))} 
    }
   };
},[multibrands,selectedBrands])
    useEffect(() => {
        setFacet({
            key: "brand[]", 
            value: brandFacet.value, 
            
        })
    }, [brandFacet])
    useEffect(() => {
        if(priceDropFilter === true){
        setFacet({
            key: "label", 
            value: "Price Drop", 
            
        })}
        else{
            setFacet({
                key: "label", 
                value: undefined, 
                
            })
        }
    }, [priceDropFilter])
    useEffect(() => {
        
        setFacet({
            key: "label", 
            value: labelFacet.value, 
            
        })
    }, [labelFacet])

    return (
        <>
        <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            <View style={{paddingHorizontal: 10, flexDirection: 'row', backgroundColor: "#fff", height: 80}}>
            <Button mode="contained" icon={require("../../assets/FiltersLogo.png")} style={styles.topFilterButton} color={'#FFFFFF'} onPress={() => {setFilterVisible(true)}}>
        <Text style={styles.topFilterName}>{t(`filter`)}</Text>
      </Button>
      <Button mode="contained" icon="sort" style={styles.topFilterButton} color={'#FFFFFF'} onPress={() => {setSortVisible(true)}}>
        <Text style={styles.topFilterName}>{t(`sort`)}</Text>
      </Button>
      <Button mode="outlined" icon={require("../../assets/PriceDropLogo.png")} style={{ width: screenWidth * 0.3,
        height: screenHeight * 0.052,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 20,
        marginBottom: 8,
        borderRadius: 74,
        borderWidth: 1,
        borderColor: '#B0BDD4',
        backgroundColor: priceDropFilter===true?"#E52D42":"#FFFFFF",
        justifyContent: 'center'}} color={priceDropFilter===true?'#FFFFFF':'#E52D42'} onPress={() => {setPriceDrop(!priceDropFilter)}}>
        <Text style={{
        fontStyle: "normal",
        fontSize: 12,
        lineHeight: 20,
        letterSpacing: 0.5,
        color: priceDropFilter===true?"#FFFFFF":"#E52D42",
        alignItems: 'center',
        textAlign: 'center',
        textTransform: "capitalize",
        fontFamily: Fonts.POPPINS_SEMIBOLD
    }}>{t(`priceDrop`)}</Text>
      </Button>
      <Button mode="contained" icon={require("../../assets/MyItemsLogo.png")} style={{ width: screenWidth * 0.3,
        height: screenHeight * 0.052,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 20,
        marginBottom: 8,
        borderRadius: 74,
        borderWidth: 1,
        borderColor: '#B0BDD4',
        backgroundColor: myItemsVisible===true?"#E52D42":"#FFFFFF",
        justifyContent: 'center'}} color={'#FFFFFF'} onPress={() => {setMyItemsVisible(!myItemsVisible)}}>
        <Text style={{
        fontStyle: "normal",
        fontSize: 12,
        lineHeight: 20,
        letterSpacing: 0.5,
        color: myItemsVisible===true?"#FFFFFF":"#0B1932",
        alignItems: 'center',
        textAlign: 'center',
        textTransform: "capitalize",
        fontFamily: Fonts.POPPINS_SEMIBOLD
    }}>{t(`myItems`)}</Text>
      </Button>
      {/* <Button mode="contained" style={styles.topFilterButton} color={'#FFFFFF'} onPress={() => navigation.navigate('MyItems')}>
        <Text style={styles.topFilterName}>{t(`myItems`)}</Text>
      </Button> */}
                {/* <Button color='#000' icon="tune-variant" style={{padding: 5, position: "absolute", left:0}} onPress={()=>{setFilterVisible(true)}}>{t('filter')}</Button>
                <Button color='#000' icon="sort" style={{padding: 5, position: "absolute", right:0}} onPress={()=>{setSortVisible(true)}}>{t('sort')}</Button> */}
            </View>
            </ScrollView>
            <View style={{paddingHorizontal: 10, flexDirection: 'row', flexWrap: 'wrap', backgroundColor:"#fff", justifyContent: 'flex-start'}}>
                { materialFacet?.value && 
                <Chip closeIcon="close" onClose={() => setMaterialFacet({key: "material", value: undefined})} mode='outlined' style={styles.chosenFacetChip} textStyle={{color:"#fff"}}>
                    <Caption style={{color:"#000"}}>{materialFacet.value}</Caption>
                </Chip>
                }
                
                {/* { brandFacet?.value && 
                <Chip closeIcon="close" onClose={() => setBrandFacet({key: "brand", value: undefined})} mode='outlined' style={styles.chosenFacetChip} textStyle={{color:"#fff"}}>
                    <Caption style={{color:"#000"}}>{brandFacet.value}</Caption>
                </Chip>
                } */}
                { merchantFacet?.value && 
                <Chip closeIcon="close" onClose={() => setMerchantFacet({key: "merchant_name", value: undefined})} mode='outlined' style={styles.chosenFacetChip} textStyle={{color:"#fff"}}>
                    <Caption style={{color:"#000"}}>{merchantFacet.value}</Caption>
                </Chip>
                }
                 { showLabelFilter && labelFacet?.value && 
                <Chip closeIcon="close" onClose={() => setLabelFacet({key: "label", value: undefined})} mode='outlined' style={styles.chosenFacetChip} textStyle={{color:"#fff"}}>
                    <Caption style={{color:"#000"}}>{labelFacet.value}</Caption>
                </Chip>
                }
                
            </View>
            <Modal
                    animationType="slide"
                    transparent={true}
                    visible={sortVisible}
                    onRequestClose={() => {
                        setFilterVisible(false);
                    }}>

                    <View style={styles.modalBodyWrapper}>
                        <View style={styles.modalBody}>
                            <View style={styles.modalHeader}>
                                <TouchableOpacity onPress={() => { setSortVisible(!sortVisible) }}>
                                    <View style={{ height: 30, width: 30,justifyContent:"center"}}>
                                    {selectedLanguage === "en-US"?<Image style={{marginTop:10,marginLeft:20}}source={require("../../assets/BackPress.png")}></Image>:<Image style={{marginTop:7,marginLeft:20}} source={require("../../assets/BackPressAr.png")}></Image>}
                                    </View>
                                </TouchableOpacity>
                            <View style={{justifyContent:"center",alignSelf:"center",marginLeft:screenWidth * 0.39}}>
                                <Text style ={{fontFamily:Fonts.POPPINS_BOLD,fontSize:14,color:"#0B1932"}}>{t('sortBy')}</Text>
                            </View>
                            </View>
                                
                                <List.Item
                                    title={t(`highestPriceFirst`)}
                                    right={"price_desc"==sorter ? props => <List.Icon {...props} icon= "check" color='#028E46'/> : ""}
                                    onPress={() => {setSorter("price_desc"); setSortVisible(!sortVisible);}}
                                    titleStyle={{fontSize: Sizes.Size_14}}
                                />
                                
                                
                                <Divider />
                                <List.Item
                                    title={t(`lowestPriceFirst`)}
                                    right={"price_asc"==sorter ? props =>  <List.Icon {...props} icon= "check" color='#028E46'/> : ""}
                                    onPress={() => {setSorter("price_asc"); setSortVisible(!sortVisible);}}
                                    titleStyle={{fontSize: Sizes.Size_14}}
                                />
                                <Divider />
                                <List.Item
            
                                    title={t(`ascending(A-Z)`)}
                                    right={"name_asc"===sorter ? props => <List.Icon {...props} icon= "check" color='#028E46'/> : ""}
                                    onPress={() => {setSorter("name_asc"); setSortVisible(!sortVisible);}}
                                    titleStyle={{fontSize: Sizes.Size_14}}
                                />
                                <Divider />
                                <List.Item
                                    title={t(`descending(Z-A)`)}
                                    right={"name_desc"===sorter ? props => <List.Icon {...props} icon= "check" color='#028E46'/> : null}
                                    onPress={() => {setSorter("name_desc"); setSortVisible(!sortVisible);}}
                                    titleStyle={{fontSize: Sizes.Size_14}}
                                />
                                <Divider />
                                <List.Item
                                    title={t(`rating`)}
                                    right={"rating"===sorter ? props => <List.Icon {...props} icon= "check" color='#028E46'/> : null}
                                    onPress={() => {setSorter("rating"); setSortVisible(!sortVisible);}}
                                    titleStyle={{fontSize: Sizes.Size_14}}
                                />
                                <Divider />
                                
                        </View>
                    </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={filterVisible}
                onRequestClose={() => {
                    setFilterVisible(false);
                }}>
                    
                <View style={styles.modalBodyWrapper}>
                <ScrollView>
                    <View style={styles.modalBody}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={() => { setBrandFacet({key: "brand", value: undefined});
                            setLabelFacet({key: "label", value: undefined});
                            setHighVal('');
                            setLowVal('');
                            setSelectedBrands('');
                            setMultiBrands([]);
                                setFilterVisible(false) }}>
                                <View style={{flex:1, height: 30, width: 30 }}>
                                {selectedLanguage === "en-US"?<Image style={{flex:0.3,marginTop:10,marginLeft:20}}source={require("../../assets/BackPress.png")}></Image>:<Image style={{marginTop:7,marginLeft:20}} source={require("../../assets/BackPressAr.png")}></Image>}
                                </View>
                                </TouchableOpacity>
                               <Text style={{flex:0.9,fontFamily:Fonts.POPPINS_BOLD,color:"#0B1932",fontSize:14,fontWeight:"600",textAlign:"center"}}>{t(`filter`)}</Text>
                               </View>    
                               
                        <List.AccordionGroup >
                            {brandCount?.values.length !== 0 && <BrandFilter brandfilters={brands} setBrandFacet={setBrandFacet} brandFacet={brandFacet} setMultiBrands={setMultiBrands} multibrands={multibrands}/>}
                             {/* <MaterialFilter materialfilters={materials} setMaterialFacet={setMaterialFacet} /> */}
                            {/* <MerchantFilter merchantfilters={merchants} setMerchantFacet={setMerchantFacet} />  */}
                           {brandCount?.values.length !== 0 && <Divider/>}
                            {showLabelFilter && labelCount?.values.length !== 0 && <LabelFilter labelfilters={labels} setLabelFacet={setLabelFacet} labelFacet={labelFacet} />}
                            {labelCount?.values.length !== 0 && <Divider/>}
                        </List.AccordionGroup>
                        <View style={{marginLeft:15,marginTop:10}}>
                            <Text style={{textTransform:"capitalize",color:"#0B1932",fontFamily:Fonts.POPPINS_REGULAR,fontWeight:"500",fontSize:14,lineHeight:21}}>{t('priceRange')}</Text>
                            <View style={{flexDirection:"row"}}>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#000000" 
                                placeholder={t(`lRange`)}
                                onChangeText={newrange => {
                            setMinRange(newrange)}
                        }
                                defaultValue={minRange}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder={t(`hRange`)}
                                placeholderTextColor="#000000" 
                                onChangeText={newrange => {
                            setMaxRange(newrange)}}
                                defaultValue={maxRange}
                            />
                            </View>
                            </View>
                        
                        <View style={{flex:0.1,marginBottom:10,height:20,padding:10,flexDirection:"row",marginLeft:20,position:"absolute",bottom:30}}>
                        <TouchableOpacity style={{backgroundColor:"#FFFFFF",justifyContent:"center",height:screenHeight*0.065,width:screenWidth*0.4,alignSelf:"center",borderRadius:8,marginRight:10,borderColor:"green",borderWidth:1}} onPress={() => { setBrandFacet({key: "brand", value: undefined});
                    setLabelFacet({key: "label", value: undefined});
                    setHighVal('');
                    setLowVal('');
                    setMinRange(undefined);
                    setMaxRange(undefined);
                    setSelectedBrands('');
                    setMultiBrands([])

                    }}>
                        <Text style={{alignSelf:"center",justifyContent:"center",color:"#028E46",fontFamily:Fonts.POPPINS_REGULAR,fontWeight:"600",fontSize:14,textTransform:"uppercase"}}>{t(`reset`)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:"#028E46",justifyContent:"center",height:screenHeight*0.065,width:screenWidth*0.45,alignSelf:"center",borderRadius:8}} onPress={() => { 
                            if(minRange !== undefined && maxRange!== undefined){
                                setHighVal(maxRange);
                                setLowVal(minRange);
                            }
                            setFilterVisible(false) }}>
                        <Text style={{alignSelf:"center",justifyContent:"center",color:"#FFFFFF",fontFamily:Fonts.POPPINS_REGULAR,fontWeight:"600",fontSize:14,textTransform:"uppercase"}}>{t(`apply`)}</Text>
                        </TouchableOpacity>
                        </View>
                        

                    </View>
                    </ScrollView>
                </View>
                
            </Modal>
            </>
    )

}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalBodyWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.7)',
        alignItems: 'flex-start',
        height: screenHeight * 1, 
        width: screenWidth * 1, 
    },
    modalBody: { 
        height: screenHeight * 0.97, 
        width: screenWidth * 1, 
        backgroundColor: "#FFFFFF", 
        position: 'relative', 
        button: 0, 
       
        
    },
    input:{
       height:48,
       width:164,
       borderColor:"#62769D",
       borderRadius:8,
       borderWidth:1,
       margin:10,
       textAlign:'center',
       fontSize:14,
       lineHeight:18,
       fontFamily:Fonts.POPPINS_REGULAR,
       color:"#3B3945"
    },
    modalHeader: {
        marginTop:Platform.OS === 'android'?10:40,
        height: screenHeight * 0.07, 
        paddingRight: 10,
        width:screenWidth * 1,    
        // marginTop: 100,
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20,
        flexDirection:"row",
        

    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    chosenFacetChip: {
        margin: 5
    },
    topFilterButton: {
        width: screenWidth * 0.3,
        height: screenHeight * 0.052,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 20,
        marginBottom: 8,
        borderRadius: 74,
        borderWidth: 1,
        borderColor: '#B0BDD4',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center'
      },
      topFilterName: {
          fontStyle: "normal",
          fontSize: 12,
          lineHeight: 20,
          letterSpacing: 0.5,
          color: "#0B1932",
          alignItems: 'center',
          textAlign: 'center',
          textTransform: "capitalize",
          fontFamily: Fonts.POPPINS_SEMIBOLD
      },
      priceDropFilter: {
        fontStyle: "normal",
        fontSize: 12,
        lineHeight: 20,
        letterSpacing: 0.5,
        color: "#E52D42",
        alignItems: 'center',
        textAlign: 'center',
        textTransform: "capitalize",
        fontFamily: Fonts.POPPINS_SEMIBOLD
    },

  });