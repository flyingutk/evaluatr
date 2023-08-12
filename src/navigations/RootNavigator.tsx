import React, { useEffect } from "react";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import BottomNavigator from "./BottomNavigator";
import { RootStackParamList , routes } from "./navigationTypes";
// import VisitsDetail from "../views/visits/visitsDetail";
import { RootStackHeader } from "../components/Headers";
import { useUserContext } from "../context/UserContext/UserContext";
// import Search from "../views/search";
// import CustomerDetails from "../views/CustomerDetails/CustomerDetails";
// import Lead from "../views/addLead";
// import { useTranslation } from "react-i18next";
// import { FeedBackForm } from "../views/Feedback";
// import { PlaceOrder } from "../views/WebViews";
// import UserLocation from "../views/leads/leadsListing/UserLocation";
// import { useUserContext } from "../context/UserContext";
// import LeadsDetail from "../views/leads/leadsListing/leadsDetails";
// import { useLocationContext } from "../context/LocationContext";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Home = (): JSX.Element => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};
const options: NativeStackNavigationOptions = {
  headerShown: false,
};
const screenOptions: NativeStackNavigationOptions = {
  header: RootStackHeader,
};
const RootNavigator = (): JSX.Element => {
//   const { t } = useTranslation("Navigator");
  const { fetchUserProfile } = useUserContext();
//   const { initializeLocation } = useLocationContext();

  useEffect(() => {
    fetchUserProfile();
    // initializeLocation();
  }, []);

  return (
    <RootStack.Navigator screenOptions={screenOptions} initialRouteName={routes.BottomTabs}>
      <RootStack.Screen name={routes.BottomTabs} component={BottomNavigator} options={options} />
      {/* <RootStack.Screen name={routes.Default} component={Home} options={options} />
      <RootStack.Screen name={routes.Search} component={Search} options={{ headerShown: false }} />
      <RootStack.Screen
        name={routes.CustomerDetails}
        component={CustomerDetails}
        options={{ title: t("Customer Details") }}
      />
      <RootStack.Screen name={routes.AddLead} component={Lead} options={{ title: t("addLead") }} />
      <RootStack.Screen name={routes.VisitsDetail} component={VisitsDetail} options={{ title: t("visitsDetails") }} />
      <RootStack.Screen name={routes.FeedBackForm} component={FeedBackForm} options={{ title: t("feedbackForm") }} />
      <RootStack.Screen name={routes.PlaceOrder} component={PlaceOrder} />
      <RootStack.Screen name={routes.UserLocation} component={UserLocation} />
      <RootStack.Screen name={routes.LeadsDetail} component={LeadsDetail} /> */}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
