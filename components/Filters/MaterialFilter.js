import React, { useState } from 'react';
import { Checkbox, List } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { StyleSheet, ScrollView } from 'react-native';
import { t } from 'i18next';

export function MaterialFilter({materialfilters, setMaterialFacet}){
    const { t } = useTranslation('BrandFilter');
    
    if(!materialfilters || materialfilters?.length == 0)
        return null;
    return (        
    <List.Accordion titleStyle={{fontSize:13, color: "#000", textTransform: "uppercase" }} id="material" title={t(`material`)}>
        <ScrollView >
        {
            materialfilters?.[0]?.values.map(
            facet => {
                return <List.Item  title={facet.value} onPress={() => { setMaterialFacet({ key:"material",value: facet.value})}}/>
            })
        }
        </ScrollView>
    </List.Accordion>
    );
}
const styles = StyleSheet.create({
    priceContainer: {
        margin: 10,
        padding: 10,
        flex: 1,
        alignContent: 'stretch',
        justifyContent: 'center'
        
    },
});