import React, {useContext} from "react"
import { RootContext } from "../RootContext"

export const formatPrice = (price) => {
    return(
        parseFloat((price/100)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    )
} 

export const symbolFromIsoCode = (code) => {
    const {selectedLanguage}  = useContext(RootContext); 
    let symbol = code
    if (code === 'EUR') {
        symbol = '€'
    } 
    else if (code === 'USD') {
        symbol = '$'
    }
    else if (code === 'IQD') {
        symbol = 'ع.د'          //TO DO: Need to confirm
    }
    else if (code === 'SAR') {
        if (selectedLanguage === 'ar-SA'){
            symbol = 'ر.س'      // TO DO: Need to confirm
        }
    }
    return symbol
}