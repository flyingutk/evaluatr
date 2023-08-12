import React, { useContext } from 'react';
import { List } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { StyleSheet, ScrollView ,Image} from 'react-native';
import { Fonts } from '../../utils/Constants';
import { RootContext } from '../../RootContext.js';
export function LabelFilter({labelfilters, setLabelFacet,labelFacet}){
    const { t } = useTranslation('LabelFilter');
    const {selectedLanguage}  = useContext(RootContext);
    if(!labelfilters || labelfilters?.length == 0)
        return null;
    return (
    <List.Accordion style={{backgroundColor:"#FFFFFF"}} titleStyle={{fontSize:15,fontFamily:Fonts.POPPINS_REGULAR, color: "#0B1932", textTransform: "capitalize",fontWeight:"500" }} id="label" title={t(`label`)} 
    right={props => <Image style={{marginRight:10}} source= {selectedLanguage==="en-US"?require("../../assets/rightarrow.png"):require("../../assets/BackPress.png")}></Image>}>
        <ScrollView >
        {
            labelfilters?.[0]?.values.map(
            facet => {
                return <List.Item
                 title={facet.value}
                right={facet.value === labelFacet.value ? props => <List.Icon {...props} icon= "check" color='#028E46'/> : null}
                onPress={() => { setLabelFacet({ key:"label",value: facet.value})}}/>
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