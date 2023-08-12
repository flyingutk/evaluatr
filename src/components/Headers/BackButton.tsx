import React, { useCallback } from "react";
import Icons from "../Icons/Icon";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import  BaseButton  from "../../restyle/BaseButton";

interface BackButtonProps {
  onPress?: () => void;
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const BackButton = ({ navigation, onPress }: BackButtonProps) => {
  const handleOnPress = useCallback(() => {
    onPress?.();
    navigation.canGoBack() && navigation.goBack();
  }, [navigation, onPress]);

  return (
    <BaseButton onPress={handleOnPress} p="m" paddingHorizontal="l">
      <Icons icon="backIcon" />
    </BaseButton>
  );
};

export default BackButton;
