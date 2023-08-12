import React, { useState } from 'react';
import { Checkbox, List } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { StyleSheet, ScrollView } from 'react-native';

export function MerchantFilter({merchantfilters, setMerchantFacet}){
    const { t } = useTranslation('MerchantFilter');
    
    if(!merchantfilters || merchantfilters?.length == 0)
        return null;
    return (        
    <List.Accordion titleStyle={{fontSize:13, color: "#000", textTransform: "uppercase" }} id="merchant" title={t(`merchant`)}>
        <ScrollView >
        {
            merchantfilters?.[0]?.values.map(
            facet => {
                return <List.Item  title={facet.value} onPress={() => { setMerchantFacet({ key:"merchant_name",value: facet.value})}}/>
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