import React from "react";
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomStackParamList , bottomTabsRouts } from "./navigationTypes";
// import HomeScreen from "../views/home/Home";
import Icons from "../components/Icons/Icon";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
// import VisitsListing from "../views/visits/visitsListing";
// import LeadsListing from "../views/leads/leadsListing";
import MyProfile from "../views/More/more";
import { clearStorage } from "../helpers/storageHelpers";
import { restartApp } from "../utils/layout/layout.utils";
import HomeScreen from "../views/home/Home";
import theme from "../restyle/theme";

const BottomTab = createBottomTabNavigator<BottomStackParamList>();

const screenOptions: BottomTabNavigationOptions = {
  tabBarActiveTintColor: theme.colors.green,
  tabBarInactiveTintColor: theme.colors.darkBlueGray,
  tabBarStyle: {
    height: 70,
    borderTopWidth: 1,
    borderTopColor: theme.colors.silver,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 9,
    elevation: 1,
  },
  tabBarLabelStyle: { fontFamily: "Poppins-Regular", fontWeight: "400", fontSize: 12, paddingBottom: 12 },
  tabBarItemStyle: {},
  headerShown: false,
  tabBarHideOnKeyboard: true,
};

const BottomNavigator = (): JSX.Element => {
  const { colors } = useTheme<Theme>();
  const { t } = useTranslation("Navigator");
  return (
    <BottomTab.Navigator
      screenOptions={screenOptions}
      initialRouteName={bottomTabsRouts.Home}>
      <BottomTab.Screen
        name={bottomTabsRouts.Home}
        component={HomeScreen}
        options={{
          tabBarLabel: t(`home`),
          tabBarIcon: tabInfo =>
            !tabInfo.focused ? (
              <Icons icon="homeTab" fill={colors.white} />
            ) : (
              <Icons icon="homeTabSelected" />
            ),
        }}
      />
      <BottomTab.Screen
        name={bottomTabsRouts.Delivery}
        component={HomeScreen}
        options={{
          tabBarLabel: t(`Delivery`),
          tabBarIcon: tabInfo =>
            !tabInfo.focused ? (
              <Icons icon="truckIcon" height={25} width={25} />
            ) : (
              <Icons
                icon="truckGreenIcon"
                height={25}
                width={25}
                fill={colors.green}
              />
            ),
        }}
      />
      <BottomTab.Screen
        name={bottomTabsRouts.More}
        component={MyProfile}
        options={{
          tabBarLabel: t(`more`),
          tabBarIcon: tabInfo =>
            !tabInfo.focused ? (
              <Icons icon="moreTab" fill={colors.white} />
            ) : (
              <Icons icon="moreTabsSelected" fill={colors.green} />
            ),
        }}
      />
    </BottomTab.Navigator>
  );
};

// const Home = (): JSX.Element => {
//   return (
//     <Box flex={1} bg="white" justifyContent="flex-end" p="l">
//       <BaseButton
//         p="m"
//         borderWidth={1}
//         borderColor="silver"
//         borderRadius="b2"
//         onPress={async () => {
//           await clearStorage();
//           restartApp();
//         }}
//       >
//         <Text variant="r2" textAlign="center">
//           Logout
//         </Text>
//       </BaseButton>
//     </Box>
//   );
// };
export default BottomNavigator;
