const axios = require('axios').default;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from "axios";
import RNRestart from 'react-native-restart';
// import { getRefreshedToken } from "./signup.service";
const axiosInstance = axios.create({
    baseURL: "https://5803-2409-40e3-1008-a430-b942-9d2-5ebf-978e.ngrok-free.app",
    timeout: 10000,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  }
  });

  axiosInstance.interceptors.request.use(async function(config){
    const language = await AsyncStorage.getItem("custPreferredLang"); 
    language && (config.headers["Accept-Language"] = language);
    const token = await AsyncStorage.getItem("TOKEN"); 
    token && (config.headers["Authorization"] = `Bearer ${token}`);
    return config;
  },
  
  
  
  );
  axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
    function (error) {
      if(error.response.status === 401){
        // getRefreshedToken().then(async response => {
        //     await AsyncStorage.setItem("TOKEN",response?.data?.data?.attributes?.accessToken);
        //     await AsyncStorage.setItem("REFTOKEN",response?.data?.data?.attributes?.refreshToken);
        //     RNRestart.Restart();
        //   })
        //   .catch((err)=> console.log("Error : ",err));
      }
      
      return Promise.reject(error);
    }
  );
export { axiosInstance as httpClient }  