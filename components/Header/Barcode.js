import React, { useState } from 'react';
import { RNCamera } from "react-native-camera"
import { View, Dimensions, Alert } from 'react-native';


const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get("screen").height;

export function BarcodeScanner(props) {
    const [cameraRef, setCameraRef] = useState(undefined)

    function barcodeRecognized(barcodes) {
        if (barcodes) {
        getProductIdFromBarcode(barcodes.data)
        }
    }

    async function getProductIdFromBarcode(barcode) {
        getProductFromBarcode(barcode).then(response => {
            let searchResultsPro = response?.data?.included;
            if (!searchResultsPro) {
                props.setShowNoProductModal(true)
            }
            else {
                props.setProductId(searchResultsPro[0].id)
                props.setShowProductDetails(true)
            }
            props.setVisible(!props.visible)
            props.setIsBarcodeSelected(!props.isBarcodeSelected)
            }).catch((err) => {console.log(err.response);})
    }

    return (
        <View>
            <RNCamera
            ref={(ref) => {setCameraRef(ref)}}
            captureAudio={false}
            onBarCodeRead={barcodeRecognized}
            style={{width: screenWidth*0.7, height: screenHeight*0.5, alignSelf: 'center'}}
            />
            
        </View>
    )
}
