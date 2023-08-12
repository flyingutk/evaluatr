
// import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {

}


// const selectedLanguage =  await AsyncStorage.getItem("custPreferredLang");
// const lang = selectedLanguage ? selectedLanguage : 'en';
//i18N Initialization
i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources,
    lng: 'en', //default language
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;