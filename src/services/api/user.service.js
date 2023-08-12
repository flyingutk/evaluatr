import { httpClient } from "./base.service";
// import {BASE_URL} from "@env"
const BASE_URL = "http://localhost:8080"
export function getUserProfile(email) {
  return httpClient.get(`${BASE_URL}/v1/profile/${email}`);
}

export function addAddress(data) {
  return httpClient.post(`${BASE_URL}/v1/address`, data);
}

export function updateAddress(id, data) {
  return httpClient.patch(`${BASE_URL}/v1/address/${id}`, data);
}

export function deleteAddress(id, data) {
  return httpClient.delete(`${BASE_URL}/v1/address/${id}`, data);
}
