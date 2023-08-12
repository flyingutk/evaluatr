import React, {useEffect, useState, useContext, useCallback} from 'react';
import { StyleSheet, View, Text,TouchableOpacity } from 'react-native';
import {  Divider, List } from 'react-native-paper';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Loader } from '../components/Loader.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTranslation } from 'react-i18next';
import { SearchContext } from '../SearchContext';
import { Sorter } from '../components/Filters/Sorter.js';
import { FlatList } from 'react-native-gesture-handler';
import { Fonts } from '../utils/Constants.js';

const Stack = createNativeStackNavigator();


export function Search ({navigation, route}) {
  const { t } = useTranslation('Search');
  const { query,suggestion ,setQuery} = useContext(SearchContext);
  const [locale, setLocale] = useState();
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [performSearch, setPerformSearch] = useState(false);
  let [allFacets, setAllFacets] = useState(undefined);
  const [myItems, setMyItems] = useState([]);
  let [chosenFacets, setChosenFacets] = useState([]);
  let [facet, setFacet] = useState();
  let [highVal, sethighVal] = useState('');
  let [lowVal, setLowVal] = useState(''); 
  const [selectedBrands,setSelectedBrands]=useState('')
  //From the old code.
const [loading, showLoading] = useState(false);
const [products, setProducts] = useState([]);
const [myItemsVisible, setMyItemsVisible] = useState(false);
  const [nextPage, setNextPage] = useState(1);
  const [showNext, setShowNext] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [hasMoreResults, setHasMore] = useState(false);
  let [sorter, setSorter] = useState("");
  const [recentSearch, setRecent] = useState([]);
  const [finalSearchableQuery, setFinalSearchableQuery] = useState("")
  const [productLabel, setProductLabels] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [resultCount, setResultCount] = useState(0);
  const brandscount = allFacets?.find((item)=>item?.name === "brand")
  const fetchLocalization = useCallback(async () => {
    const lang = await AsyncStorage.getItem("custPreferredLang");
    return lang;
    })
    function resetAndSearch(){
      
      setProducts([]);
      setNextPage(1);
      setPerformSearch(true);
    }
    useEffect(()=>{
      fetchLocalization()
      .then(locale => {
        setLocale(locale);
        setSearchQuery(query);
      })
      // make sure to catch any error
      .catch(console.error);
      RecentStore();
    }, [fetchLocalization])
    const RecentStore = async () => {
      if(recentSearch){
      if(recentSearch.length === 0 || !recentSearch){
     await AsyncStorage.getItem("SEARCHARRAY").then((res)=>{
      let results = JSON.parse(res)
      if(results !== null){
       setRecent(results)}
     })
   
    }}
    }
    /**
     * Called on search query is changed.
     */
     useEffect(()=>{
       if(recentSearch.length !== 0){
       AsyncStorage.setItem("SEARCHARRAY",JSON.stringify(recentSearch));}
     },[recentSearch])
    useEffect(() => {
      if(searchQuery && performSearch && searchQuery.trim() !== ""){
        let productLabelsArray = []
        let searchDataArray = []
        let concreteProductsArray = []
        let concreteProductPrices = []
        let concreteProductImages = []
        let concreteProductAvailability = []
        showLoading(true);
        searchProducts(searchQuery, sorter,24,nextPage,chosenFacets,lowVal,highVal,selectedBrands).then(response => {
          let searchResults = response?.data?.data;
          let searchResultsPro = response?.data?.included;
          searchResults?.map((item) => {         
            setHasMore(item?.attributes?.pagination?.maxPage > item?.attributes?.pagination?.currentPage ? true : false);
            setResultCount(item.attributes.pagination.numFound);
            setAllFacets(item.attributes.valueFacets)
        });
        searchResultsPro.map((item) => {  
          if(item?.type == "abstract-products"){
            searchDataArray.push(item)
          }
          else if (item?.type === 'product-labels'){
            productLabelsArray.push(item)
          }
          else if (item?.type === 'concrete-products'){
            concreteProductsArray.push(item)
          }
          else if (item?.type === 'concrete-product-prices'){
            concreteProductPrices.push(item)
          }
          else if (item?.type === 'concrete-product-availabilities'){
            concreteProductAvailability.push(item)
          }
          else if (item?.type === 'concrete-product-image-sets'){
            concreteProductImages.push(item)
          }
        })
        concreteProductsArray.map((prod) => {
          prodImage = concreteProductImages[concreteProductsArray?.indexOf(prod)]?.attributes?.imageSets[0]?.images
          prodPrice = concreteProductPrices[concreteProductsArray?.indexOf(prod)]?.attributes
          prod.images = prodImage
          prod.price = prodPrice?.price
          prod.prices = prodPrice?.prices
          prod.availability = concreteProductAvailability[concreteProductsArray?.indexOf(prod)]?.attributes
        })
        setProducts(products.concat(concreteProductsArray));
        setSearchData(searchData.concat(searchDataArray));
        setProductLabels(productLabel.concat(productLabelsArray));
        if(!(recentSearch.includes(searchQuery))){
          setRecent(recentSearch.concat(searchQuery))
        }
        if(myItemsVisible === true){
          setSearchData(searchData =>
          searchData.filter(search => {
          return (myItems.includes(search.id));
          
          }));
          setProducts(products =>
            products.filter(search => {
            return (myItems.includes(search.id));
            
            }));
          
          }
      }).catch((err) => {console.log(err.response);})
        .finally(() => {
          setShowNext(false);
          showLoading(false);
          setPerformSearch(false);
        }
      )
      }
      else{
        setPerformSearch(false);
      }
    }, [performSearch]);
    useEffect(() => {
    resetAndSearch();
      
  },[myItemsVisible])
    useEffect(() => {
      if(searchQuery?.length > 2){
        if(finalSearchableQuery === "") {
          setFinalSearchableQuery(searchQuery);
          setNextPage(1);
          setPerformSearch(true);
        }
        else if(!finalSearchableQuery.includes(searchQuery)){
          setProducts([]);
          setFinalSearchableQuery(searchQuery);
          setNextPage(1);
          setPerformSearch(true);
        }
      }
      else{
        setProducts([]);  
        setFinalSearchableQuery("");
        setNextPage(1);
      }
    }, [searchQuery])
    useEffect(() => {
      if(showNext && hasMoreResults){
        setNextPage(nextPage+1);
        setPerformSearch(true);
      }}, [showNext]);

    useEffect(() => {
      if(sorter!=""){ 
        resetAndSearch();
      }
    }, [sorter])
    useEffect(() => {
        getProductSuggestion(suggestion).then((response)=>{
      setSuggestions(response?.data?.data[0]?.attributes?.completion)});
      setAllFacets(undefined);
      setProducts([]);
    }, [suggestion])
    useEffect(() => {
      if ([ 'material','label','price[min]','price[max]'].includes(facet?.key)) {
        let existingFacet = chosenFacets.filter((f) => {
          return f.key === facet.key;
        });
        if (existingFacet.length == 0 && facet.value != undefined) {
          setChosenFacets(
            chosenFacets.concat({
              key: facet?.key,
              value: facet?.value,
              
            })
          );
        } else if (existingFacet.length > 0) {
          let tmp = chosenFacets.filter(
            (f) => f.key != facet.key && f.value != undefined
          );
          setChosenFacets(facet.value != undefined ? tmp.concat(facet) : tmp);
        }
      }
    }, [facet]);
    useEffect(() => {
      resetAndSearch();
    }, [chosenFacets]);

    useEffect(() => {
      
      resetAndSearch();
    }, [highVal,lowVal]);
    useEffect(() => {
      resetAndSearch();
    }, [selectedBrands]);
    return (
      
    <View style={{ flex: 1,backgroundColor:"#FFFFFF"}}>
     { allFacets === undefined && suggestions.length !==0 && <View>
       {suggestions?.map(
         (res) => {
          return (
          <View style={{marginLeft:10}}>
          <List.Item  title={res} onPress={() => { setQuery(res);
          }}/>
          <Divider/>
          </View>
          )
         }
       )}
      </View>}
      { allFacets === undefined  && suggestions.length ===0 && <View>
       <Text style={{fontFamily:Fonts.POPPINS_BOLD,fontSize:16,color:"black",marginLeft:20}}>{t('recentSearch')}</Text>
       {recentSearch?.map(
         (res) => {
          return (
          <View style={{marginLeft:10}}>
          <List.Item  title={res} onPress={() => { setQuery(res);
         }}/>
          <Divider/>
          </View>
          )
         }
       )}
      </View>}
    {resultCount!==0 && allFacets !== undefined && <Sorter sorter={sorter} setSorter={setSorter} highVal = {highVal} setHighVal ={sethighVal} lowVal = {lowVal} setLowVal ={setLowVal} allFacets={allFacets} setFacet={setFacet} myItems={myItems} setMyItems = {setMyItems} setMyItemsVisible = {setMyItemsVisible} myItemsVisible ={myItemsVisible} selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands}/>}
    { loading && <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "#fff"}}><Loader /></View> }
    {allFacets !== undefined && <ProductListing  productsData={products} setShowNext = {setShowNext} navigation={navigation} searchData={searchData} productLabels={productLabel} resultCount={(`${t(`showing`)} ${products.length} ${t(`results`)}` )} />}
     </View>);
}

const styles = StyleSheet.create({
  productsList: {
    backgroundColor: '#eeeeee',
  },
  productsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});