import AsyncStorage from '@react-native-async-storage/async-storage';
import { getExchangeRate } from '../src/services/api/homepage.service.js';

export const formatIQDPrice = async (amount) => {
  if (isNaN(amount)) {
    return 0;
  }
  let exchangeRate = await AsyncStorage.getItem('exchangeRate');
  if (exchangeRate) {
    return Math.round(parseFloat(exchangeRate) * parseFloat(amount));
  } else {
    await fetchExchangeRate();
    exchangeRate = (await AsyncStorage.getItem('exchangeRate')) || 1;
    return Math.round(parseFloat(exchangeRate) * parseFloat(amount));
  }
};

export const formatPrice = async (priceArr) => {
  if (!priceArr.length) {
    return null;
  }
  let formattedPriceArr = [];
  priceArr.map(async (itr) => {
    const formattedPrice = await formatIQDPrice(itr);
    formattedPriceArr.push(formattedPrice);
  });
  return formattedPriceArr;
};

export const fetchExchangeRate = async () => {
  try {
    const exchangeRateResponse = await getExchangeRate();
    if (
      exchangeRateResponse.data?.factor &&
      exchangeRateResponse?.data?.source?.toLowerCase() === 'usd' &&
      exchangeRateResponse?.data?.target?.toLowerCase() === 'iqd'
    ) {
      await AsyncStorage.setItem(
        'exchangeRate',
        exchangeRateResponse.data?.factor.toString()
      );
      //Return the exchnage rate
      return exchangeRateResponse.data?.factor;
    } else {
      console.log('Error in the response of exchange rate');
      await AsyncStorage.setItem('custPreferredCurr', 'usd');
      return 1.00;
    }
  } catch (error) {
    console.log('Error while fetching exchange rate :: ', error);
    await AsyncStorage.setItem('custPreferredCurr', 'usd');
    return 1.00;
  }
};
