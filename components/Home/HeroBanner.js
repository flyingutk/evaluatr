import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Dimensions, Animated } from 'react-native';
import { Button, Caption, Card, RadioButton, Text } from 'react-native-paper';
import { Colors, Fonts } from '../../utils/Constants';
import { FAB } from 'react-native-paper';
import { Sizes,Strings } from '../../utils/Constants';
import CustomText from '../CustomText';
import { useTranslation } from 'react-i18next';

export function HeroBanner(props) {
    const { t, i18n } = useTranslation('HeroBanner');
    const [imagesArray, setImagesArray] = useState([]);
    const [chosenThumbnail, setChosenThumbnail] = useState(1);
    const [bannerImage, setBannerImage] = useState("");
    const [bannerAnimation, setBannerAnimation] = useState();
    
    useEffect(() => {
        setBannerAnimation(new Animated.Value(1));
        let imagesData = props.data.items.map(hero=>{return hero.image.data});
        setImagesArray(imagesData);
    }, []);

    useEffect(() => {
        setBannerImage(imagesArray?.[0]?.attributes.url)
    }, [imagesArray])

    function onPressThumbnail(value) {
        Animated.timing(bannerAnimation, {
            toValue: 0,
            duration: 6,
            useNativeDriver:true
          }).start(()=>fadeIn());
        setChosenThumbnail(value.id);
        setBannerImage(value.attributes.url);
      }

    function fadeIn() {
        Animated.timing(bannerAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver:true
        }).start();
      };

    const DealOfTheDay = () => {
        return (
            <View style={styles.dealsOfTheDayContainer}>
                <View style={{ flexDirection: 'row', marginLeft:24,marginTop:20}}>
                    <CustomText
                        normalStyle={styles.headerTextStyle} topMargin={16}
                        size={22}>{t(`dayDeals`)}
                    </CustomText>

                    <CustomText
                        boldStyle={styles.dotStyle}
                        size={10}>{"\u2B24"}
                    </CustomText>
                </View>

                <Animated.Image style={[styles.bannerImage,{opacity:bannerAnimation}]} source={{ uri: bannerImage }} />
                <CustomText normalStyle={styles.dealsSubHeading} size={12}>
                    {t(`onEarphonesTopOffers`)}
                </CustomText>
                <CustomText boldStyle={styles.dealsPriceRange} size={14}>
                    {t(`priceRangeIQD`)}
                </CustomText>
                <CustomText boldStyle={styles.dealsPriceRangeUSD} size={14}>
                    {t(`priceRangeUSD`)}
                </CustomText>
                <CustomText boldStyle={styles.dealsEndTime} size={12}>
                    {t(`dealEndTime`)}
                </CustomText>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dealsThumbnailContainer}>
                    {imagesArray.map(obj => {
                        return(
                            <View style={styles.dealsThumbnailsContainer}>
                                <TouchableOpacity key={(obj.id).toString()} 
                                    // style={[styles.listItem, obj.id === chosenThumbnail ? styles.selectedItem : null]} 
                                    onPress={()=>{onPressThumbnail(obj)}}
                                >
                                    <Image style={styles.dealsThumbnailImage} source={{ uri: obj.attributes.url }}/>
                                </TouchableOpacity>
                            </View>
                    )})}
                </ScrollView>
                <TouchableOpacity style={styles.showMoreContainerStyle} onPress={()=>Alert.alert(t(`seeAllDealsButtonAlert`))}>
                    <CustomText style={styles.showMoreTextStyle}>{t(`seeAllDealsText`)}</CustomText>
                </TouchableOpacity>
            </View>
        )
    }

    const styles = StyleSheet.create({
        dealsOfTheDayContainer: {
            flex:1, 
            width:Dimensions.get('window').width, 
            height:Sizes.Size_576,
            marginTop:Sizes.Size_16,
            backgroundColor:'#F0E0EE'
        },
        dotStyle: {
            color: Colors.purple,
            alignSelf: 'center',
            marginLeft: Sizes.Size_10,
            paddingTop:Sizes.Size_20
        },
        headerTextStyle: {
            color: Colors.black,
            fontFamily: Fonts.MONTSERRAT_SEMIBOLD,
            fontWeight: "600",
            fontStyle: "normal",
            letterSpacing: Sizes.Size_0,
            marginLeft:Sizes.Size_8
        },
        dealsSubHeading: {
            fontFamily: Fonts.OPENSANS_BOLD,
            fontWeight: "bold",
            fontStyle: "normal",
            letterSpacing: Sizes.Size_0,
            marginLeft:Sizes.Size_28,
            marginBottom:Sizes.Size_4,
            color: "#4b4b4c"
        },
        dealsPriceRange: {
            fontFamily: Fonts.OPENSANS_BOLD,
            fontStyle: "normal",
            letterSpacing: Sizes.Size_0,
            color: Colors.black,
            marginLeft:Sizes.Size_28,
            marginBottom:Sizes.Size_14
        },
        dealsPriceRangeUSD: {
            fontFamily: Fonts.OPENSANS_BOLD,
            fontStyle: "normal",
            letterSpacing: Sizes.Size_0,
            marginLeft:Sizes.Size_28,
            color: "#4b4b4c",
            marginBottom:Sizes.Size_4
        },
        dealsEndTime: {
            fontFamily: Fonts.OPENSANS_BOLD,
            fontStyle: "normal",
            letterSpacing: Sizes.Size_0,
            marginLeft:Sizes.Size_28,
            color: "#4b4b4c",
        },
        listItem: {
            borderBottomWidth: 1,
            borderColor: '#dddddd'
        },
        dealsThumbnailsContainer: {
            margin: Sizes.Size_10
        },
        dealsThumbnailImage: {
            width:Sizes.Size_64,
            height:Sizes.Size_80
        },
        selectedItem: {
            borderBottomWidth: 3,
            borderColor: '#A240B7',
        },
        showMoreTextStyle: {
            fontFamily: Fonts.OPENSANS_SEMIBOLD,
            fontSize: 13,
            fontWeight: "600",
            fontStyle: "normal",
            color: "#963CBD",
            marginLeft:Sizes.Size_20
        },
        showMoreContainerStyle: {
            borderRadius: Sizes.Size_16,
            justifyContent: 'center',
            borderColor: Colors.black,
            backgroundColor:Colors.white,
            width:Sizes.Size_126,
            height:Sizes.Size_32,
            marginLeft: Sizes.Size_228,
            marginBottom: Sizes.Size_18,
            marginTop: Sizes.Size_14,
        },
        bannerImage: {
            width: Sizes.Size_312,
            height: Sizes.Size_218, 
            marginLeft:Sizes.Size_28,
            marginTop:Sizes.Size_24,
            marginBottom:Sizes.Size_10
        },
        dealsThumbnailContainer: {
            marginLeft:Sizes.Size_18,
            marginTop:Sizes.Size_8
        }
    });

    return (
        <DealOfTheDay />
    )
}