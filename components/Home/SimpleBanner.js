import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Caption, RadioButton, Text } from 'react-native-paper';
import { Sizes } from '../../utils/Constants';

export function SimpleBanner(props) {

    const [imagesArray, setImagesArray] = useState([]);

    useEffect(() => {
            if(props.data){
                let imagesData = props.data.items.map(hero=>{return hero.image.data});
                setImagesArray(imagesData);
            }
    }, []);

    const Cards = () => {
        return (
            <ScrollView
                horizontal={true}
                contentContainerStyle={styles.heroCardContainer}
                showsHorizontalScrollIndicator={false}
                bounces={false}
            >
                {
                    imagesArray.map(obj => {
                        return (
                            <TouchableOpacity key={(obj.id).toString()} onPress={() => Alert.alert(`Selected Image No. ${obj.id}`)}>
                                <Image style={styles.heroCardImages} source={{ uri: obj.attributes.url }} />
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        )
    }

    const styles = StyleSheet.create({
        heroCardContainer: {
            marginTop: Sizes.Size_14,
            marginLeft: Sizes.Size_26,
            paddingRight: Sizes.Size_16
        },
        heroCardImages: {
            width: Sizes.Size_264,
            height: Sizes.Size_146,
            borderRadius: Sizes.Size_6,
            marginRight: Sizes.Size_18
        }
    });

    return (
        <Cards />
    )
}