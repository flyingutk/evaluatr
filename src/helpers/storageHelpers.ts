import AsyncStorage from "@react-native-async-storage/async-storage";
export const STORAGE_CONSTANT: { [key: string]: string } = {
  AGENT_ID: "AGENT_ID",
  USER_TOKEN: "USER_TOKEN",
  CURRENT_PRE_LAN: "CURRENT_PRE_LAN",
  USER_REF_TOKEN: "USER_REF_TOKEN",
  LONG: "LONG",
  LAT: "LAT",
  HAS_USER_LOGIN_IN_ASSIST: "HAS_USER_LOGIN_IN_ASSIST",
};

export const persistData = async (key: string, value: string | unknown): Promise<void> => {
  try {
    if (value && typeof value !== "string") {
      value = JSON.stringify(value);
    }
    return await AsyncStorage.setItem(key, value);
  } catch {}
};

export const retrieveData = async (key: string): Promise<string | null | undefined> => {
  try {
    let value = await AsyncStorage.getItem(key);
    return value;
  } catch {}
};

export const removeStorageItem = async (key: string): Promise<void> => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch {}
};
export const clearStorage = async (): Promise<void> => {
  try {
    return await AsyncStorage.clear();
  } catch {}
};
