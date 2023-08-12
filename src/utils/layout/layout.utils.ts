import { composeRestyleFunctions } from "@shopify/restyle";
import { Dimensions, I18nManager, Platform } from "react-native";
import RNRestart from "react-native-restart";

/**
 * Flip layout.
 */
async function flipLayout() {
  try {
    if (I18nManager.isRTL) {
      await I18nManager.allowRTL(false);
      await I18nManager.forceRTL(false);
    } else {
      await I18nManager.allowRTL(true);
      await I18nManager.forceRTL(true);
    }
    restartApp();
  } catch (e) {
    console.log("error::::", e);
  }
}

/**
 * Restart the application.
 */
function restartApp() {
  console.log("coming in restart")
  setTimeout(() => {
    RNRestart.Restart();
  }, 500);
}
export const IsAndorid = Platform.OS === "android";
export const IsIos = Platform.OS === "ios";
export const screenWidth = Dimensions.get("screen").width;
export const screenHeight = Dimensions.get("screen").height;
export { flipLayout, restartApp };
