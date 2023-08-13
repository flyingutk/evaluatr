import React, { useState ,useContext} from "react";
import {
 SafeAreaView,
 StyleSheet,
 View,
 TouchableOpacity,
 Text,
 Alert,
Image,
Dimensions,
Modal
} from "react-native";
import { DeleteCustomerbyId, UpdateCustomer } from '../src//services/api/signup.service';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TextInput } from "react-native-paper";
import { Fonts ,Colors, Sizes} from "../utils/Constants";
import { useTranslation } from 'react-i18next';
import { Loader } from "../components/Loader";
import { RootContext } from "../RootContext";
import { MoreDetails } from "./More";
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const Stack = createNativeStackNavigator();
export function ProfileInfo({navigation,route} ) {
  const {selectedLanguage}  = useContext(RootContext); 
  let profile = route?.params
const Profile = ({navigation}) => {
    const { t } = useTranslation('More');
    const [Name, setName] = useState(profile?.fName);
    const [Email, setEmail] = useState(profile?.email);
    const [Phone, setPhone] = useState(profile?.phone);
    const [LName,setLname]=useState(profile?.Lname);
    const [showLoader, setShowLoader] = useState(false);
    const [prompt,setPrompt]=useState(false);
    const DeleteCustomer = async () =>{
      const response = await DeleteCustomerbyId(profile?.custId)
      .then((response) => { if(response.status === 204){
        setPrompt(false);
        AsyncStorage.setItem("TOKEN","")
        RNRestart.Restart();
        
      }})
      .catch((err) => {console.log('Errors : ',err)});
    }
  const handleSubmit = async () => {

      setShowLoader(true);
    let data = { 
        data : {
           type: "customers",
           attributes: {
                  firstName: Name,
                  lastName: LName,
                 email:Email,
                  phone:Phone,   
              }   
          }
    }
    UpdateCustomer(data,profile?.custId).then((response) => {  
      if(response?.status === 200){
        AsyncStorage.setItem("FNAME",response?.data?.data?.attributes?.firstName);
        AsyncStorage.setItem("LNAME",response?.data?.data?.attributes?.lastName);
          setShowLoader(false)
        navigation.navigate("Welcome page");
      }
  }
  ) .catch((err) => {
    setShowLoader(false);
      console.log("Error: ",err);
    if(err.response.status === 422){
    Alert.alert("Please Enter the details Properly")
  }
else{
  Alert.alert("Something went wrong")
}});
  };
  
  return (
  <>
   <View style={styles.container}>
   <View style={{padding: 10,
  flexDirection:"row",
  width:screenWidth*1,
  height:screenHeight*0.06}}>
       <TouchableOpacity onPress={navigation.goBack}>
          <View style={{ width: 30, height: 30,flex:1,alignItems:"center",justifyContent:"center"  }}>
          {selectedLanguage === "en-US"?<Image source={require("../assets/BackPress.png")}></Image>:<Image style={{marginTop:7,marginLeft:20}} source={require("../assets/BackPressAr.png")}></Image>}
          </View>
        </TouchableOpacity>
        <View style ={{flex:1,justifyContent:"center",alignItems:"center"}}>
       <Text style ={styles.storeLocator}>{t(`profile`)}</Text>
       </View>
      </View>
        <SafeAreaView style={styles.wrapper}>
       <TextInput  
       style={styles.inputtext}
       label={t(`firstName`)}
       theme={{colors: {primary: '#028E46'}}}
       onChangeText={name => setName(name)}
        defaultValue={Name}
         //setting limit of input
     />
       <TextInput
       style={styles.inputtext}
       theme={{colors: {primary: '#028E46'}}}
       label={t(`lastName`)}
       onChangeText={lasname => setLname(lasname)}
        defaultValue={LName}
         //setting limit of input
     />
     <TextInput
       style={styles.inputtext}
       theme={{colors: {primary: '#028E46'}}}
       label={t(`phone`)}
      editable={false}
        defaultValue={Phone}
         //setting limit of input
     />
     <TextInput
       style={styles.inputtext}
       theme={{colors: {primary: '#028E46'}}}
       label={t(`email`)}
       editable={false}
        defaultValue={Email}
         //setting limit of input
     />
      </SafeAreaView>
      {showLoader ? <View style={styles.loaderView}><Loader /></View>:
    <View style={{marginTop:screenHeight * 0.31,alignItems:"center", zIndex: 10 }}>
        <TouchableOpacity
         style={styles.buttongreen}
         onPress={handleSubmit}
       >
         <Text style={styles.buttonText}>{t(`update`)}</Text>
       </TouchableOpacity>
       </View>
}
{showLoader ? <View style={styles.loaderView}><Loader /></View>:
    <View style={{alignItems:"center", zIndex: 10 }}>
        <TouchableOpacity
         style={styles.buttondelete}
         onPress={()=>{ setPrompt(true)}}
       >
         <Text style={styles.buttonText}>{t(`delete`)}</Text>
       </TouchableOpacity>
       </View>
}
       <View style={{marginTop:-350,marginLeft:90}}>
           </View>
           <View style={{marginLeft:30,marginRight:30}}>
           <Modal
                    animationType="slide"
                    transparent={true}
                    
                    visible={prompt}
                    onRequestClose={() => {
                        setPrompt(false);
                    }}>

                    <View style={styles.modalBodyWrapper}>
                        <View style={styles.modalBody}>
                            <Text style={{alignSelf:"center",fontFamily:Fonts.POPPINS_SEMIBOLD,fontSize:16,lineHeight:20,color:"#333333",marginTop:20,marginLeft:10,marginRight:10}}>{t('deleteCust')}</Text>
                            <View style={{flexDirection:"row",marginTop:20,marginLeft:25,marginRight:20}}>
                               <TouchableOpacity style={{height:48,width:132,borderRadius:8,borderWidth:1,marginRight:10,justifyContent:"center"}} onPress={()=>setPrompt(false)}>
                                      <Text style={{alignSelf:"center",fontSize:14,fontFamily:Fonts.POPPINS_SEMIBOLD,lineHeight:18,color:"#0B1932"}}>{t('noCancel')}</Text>
                               </TouchableOpacity>
                                <TouchableOpacity style={{height:48,width:132,backgroundColor:"#E52D42",borderRadius:8,justifyContent:"center"}} onPress={()=>DeleteCustomer()}>
                                      <Text style={{color:"#FFFFFF",alignSelf:"center",fontSize:14,fontFamily:Fonts.POPPINS_SEMIBOLD,lineHeight:18}}>{t('yesDelete')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
            </Modal>
            </View>
   </View>

 </>
)
;

};
return (
    
  <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }}>
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ headerShown: false }}
    />
    
    <Stack.Screen
      name="Welcome page"
      component={MoreDetails} options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
}
const styles = StyleSheet.create({
 container: {
  height:screenHeight*1,
  width:screenWidth*1,
   backgroundColor: "#FFFFFF",
 },
 head :{
    fontWeight :'bold',
    color : "black",
    fontSize :20,
    marginTop :120,
    marginBottom :60,
    marginLeft : 10,
 },
 modalBodyWrapper: {
  borderRadius:12,
  borderWidth:1,
  marginTop:screenHeight*0.3,
  marginLeft:screenWidth*0.15,
  marginRight:screenWidth*0.15,
 alignSelf:"center",
  flexDirection: 'column',
  justifyContent: 'center',
 
  alignItems: 'center',
  height: screenHeight*0.22, 
  width: screenWidth * 0.85, 
},
modalBody: { 
  borderRadius:12,
  borderWidth:1,
  marginLeft:screenWidth*0.15,
  marginRight:screenWidth*0.15,
  alignSelf:"center",
  height: screenHeight*0.22, 
  width: screenWidth * 0.85, 
  backgroundColor: "#FFFFFF", 
  justifyContent:"flex-start"
 
  
},
 wrapper: {
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
 },
 
 

 inputtext: {
  height: screenHeight * 0.065,
  width:screenWidth * 0.87,
  borderWidth: 1,
  marginBottom: Sizes.Size_6,
  borderRadius: Sizes.Size_8,
  margin:2,
  borderColor:"#909FBA",
  backgroundColor:"#FFFFFF",
  fontFamily: Fonts.POPPINS_REGULAR,
  fontSize: Sizes.Size_14,
  lineHeight: Sizes.Size_18,
  color: '#3B3945'
 },
 loaderView: {
  alignSelf:"center",
  width: Sizes.Size_30,
  height: Sizes.Size_30,
  borderRadius: Sizes.Size_6,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: Colors.white,
  marginTop:screenHeight * 0.36,
  marginLeft: Sizes.Size_32,
  marginRight: Sizes.Size_36,
  marginBottom: Sizes.Size_10,
},
 wrapper: {
  marginTop:20,
  justifyContent: "center",
  alignItems: "center",
  marginLeft:20,
  
  marginRight:20,
 },

 buttongreen: {
 
  height: screenHeight * 0.065,
  width: screenWidth * 0.87,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#028E46",
  borderRadius: Sizes.Size_8,
},
buttondelete: {
  marginTop:10,
  height: screenHeight * 0.065,
  width: screenWidth * 0.87,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FF0000",
  borderRadius: Sizes.Size_8,
},
 input: {
  height: 40,
  borderWidth: 1,
  padding: 10,
  borderRadius: 5,
},
 silverButtonText: {
   color: "#909FBA",
   fontFamily: Fonts.POPPINS_SEMIBOLD,
   lineHeight: Sizes.Size_18,
   fontSize: Sizes.Size_14,
   textTransform: 'uppercase'
 },
 buttonText: {
  color: "#FFFFFF",
  fontFamily: Fonts.POPPINS_SEMIBOLD,
  lineHeight: Sizes.Size_18,
  fontSize: Sizes.Size_14,
  textTransform: 'uppercase'
},

 welcome: {
   padding: 20,
   
 },
 inputWrapper: {
  flex: 1,
  justifyContent: 'center',
  paddingLeft: 20,
  paddingRight: 20,
},
storeLocator: {
    fontFamily : Fonts.POPPINS_SEMIBOLD,
    color:"#0B1932",
    fontSize: Sizes.Size_14,
    lineHeight: Sizes.Size_18,
  },

 
});

export default ProfileInfo;