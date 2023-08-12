import React, { useCallback, useState, useContext } from "react";
import { StyleSheet, I18nManager, Platform, KeyboardAvoidingView, Pressable } from "react-native";
import { TextInput } from "react-native-element-textinput";
import MobileNumberInput from "../components/mobileNumberInput/Index";
import { useNavigation } from "@react-navigation/native";
import Icons from "../components/Icons/Icon";
import { persistData,STORAGE_CONSTANT } from "../helpers/storageHelpers";
import { useTheme } from "@shopify/restyle";
import  Box  from "../restyle/Box";
import  Text  from "../restyle/Text";
import  Button  from "../restyle/Button";
import Theme from "../restyle/theme";
import  theme  from "../restyle/theme";
import Config from "react-native-config";
import LoginService from "../apis/services/loginService";
import { UserContext } from "../context/UserContext/UserContext";
// import { Box, Button, theme, Theme ,Text} from '../restyle'

// import { UserContext } from "../../context/UserContext";

function LoginScreen() {
  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();
   const { afterLoginSuccess } = useContext(UserContext);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(__DEV__ ? "+917060718929" : "");
  const [password, setPassword] = useState(__DEV__ ? "Test@123" : "");
  const [error, setError] = useState("");
  const [wrongPass, setWrongPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const updatePhone = useCallback((phone: string) => {
    setPhoneNumber(phone.trim());
  }, []);

  const updatePassword = useCallback(
    (newText: string) => {
      setPassword(newText);
      password === "" && setWrongPass(false);
      setError("");
    },
    [password],
  );
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  function handleLogin() {
    console.log("pass...", phoneNumber, password);
    if (!phoneNumber || !password) {
      setError("Please enter your phone number and password.");
      return;
    }
    setSubmitLoading(true);
    let data = {
      username: phoneNumber,
      password: password,
    };
    LoginService.userLogin(data)
      .then(async (response) => {
        if (response?.token) {
          console
          await persistData(STORAGE_CONSTANT.USER_TOKEN, response?.token);
          await persistData(STORAGE_CONSTANT.AGENT_ID, response?.agent_id);
          console.log("hellooo......",response)
          afterLoginSuccess();
          navigation.reset({
            index: 0,
            routes: [{ name: "RootStack" }],
          });
        } else {
          setError("Invalid phone number or password.");
        }
        setSubmitLoading(false);
      })
      .catch((error) => {
        console.log("@@@@error", error.response.data.result);
        setSubmitLoading(false);

        if (error?.response?.status === 400) {
          setError("Invalid phone number or password.");
        } else if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("Something went wrong. Please try again later.");
        }
      });
  }

  return (
    <KeyboardAvoidingView
      style={styles.containerStyle}
      behavior="padding"
      keyboardVerticalOffset={80}
      enabled={!(Platform.OS == "android")}
    >
      <Box flex={1} bg={"white"} padding={"l"}>
        <Box alignItems="center" justifyContent="center">
          <Icons icon="aneySalesLogo"></Icons>
        </Box>
        <Box pt={"xxxl"} alignItems="flex-start">
          <Text variant="b5" lineHeight={28}>
            Login into aney delivery
          </Text>
        </Box>
        <Box mt={"xxxl"}>
          <MobileNumberInput placeholder={"Enter phone..."} value={phoneNumber} onChangeFormattedText={updatePhone} />
          <Box
            mt="m"
            height={56}
            flexDirection="row"
            alignItems="center"
            borderWidth={1}
            borderRadius="b2"
            borderColor={error ? "rustyRed" : "pewterBlue"}
          >
            <TextInput
              label="Password"
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
              showIcon={false}
              style={[styles.textInputStyle, { flex: 1, borderColor: error ? colors.rustyRed : colors.pewterBlue }]}
              secureTextEntry={!showPassword}
              onChangeText={updatePassword}
              value={password}
            />
            <Pressable onPress={toggleShowPassword}>
              <Box mr="m">
                <Icons icon={showPassword ? "eyeOn" : "eyeOff"} />
              </Box>
            </Pressable>
          </Box>
        </Box>

        {error ? (
          <Box flexDirection="row" alignItems="center" mt="s">
            <Icons icon="errorInfo" />
            <Text variant="r0" ml="xs" color="rustyRed">
              {error}
            </Text>
          </Box>
        ) : null}

        <Box position={"absolute"} bottom={0} left={0} right={0} p="l" pb="xxxl">
          <Button
            isLoading={submitLoading}
            onPress={handleLogin}
            disabled={password === "" && phoneNumber === ""}
            label="LOGIN"
          ></Button>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerStyle: { flex: 1 },
  textInputStyle: {
    paddingLeft: 10,
    right: 2,
  },
  labelStyle: {
    alignSelf: "flex-start",
    fontSize: 10,
    lineHeight: 11,
    color: theme.colors.pewterBlue,
    paddingTop: 1,
  },
  inputStyle: {
    fontSize: 14,
    lineHeight: 16,
    marginTop: 2,
    paddingTop: 8,
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
});

export default LoginScreen;
