import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, Text } from 'react-native';
import { Fonts, Sizes, Colors } from '../../utils/Constants';
import { useTranslation } from 'react-i18next';
import Metrics, {getHeight, getWidth} from '../../utils/metrics';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get("screen").height;

export function CategoryCarousel(props) {
    const navigation = props.navigation;
    const data = props?.data?.ctgrs
    const { t } = useTranslation('CategoryCarousel');

    function renderItem(item){
        return (
            <TouchableOpacity 
                id={(item.categoryId).toString()} 
                key={(item.categoryId).toString()} 
                onPress={() => navigation.navigate('Category', {
                    filterId: item?.categoryId,
                    children: item?.categoryInfo?.children})}>
                <View style={styles.imageContainer}>
                    <Image style={styles.categoryCarouselImages} source={item?.image? {uri: item?.image} : require("../../assets/imageNotAvailableIcon.jpeg")} />
                </View>
                <Text numberOfLines={2} style={styles.categoryCarouselLabel}>{item?.categoryInfo?.Title}</Text>
            </TouchableOpacity>
        )                  
    }
    const Category = () => {
        return (
            <View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={styles.titleStyle}>{props?.data?.title?.title}</Text>
                    <TouchableOpacity style={{justifyContent:'center', alignSelf: 'flex-end', width: Sizes.Size_76, height: getHeight(30), borderRadius:8, flex: 0.25, marginHorizontal: Sizes.Size_22, backgroundColor: Colors.paleOrange}} 
                        onPress={()=>navigation.navigate("Products", {
                            brandShow: false
                        })}
                    >
                        <Text style={{color: Colors.blackTwo, fontSize: Sizes.Size_12, fontFamily:Fonts.POPPINS_SEMIBOLD, alignSelf:"center"}}>{t('viewAll')}</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={data} 
                    initialNumToRender={6}
                    renderItem={({item}) => renderItem(item)}
                    numColumns={4}
                    columnWrapperStyle={{justifyContent: 'space-evenly'}}
                />
            </View>
        )
    }

    const styles = StyleSheet.create({
        imageContainer: {
            width: Sizes.Size_80,
            height: getHeight(80),
            backgroundColor: 'rgba(211, 220, 236, 0.2)',
            justifyContent: 'center',
            borderRadius: Sizes.Size_8,
            marginTop: getHeight(10)
        },
        categoryCarouselImages: {
            width: getWidth(65),
            height: getHeight(65), 
            borderRadius: Sizes.Size_8,
            resizeMode: 'contain',
            alignSelf: 'center'
        },
        categoryCarouselLabel: {
            fontSize: Sizes.Size_12,
            lineHeight: getHeight(16),
            textAlign: 'center',
            fontWeight: "400",
            fontStyle: "normal",
            width: getWidth(70),
            alignSelf: 'center',
            color: Colors.blackTwo,
            fontFamily: Fonts.POPPINS_REGULAR,
            marginTop: getHeight(5),
        },
        titleStyle: {
            fontSize: Sizes.Size_18,
            lineHeight: getHeight(22),
            marginTop: getHeight(25),
            fontFamily: Fonts.POPPINS_BOLD,
            color: Colors.blackTwo,
            flex: 0.8,
            marginLeft: Sizes.Size_10
        }
    });

    return (
        <Category />
    )
}