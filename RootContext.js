import React, { createContext, useReducer } from "react";
import { Linking } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootReducer from "./RootReducer";
import { fetchExchangeRate } from "./utils/exchangeRate.util";
import { getUserProfile } from "./src/services/api/user.service"

const TIME_DIFFERENCE = 1000 * 60 * 60 * 4; //4hrs

const initialState = {
    defaultLanguage: process.env.DEFAULT_LANGUAGE,
    selectedLanguage: process.env.DEFAULT_LANGUAGE,
    defaultCurrency: process.env.DEFAULT_CURRENCY,
    selectedCurrency: process.env.DEFAULT_CURRENCY,
    exchangeRate: 1.00,
    userProfile: {},
    callbackRequested: false,
    itemRequested: false
}

export const RootContext = createContext();

export const RootProvider = (props) => {

    const [state, dispatch] = useReducer(RootReducer, initialState)

    /**
     * Initialize
     */
    const initialize = async () => {
        let lang = initialState.defaultLanguage
        let currency = initialState.defaultCurrency;
        let rate = initialState.exchangeRate;

        const selectedLanguage = await AsyncStorage.getItem('custPreferredLang');
        if (selectedLanguage) {
            lang = selectedLanguage === 'en-US' ? 'en-US' : 'ar-SA';
        }

        const selectedCurrency = await AsyncStorage.getItem('custPreferredCurr');
        if (selectedCurrency && selectedCurrency.toLowerCase() === 'iqd') {
            currency = 'iqd';
            let exchangeRate = await AsyncStorage.getItem('exchangeRate');
            // Timestamps
            const currentTimestamp = new Date().getTime();
            const timestampFetchExchangerRate = await AsyncStorage.getItem(
                'timestampFetchExchangerRate'
            );
            if (!exchangeRate ||
                (exchangeRate && currentTimestamp && (currentTimestamp - parseInt(timestampFetchExchangerRate) > TIME_DIFFERENCE))) {
                rate = await fetchExchangeRate();
            } else {
                rate = Math.round(parseFloat(exchangeRate));
            }
        }

        updateSelectedLanguage(lang);
        updateSelectedCurrency(currency);
        updateExchangeRate(rate);
    }

    const updateSelectedCurrency = (currency) => {
        dispatch({
            type: 'UPDATE_SELECET_CURRENCY',
            payload: currency
        })
    }

    const updateSelectedLanguage = (lang) => {
        dispatch({
            type: 'UPDATE_SELECTED_LANGUAGE',
            payload: lang
        })
    }

    const updateExchangeRate = (rate) => {
        dispatch({
            type: 'UPDATE_EXCHANGE_RATE',
            payload: rate
        })
    }

    const updateUserProfile = async (email) => {
        await getUserProfile(email)
            .then((response) => {
                dispatch({
                    type: 'UPDATE_USER_PROFILE',
                    payload: response?.data
                })
            })
            .catch((error) => console.log(error));
    }

    const removeUserDetails = async (email) => {
        dispatch({
            type: 'REMOVE_USER_DETAILS',
        })
    }


    function dialCall(number) {
        let phoneNumber = ''
        if (Platform.OS === 'android') {
          phoneNumber = `tel:${number}`;
        }
        else {
          phoneNumber = `telprompt:${number}`;
        }
        Linking.openURL(phoneNumber);
      };



    return (
        <RootContext.Provider
            value={{
                defaultLanguage: state.defaultLanguage,
                selectedLanguage: state.selectedLanguage,
                defaultCurrency: state.defaultCurrency,
                selectedCurrency: state.selectedCurrency,
                exchangeRate: state.exchangeRate,
                userProfile: state.userProfile,
                callbackRequested: state.callbackRequested,
                itemRequested: state.itemRequested,
                initialize,
                updateSelectedCurrency,
                updateSelectedLanguage,
                updateExchangeRate,
                updateUserProfile,
                removeUserDetails,
                dialCall
            }}
        >
            {props.children}
        </RootContext.Provider>
    );
}
