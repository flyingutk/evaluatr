import React, { useEffect, useState,useContext } from 'react';
import { Text, View, StyleSheet, Image,TouchableOpacity, Dimensions} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import marker from '../assets/icons8-marker.png';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootContext } from '../RootContext';
import { getUserLoc } from '../src/services/api/signup.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fonts, Sizes ,Colors} from '../utils/Constants';
import { useTranslation } from 'react-i18next';
import { Loader } from "../components/Loader";
import { CartContext } from '../CartContext';
import { getHeight } from '../utils/metrics';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const UserLocation = ({navigation}) => {
  const {selectedLanguage}  = useContext(RootContext); 
  const { setShowTabNav } = useContext(CartContext);
  const { t } = useTranslation('UserLocation');
  const [lat, setLat] = useState(0);
  const [local, setLocal] = useState('');
  const [long, setLong] = useState(0);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
       setLat(info?.coords?.latitude)
       setLong(info?.coords?.longitude)
      },
    error => console.log('Error', JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
  );
  }, []);

  
  
  return (
    <View style={{ flex: 1, height:screenHeight*1,
      width:screenWidth*1,
       backgroundColor: "#FFFFFF" }}>
      <View style={{flex: 0.05, padding: 8,
  flexDirection:"row",
  width:screenWidth*1,
  height:screenHeight*0.06}}>
       <TouchableOpacity onPress={()=>{
         AsyncStorage.getItem("FLOW").then((response)=>{if(response==="addStore"){
           setShowTabNav("flex")
         }});
         console.log('gobackkkkkkk')
         navigation.navigate("Cart", {screen: "UserLoc"})}}>
          <View style={{ width: 30, height: 30,flex:1,alignItems:"center",justifyContent:"center"  }}>
          {selectedLanguage === "en-US"?<Image source={require("../assets/BackPress.png")}></Image>:<Image style={{marginTop:7,marginLeft:20}} source={require("../assets/BackPressAr.png")}></Image>}
          </View>
        </TouchableOpacity>
        <View style ={{flex:1,justifyContent:"center",alignItems:"center"}}>
       <Text style ={styles.storeLocator}>{t(`storeLocator`)}</Text>
       </View>
      </View>
      {(lat!==0 && long !== 0)?
      <View style={{
        // height:screenHeight*0.99,
                    marginTop : 60,
                    width: screenWidth*1,
                    alignItems: 'center',
                    alignSelf: 'center',
                    flex: 0.91}}>   
        <MapView
        loadingEnabled={true}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          zoomEnabled={true}
          region={{
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
          showsCompass={true}          
          onRegionChangeComplete={(async region => {;
          await AsyncStorage.setItem("LONG",JSON.stringify(region.longitude));
          await AsyncStorage.setItem("LAT",JSON.stringify(region.latitude));
        })}
        >
          
          <Marker
            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
            pinColor={'yellow'} // any color
            title={'title'}
            description={'description'}
            onDragEnd={(e) => {
              console.log('dragEnd', e.nativeEvent.coordinate);
            }}
          />
        </MapView>
        <View style={styles.markerFixed}>
          <Image style={styles.marker} source={marker} />
        </View>
      </View>:<View style={styles.loaderView}><Loader /></View>}
      { lat!== 0 &&
      <TouchableOpacity
           style={styles.button}
            onPress={ async () => {
              const Longitude = await AsyncStorage.getItem("LONG")
              const Latitude = await AsyncStorage.getItem("LAT")
              const userloc = getUserLoc(Longitude , Latitude)
              .then(async (response) => {
                response?.data?.results?.map((values)=> 
                values?.address_components?.map(async (item)=>{
              if(item?.types?.includes("country"))
              {
              
             AsyncStorage.setItem("COUNTRYSHORT",item?.short_name)
              AsyncStorage.setItem("COUNTRY",item?.long_name)}
              else if(item?.types?.includes("administrative_area_level_1")){
             AsyncStorage.setItem("STATE",item?.long_name)
            }
            else if(item?.types?.includes("administrative_area_level_2")){
             AsyncStorage.setItem("AREA",item?.long_name)
            }
            else if(item?.types?.includes("postal_code")){
              AsyncStorage.setItem("POSTAL",item?.long_name)
            }
            else if (item?.types?.includes("locality")){
               setLocal(item?.long_name)
            }
            else if (!(item?.types?.includes("locality"))){
               setLocal('')
            }
          }));   
             let counrty = await AsyncStorage.getItem("COUNTRY");
             let state = await AsyncStorage.getItem("STATE");
             let area = await AsyncStorage.getItem("AREA");
             let countryShort = await AsyncStorage.getItem("COUNTRYSHORT");
             let postal = await AsyncStorage.getItem("POSTAL");
            //  let locality = await AsyncStorage.getItem("LOCALITY");

            
              navigation.navigate('store details',{country : counrty , area : state , subarea : area , countryShort : countryShort,postal : postal,locality:local})
             })
             .catch((error) => console.log("Error : ",error));
            }}
         >
           <Text style={styles.buttonText}>{t(`confirmLocation`)}</Text>
         </TouchableOpacity>}
    </View>
  );
};
const Stack = createNativeStackNavigator();
export function UserLoc({navigation,route} ) {
 AsyncStorage.setItem("FLOW",route.name)
  return (
      
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen
        name="UserLocation"
        component={UserLocation}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="store details"
        component={StoreDetails} 
        initialParams = {route}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
  }
const styles = StyleSheet.create({
  container: {
    height:screenHeight*0.8,
    marginTop : 5,
    width: screenWidth*1,
    
    alignItems: 'center',
  },
  storeLocator: {
    fontFamily : Fonts.POPPINS_SEMIBOLD,
    color:"#0B1932",
    fontSize: Sizes.Size_14,
    lineHeight: Sizes.Size_18,
  },
  address: {
    justifyContent :"center",
    textAlign :"center",
    fontWeight : "bold", 
    color : "black"
  },
  plusCode: {
    backgroundColor: 'green',
    marginHorizontal: 20,
    height: 50,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loaderView: {
    position:"absolute",
    bottom:getHeight(450),
    justifyContent:"center",
    alignSelf:"center",
    width: Sizes.Size_30,
    height: Sizes.Size_30,
    borderRadius: Sizes.Size_6,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Colors.white,
    marginTop: Sizes.Size_36,
    marginLeft: Sizes.Size_32,
    marginRight: Sizes.Size_36,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
  marker: {
    height: 48,
    width: 48,
  },
  button: {
    marginTop: 10,
    // height: screenHeight*0.06,
    width: screenWidth*0.92,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    backgroundColor: "#028E46",
    borderRadius: Sizes.Size_8,
    zIndex: 10,
    flex: 0.08
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: Sizes.Size_14,
    fontFamily: Fonts.POPPINS_SEMIBOLD,
    lineHeight: Sizes.Size_18
  },
});

export default UserLoc;

