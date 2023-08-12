import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, StyleSheet, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { SimpleImage } from '../CustomImage';
import CustomText from '../CustomText';
import { Colors, Fonts, HomePage, Sizes, Strings } from '../../utils/Constants';
import { BackgroundImage } from 'react-native-elements/dist/config';

const BannerWithText = ({ data }) => {
    return (
        <>
            {data.is_best_seller ? (<SimpleImage style={styles.imageStyle}
                sourceData={require("../../assets/blue-banner.png")} />) : null}

            {data.is_best_choice ? (<SimpleImage style={styles.imageStyle}
                sourceData={require("../../assets/green-banner.png")} />) : null}

            <CustomText style={styles.textStyle} size={10}>{data.is_best_seller ? data.best_seller_title
                : data.best_choice_title}</CustomText>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignSelf: 'center'
    },
    imageStyle: {
        width: Sizes.Size_100,
        height: Sizes.Size_20,
    },
    textStyle: {
        position: "absolute",
        top: 2,
        left: 10,
        color: Colors.white,
        fontFamily: Fonts.MONTSERRAT_SEMIBOLD,
        alignSelf: 'center',
        textAlign: 'center',

    }
})
export default BannerWithText