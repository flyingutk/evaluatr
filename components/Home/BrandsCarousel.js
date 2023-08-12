import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, Text } from 'react-native';
import { Fonts, Sizes, Colors } from '../../utils/Constants';
import { useTranslation } from 'react-i18next';
import Metrics, {getHeight, getWidth} from '../../utils/metrics';

const screenWidth = Dimensions.get('screen').width;

export function BrandCarousel(props) {
    const navigation = props.navigation;
    const { t } = useTranslation('BrandCarousel');
    const data = props?.data?.brnds

    function renderItem(item){
        return (
            <TouchableOpacity 
                id={(item.brandId).toString()} 
                key={(item.brandId).toString()} 
                 onPress={() => navigation.navigate('Brand', {
                     brand: item,
                     screen: "Home"
                     })}
                >
                <Image style={styles.brandCarouselImages} source={{uri: item?.brndImage?.data?.attributes?.url}} />
                <Text numberOfLines={2} style={styles.brandCarouselLabel}>{item?.brandName}</Text>
            </TouchableOpacity>
        )                  
    }
    const Brand = () => {
        return (
            <View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={styles.titleStyle}>{props?.data?.title?.title}</Text>
                    <TouchableOpacity style={{justifyContent:'center', alignSelf: 'flex-end', width: Sizes.Size_76, height: getHeight(30), borderRadius:8, flex: 0.25, marginHorizontal: Sizes.Size_22, backgroundColor: Colors.paleOrange}} 
                        onPress={()=>navigation.navigate('Products', {
                            brandShow: true
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
        brandCarouselImages: {
            marginTop: Sizes.Size_16,
            width: Sizes.Size_76,
            height: getHeight(45),
            borderRadius: 8,
            marginBottom: getHeight(10),
            resizeMode: 'contain'
        },
        titleStyle: {
            fontStyle: "normal",
            fontSize: Sizes.Size_18,
            lineHeight: getHeight(22),
            marginTop: getHeight(25),
            fontFamily: Fonts.POPPINS_BOLD,
            color: Colors.blackTwo,
            flex: 0.8,
            marginLeft: Sizes.Size_10
        },
        brandCarouselLabel: {
            fontSize: Sizes.Size_12,
            lineHeight: getHeight(16),
            textAlign: 'center',
            fontWeight: "400",
            fontStyle: "normal",
            width: getWidth(70),
            alignSelf: 'center',
            color: '#0B1932',
            fontFamily: Fonts.POPPINS_REGULAR
        }
    });

    return (
        <Brand />
    )
}