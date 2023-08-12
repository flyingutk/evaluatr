import { I18nManager } from "react-native";
import RNRestart from "react-native-restart";

/**
 * Flip layout.
 */
async function flipLayout() {
  if (I18nManager.isRTL) {
    await I18nManager.forceRTL(false);
  } else {
    await I18nManager.forceRTL(true);
  }
  restartApp();
}

/**
 * Restart the application.
 */
function restartApp() {
  setTimeout(()=> {
    RNRestart.Restart();
  }, 500);
}

export { flipLayout, restartApp };