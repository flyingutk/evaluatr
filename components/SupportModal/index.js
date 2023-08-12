import React, { useContext, useEffect, useState } from 'react';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, Linking, Platform, TouchableOpacity, Alert } from "react-native";
import { Fonts } from '../../utils/Constants';
import { useTranslation } from 'react-i18next';
import { RootContext } from '../../RootContext';
import { customerId } from '../../src/services/api/cart.service';
import { createFreshdeskTicket } from '../../src/services/api/product.service';

const screenWidth = Dimensions.get('window').width;

export function SupportModal(props) {
    const { t } = useTranslation('SupportModal');
    const { dialCall } = useContext(RootContext)
    const subject = "Callback Requested"
    const [requestCallback, setRequestCallback] = useState(true)


    function openWhatsapp(number) {
        let url = `whatsapp://send?phone=${number}`
        Linking.openURL(url).then((data) => {
            console.log('WhatsApp Opened');
          })
          .catch((error) => {
            console.log("Error in opening whatsapp", error);
          });
    }

    const displayData = [
        {
            'title': !requestCallback? t(`callbackRequested`) : t(`requestCallback`),
            'image': require("../../assets/chatSupportIcon.png"),
            'route': 'ticket'
        },
        {
            'title': t(`callUs`),
            'image': require("../../assets/phoneSupportIcon.png"),
            'number': '+966115101666',
            'route': 'phone'
        },
        {
            'title': t(`whatsapp`),
            'image': require("../../assets/whatsappSupportIcon.png"),
            'number': '+966507840047',
            'route': 'whatsapp'
        }
    ]
        
    function renderItem(item){
        return (
            <TouchableOpacity
                onPress={() => {
                        if (item.route === 'whatsapp') {
                            openWhatsapp(item.number)
                        } 
                        else if (item.route === 'phone') {
                            dialCall(item.number)
                        }
                        else if (item.route === 'ticket') {
                            if(!requestCallback) {
                                Alert.alert(t(`callbackRequested`), t(`callbackAlertMessage`))
                            }
                        }
                    }}>
                <View style={{borderColor: '#D3DCEC', borderWidth: 1, borderRadius: 8, width: screenWidth/1.1, alignSelf: 'center', padding: 15}}>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={item.image}></Image>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={styles.titleStyle}>{item.title}</Text>
                            {item.number && <Text style={styles.numberStyle}>{item.number}</Text>}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        )                  
    }

    return props.showSupportModal? (
      <SwipeUpDownModal
        modalVisible={props.showSupportModal}
        onClose={() => {
            props.onCloseModal()
        }}       
        HeaderContent={
            <View style ={{ flex : 1, backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: '60%'}}>
                <View style={{ alignItems: 'center', height: 40 }}>
                    <Image source={require("../../assets/gray-line.png")} style={{width: 39, height: 0, borderWidth: 2.5, borderColor: '#4F4F4F', marginTop: 8, borderRadius: 4, opacity: 0.5, marginBottom: 10}}></Image>
                </View> 
            </View>
        }
        ContentModal={
            <View style={{flex : 1, marginTop: '65%', backgroundColor: 'white', paddingHorizontal: 16, paddingVertical: 20}}>
                <Text style={{color: '#333333', fontFamily: Fonts.POPPINS_BOLD, fontSize: 24, lineHeight: 30, margin: 4}}>{t(`support`)}</Text>
                <FlatList
                    keyExtractor={(item) =>  item?.title}
                    contentContainerStyle={styles.productsListContainer}
                    data={displayData}
                    renderItem={({item}) => renderItem(item)}
                />
            </View>
        }>
    </SwipeUpDownModal>
    ): <></>
  }

  const styles = StyleSheet.create({
    productsListContainer: {
        height: '100%',
        justifyContent: 'space-evenly',
    },
    titleStyle: {
        textAlignVertical: 'center',
        color: '#0B1932',
        fontFamily: Fonts.POPPINS_BOLD,
        fontSize: 14,
        lineHeight: 21,
        marginLeft: '10%'
    },
    numberStyle: {
        textAlignVertical: 'center',
        color: '#0B1932',
        fontFamily: Fonts.POPPINS_REGULAR,
        fontSize: 12,
        lineHeight: 16,
        marginLeft: '10%'
    }
});