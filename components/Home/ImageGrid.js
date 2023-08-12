import React, {useState} from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity, I18nManager} from 'react-native';
import { SimpleImage } from '../CustomImage';


const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

export default function ImageGrid(props){

    const navigation = props.navigation
    const bigImgData=props?.data?.bigImg
    const smallImgData = props?.data?.smallImg
    const [showProductDetails, setShowProductDetails] = useState(false)
    const [productId, setProductId] = useState(undefined)

    const onPressImage = (item) => {
        let destinationType = item?.destinationType
        let destinationId = item?.destinationID

        if (destinationType== 'product') {
            setShowProductDetails(true)
            setProductId(destinationId)
        }
         else if (destinationType== 'category') {
             navigation.navigate('Category', {
                filterId: destinationId,
                children: item?.categoryInfo?.children
             })
        }
         else{
            navigation.navigate('Brand', {
                brand: item,
                screen: "ImageGrid"
            })
        }
    }

    return (
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity
                    onPress={() => {onPressImage(bigImgData)}}>
                    <SimpleImage style={styles.bigImageStyle} sourceData={{ uri: bigImgData?.image?.data?.attributes?.url }} />
                </TouchableOpacity>
                <View>
                    <TouchableOpacity
                        onPress={() => {onPressImage(smallImgData[0])}}>
                        <SimpleImage style={styles.smallImageStyle} sourceData={{ uri: smallImgData[0]?.image?.data?.attributes?.url }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {onPressImage(smallImgData[1])}}>
                        <SimpleImage style={styles.smallImageStyle} sourceData={{ uri: smallImgData[1]?.image?.data?.attributes?.url }} />
                    </TouchableOpacity>
                </View>
            </View>
        { showProductDetails &&
            <ProductDetailsModal
                showProductDetails={showProductDetails}
                setShowProductDetails={setShowProductDetails}
                navigation={navigation}
                productID={productId}
            />
        }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        height: screenHeight * 0.22,
        paddingTop: 25
    },
    itemContainer: {
        borderRadius: 8,
        top: 20
    },
    carouselStyle: {
        alignSelf: 'center'

    },
    bigImageStyle: {
        width: screenWidth/1.75,
        height: screenHeight/4.5,
        borderRadius: 8,
        resizeMode: 'contain',
        marginHorizontal: '1%'
    },
    smallImageStyle: {
        width: screenWidth/3.5,
        height: screenHeight/9,
        borderRadius: 8,
        resizeMode: 'contain',
        marginHorizontal: '2%'
    },
});