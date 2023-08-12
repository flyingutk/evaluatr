import React, { useEffect, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { View, StyleSheet, Modal, Text, Pressable, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSupportedCities } from '../../src/services/api/locations.service';
import { useTranslation } from 'react-i18next';
import { Divider, IconButton, List, RadioButton, TextInput } from 'react-native-paper';
import CustomText from '../CustomText';
import { Sizes } from '../../utils/Constants';

let closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Close</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"/></svg>`
const Close = () => {
    return <SvgXml color='#7d7575' xml={closeIcon} width={30} style={{flex:1, flexDirection: 'row'}}/>
}

export function LocationPicker () {
  const [location, setLocation] = useState(undefined);
  const [cityData, setCityData] = useState([]);
  const [fullCityData, setFullCityData] = useState([]);
  const [cityQuery, setCityQuery] = useState("");
  function changeLocation(newLocation){
    let storableLocation = {
      "ar": `${newLocation.governatear.trim()}, ${newLocation.cityar.trim()}`,
      "en" : `${newLocation.cityen.trim()}, ${newLocation.governate.trim()}`,
      "postalCode": `${newLocation.postalcode.trim()}`
    }
    setLocation(storableLocation);
    AsyncStorage.setItem("custDefaultLocation", JSON.stringify(storableLocation));
  }
  const { t } = useTranslation('LocationPicker');
  const [locationPickerVisible, setLocationPickerVisible] = useState(false);

  useEffect(() => {    
      fetchData()
  },[]);
  useEffect(() => {
    if(cityQuery.length == 0){
      setCityData(fullCityData);
    }
    else{
      setCityData(fullCityData.filter(city => {        
        if(selectedLanguage === "en-US")
          return (city.cityen.concat(city.governate).toLowerCase().search(cityQuery.toLowerCase()) != -1)
        else
          return (city.cityar.concat(city.governatear).search(cityQuery) != -1)
      }))
    }
  }, [cityQuery])

  const [selectedLanguage, setSelectedLanguage] = useState("ar-SA");
  async function fetchData() {
      getSupportedCities().then(response => {
          setFullCityData(response.data.collection);
          setCityData(response.data.collection);
      });
      let lang = await AsyncStorage.getItem("custPreferredLang");
      setSelectedLanguage(lang);
      AsyncStorage.getItem("custDefaultLocation").then(response => {
        if(response) {
            setLocation(JSON.parse(response)) 
        }
        else if(!location){
            setLocationPickerVisible(true);
        }
      });
  }
  const [selectedCity, setSelectedCity] = useState();
  function choiceMade(city) {
    console.log(city);
        setSelectedCity(city);
        changeLocation(city);
        setLocationPickerVisible(!locationPickerVisible);
  }
  return (
    <>{location != undefined && 
      <TouchableOpacity onPress={() => setLocationPickerVisible(true)}>
      <View style={[{flex:1,flexDirection:'row'}]}>
        <IconButton icon={"map-marker"} color={"#A240B7"} />
        <View style={[{marginVertical: 15}]}>
          <CustomText size={Sizes.Size_14}>{selectedLanguage === "ar-SA" ? location.ar : location.en}</CustomText>
        </View>            
      </View>
    </TouchableOpacity>}
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={locationPickerVisible}
                onRequestClose={() => {
                    setLocationPickerVisible(false);
                }}>

                <View style={styles.modalBodyWrapper}>
                    <View style={styles.modalBody}>
                        <View style={styles.modalHeader}>
                            {location != undefined && <TouchableOpacity onPress={() => { setLocationPickerVisible(!locationPickerVisible) }}>
                                <View style={{ height: 30, width: 30 }}>
                                    <Close></Close>
                                </View>
                            </TouchableOpacity>}
                        </View>
                        <TextInput style={{marginLeft: 10, marginRight: 30, height: 28, fontSize: Sizes.Size_14}} placeholder={t(`searchCity`)} onChangeText={(val) => setCityQuery(val)}/>  
                      <FlatList nestedScrollEnabled data={cityData} renderItem={({item}) => 
                        <View key={item.postalcode}>
                          <RadioButton.Item 
                            labelStyle={{fontSize:Sizes.Size_14}} 
                            value={item.postalcode} 
                            label= {selectedLanguage === "ar-SA" ? item.cityar.trim() + ", " + item.governatear.trim() : item.cityen.trim() + ", " + item.governate.trim()} 
                            status={ location && location.postalCode === item.postalcode ? 'checked' : 'unchecked' }
                            onPress={() => choiceMade(item)} />
                          <Divider/>
                        </View>} />  
                    </View>
                </View>
            </Modal>
        </View>
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
        alignItems: 'flex-start'
    },
    modalBody: { 
        height: '75%', 
        width: '100%', 
        backgroundColor: "#FFFFFF", 
        position: 'relative', 
        button: 0, 
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, 
    },
    modalHeader: {
        height: 50, 
        paddingRight: 10,
        width:'auto', 
        alignItems: 'flex-end',
        // marginTop: 100,
        justifyContent: 'center',
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20
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
    }
  });