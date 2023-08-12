import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, FlatList, Dimensions, Image } from "react-native";
// import MoEReactInbox from "react-native-moengage-inbox";
import { useTranslation } from 'react-i18next';
import { Fonts, Sizes } from "../utils/Constants";
import { Loader } from "../components/Loader";
import { RootContext } from "../RootContext";
import moment from "moment";

const screenWidth = Dimensions.get('screen').width;

export function Notifications( { navigation } ) {
  const { t, i18n } = useTranslation('Notifications');
  const [inboxData, setInboxData] = useState([])
  const {selectedLanguage}  = useContext(RootContext);
  const [showLoader, setShowLoader] = useState(true);


  // useEffect(() => {
  //   fetchNotifs()
  // }, []);

  // const fetchNotifs = async() => {
  //   await MoEReactInbox.fetchAllMessages()
  //   .then((response) => { setInboxData(response?.messages); setShowLoader(false)})
  //   .catch((error) => {console.log(error); setShowLoader(false)})
  //   console.log('inboxData',inboxData)
  // }

  function renderNotifs(item) {
    const data = item?.item?.textContent
    let isClicked = item?.item?.isClicked
    let elapsedTime = moment(item?.item?.receivedTime).fromNow()
    return (
        <TouchableOpacity style = {{ borderColor: '#D3DCEC', borderWidth: 1, borderRadius: 8, marginVertical: 4, width: screenWidth*0.95, padding: 10, alignSelf: 'center' }} 
          onPress={() => isClicked=true}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ flex: 0.97, color: "#000000", fontFamily: Fonts.POPPINS_REGULAR, fontSize: Sizes.Size_12, fontWeight: '400', lineHeight: Sizes.Size_16 }}>{data?.message}</Text>
              <Text style={{ flex: 0.03, color: isClicked? "#028E46" : "#E52D42", fontFamily: Fonts.POPPINS_SEMIBOLD, fontSize: Sizes.Size_12, fontWeight: '400', lineHeight: Sizes.Size_16, alignSelf: 'flex-end', top: -18 }}>{'\u2B24'}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ flex: 0.77, color: "#000000", fontFamily: Fonts.POPPINS_SEMIBOLD, fontSize: Sizes.Size_12, fontWeight: '400', lineHeight: Sizes.Size_16 }}>{data?.title}</Text>
              <Text style={{ flex: 0.23, color: "#000000", fontFamily: Fonts.POPPINS_SEMIBOLD, fontSize: Sizes.Size_12, fontWeight: '400', lineHeight: Sizes.Size_16, alignSelf: 'flex-end' }}>{elapsedTime}</Text>
            </View>
        </TouchableOpacity>
    );
    }

  return !showLoader? (
    inboxData?.length > 0 ?
    <View style={{ flex: 1, backgroundColor: "#FFFFFF"}}>
        <FlatList
          automaticallyAdjustKeyboardInsets
          data={inboxData}
          renderItem={renderNotifs}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => {item?.id}}
        /> 
    </View>
    : <View style={{flex: 1, justifyContent: 'center'}}> 
        <Text style={{ fontFamily: Fonts.POPPINS_SEMIBOLD, textAlign: 'center', color: '#028E46', fontSize: Sizes.Size_18, lineHeight: 25, textAlignVertical: 'center' }}> {`${t(`noNotifs`)}`}</Text>
      </View>
  ) :  <Loader />
}

export default Notifications;
