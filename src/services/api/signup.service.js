import { httpClient } from "./base.service";
// import {OTP_URL} from "@env"

// import AsyncStorage from '@react-native-async-storage/async-storage';

export function SignInfo(data) {
    return httpClient.post(`/register`, data)
    
  }
// export function getAuthOtp(data) {
  
//     return httpClient.post(`/v1/signup/send-otp`, data,{
//       headers : {
//         'token':'2bea0a76-1d97-4ce2-b0dd-71c25faf21ca'
//       }
//     })
//   }
//   export function getOtpVerify(data) {
//     return httpClient.post(`/v1/signup/verify-otp`, data,{
//       headers : {
//         'token':'2bea0a76-1d97-4ce2-b0dd-71c25faf21ca'
//       }
//     }) 
//   }

  export function getAuthToken(data) {
    console.log('dataaa',data)
    return httpClient.post(`/login`, data) 
  }

  

//     export async function getRefreshedToken() {
      
//       const token = await AsyncStorage.getItem("REFTOKEN");
//       const rtoken = await AsyncStorage.getItem("TOKEN");
//       let data ={
        
//           data: {
//             type: "refresh-tokens",
//             attributes: {
//               refreshToken: token ,
//         }
//       }}
//       return httpClient.post(`/v1/refresh-tokens`, data) 
//     }
//     export function getUserLoc(
//       long,
//       lat
//     ) {
      
//       return httpClient.post('https://maps.googleapis.com/maps/api/geocode/json?address=' +
//       lat +
//       ',' +
//       long +
//       '&key=' +
//       'AIzaSyDtvggMnDy43f8BfFs326rwxqXMyjsl900') 
//     }

//     export function CreateCustmoreAdd(data,
//       custId="") {
//       return httpClient.post(`/v1/customers/${custId}/addresses`, data) 
//     }
//     export function UpdateCustomer(data,
//       custId="") {
//       return httpClient.patch(`/v1/customers/${custId}`,data) 
//     }
//     export function DeleteAddress(custId,
//       AddressId) {
//       return httpClient.delete(`/v1/customers/${custId}/addresses/${AddressId}`)
//     }


//     export function getResetLink(phoneNum) {
//       let data ={
        
//         data: {
//           type: "customer-reset-password-using-phone",
//           attributes: {
//             phone: phoneNum ,
//       }
//     }}
    
//       return httpClient.post(`/v1/forget-password`,data) }

//     export function DeleteCustomerbyId(custId) {
     
//       return httpClient.delete(`v1/customers/${custId}`) 
//     }