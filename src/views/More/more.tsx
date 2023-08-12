import React from "react";
import Icons from "../../components/Icons/Icon";
import BaseButton from "../../restyle/BaseButton";
import { useNavigation } from "@react-navigation/native";


import Box from "../../restyle/Box";
import Text from "../../restyle/Text";
import { useUserContext } from "../../context/UserContext";

const MyProfile = () => {
  // const { userProfile, afterLogout } = useUserContext();
  const { userProfile , afterLogout } =  useUserContext();
  const navigation = useNavigation();
  const logOut = async() => {
   afterLogout();
  };
  return (
    <Box flex={1} bg="white">
      <Box bg="lightSilver" p="l">
        <Text variant="b5">Hi, {userProfile?.first_name || "User"}</Text>
        <Text variant="s0" lineHeight={16}>
          {userProfile?.phone || ""}
        </Text>
        <Text variant="s0" mt="xs" lineHeight={16}>
          {userProfile?.email || ""}
        </Text>
      </Box>
      <Box paddingHorizontal="l" paddingVertical="m" marginVertical="xs" display="none">
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="r2" mb={"xxs"}>
            Language
          </Text>
          <BaseButton
            alignItems="center"
            justifyContent="center"
            borderWidth={1}
            borderColor="silver"
            borderRadius="b2"
            width={53}
            height={32}
            ml="s"
          >
            <Text color="green" textAlign="center">
              العربي
            </Text>
          </BaseButton>
        </Box>
      </Box>
      <Box width={"100%"} height={2} bg="lightSilver" />
      <Box position="absolute" bottom={0} p="xl" pb="s" width="100%">
        <BaseButton
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          onPress={logOut}
          padding="m"
          borderWidth={1}
          borderRadius="b2"
          borderColor="grey5"
        >
          <Icons icon="signOut" fill="none" />
          <Text color="rustyRed" textAlign="center" ml={"xs"} variant="b1">
            Log Out
          </Text>
        </BaseButton>
        {/* <Box flexDirection={"row"} justifyContent={"center"} mt="s">
          <Text textAlign={"center"} variant={"r0"}>
            {t(`version`)} {AppVersion}
          </Text>
        </Box> */}
      </Box>
    </Box>
  );
};
export default MyProfile;
