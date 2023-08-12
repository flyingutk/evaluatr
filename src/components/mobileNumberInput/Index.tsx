import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Modal, SafeAreaView, FlatList, I18nManager, StyleSheet } from "react-native";
import { Box, Text , Button , BaseButton , theme } from "../../restyle/Index";
import { countryData,CountryDataType } from "./countryCode";
import { TextInput } from "react-native";
import { useTheme } from "@shopify/restyle";

const countryCodes = ["IQ", "IN", "SA", "PK", "YE", "AF", "BD", "AE"];
type MobileNumberInputProps = {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChangeFormattedText: (text: string) => void;
  textInputProps?: TextInput;
};
const MobileNumberInput = ({
  placeholder,
  value,
  defaultValue = "SA",
  onChangeFormattedText,
  textInputProps,
}: MobileNumberInputProps) => {
  const { colors } = useTheme();
  const [selectedCountry, setSelectedCountry] = useState<string | CountryDataType>(defaultValue);
  const [visible, setVisible] = useState<boolean>(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const temp: CountryDataType | undefined = countryData.find((country) =>
      defaultValue ? country.code === defaultValue.toUpperCase() : country.code === "IN",
    );
    setSelectedCountry(temp);
  }, []);

  const handleModalToggle = useCallback(() => {
    setVisible((visible) => !visible);
  }, []);
  const handleOnSelect = useCallback(
    (country: CountryDataType) => {
      setSelectedCountry(country);
      handleModalToggle(false);
      onChangeFormattedText(`${country?.dial_code}${text}`);
    },
    [handleModalToggle, onChangeFormattedText, text],
  );

  const handleOnChangeText = useCallback(
    (txt: string) => {
      setText(txt);
      onChangeFormattedText(`${selectedCountry?.dial_code}${txt}`);
    },
    [onChangeFormattedText, selectedCountry],
  );

  return (
    <>
      <Box
        borderRadius={"b2"}
        flexDirection="row"
        alignItems={"center"}
        borderColor="pewterBlue"
        borderWidth={1}
        backgroundColor="white"
      >
        <BaseButton onPress={handleModalToggle} flexDirection="row" alignItems={"center"} pl="l" pr="s">
          <Text fontSize={25} mr="xs" lineHeight={30}>
            {selectedCountry?.flag}
          </Text>
          <Text variant={"r1"} mr="xs" lineHeight={30}>
            {selectedCountry?.dial_code}
          </Text>
        </BaseButton>
        <TextInput
          keyboardType="number-pad"
          placeholderTextColor={colors.pewterBlue}
          placeholder={placeholder}
          value={text}
          returnKeyType="done"
          onChangeText={handleOnChangeText}
          style={styles.textInput}
          {...textInputProps}
        />
      </Box>
      <CountryListModal visible={visible} onDismiss={handleModalToggle} onSelect={handleOnSelect} />
    </>
  );
};

const CountryListModal = ({ visible, onDismiss, onSelect }) => {
  const filteredCountryData = useMemo(() => {
    return countryData.filter((country) => countryCodes.includes(country.code));
  }, []);

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <BaseButton
          key={`${item?.code}_${index}`}
          onPress={() => onSelect(item)}
          flexDirection="row"
          alignItems={"center"}
          borderBottomWidth={1}
          borderBottomColor="white"
          paddingHorizontal={"l"}
          marginVertical="s"
        >
          <Text fontSize={35}>{item?.flag}</Text>
          <Text variant={"r1"} ml="m">
            {item?.name}
          </Text>
          <Text variant={"r1"}>{`(${item?.dial_code})`}</Text>
        </BaseButton>
      );
    },
    [onSelect],
  );

  return (
    <Modal visible={visible} onRequestClose={onDismiss} transparent animationType="slide">
      <SafeAreaView style={styles.safeAreaView}>
        <Box flex={1} bg="white">
          <FlatList data={filteredCountryData} renderItem={renderItem} />
        </Box>
      </SafeAreaView>
    </Modal>
  );
};

export default MobileNumberInput;

const styles = StyleSheet.create({
  safeAreaView: { flex: 1 },
  textInput: {
    height: 48,
    flex: 1,
    padding: 5,
    paddingLeft: 10,
    textAlign: I18nManager.isRTL ? "right" : "left",
    ...theme.textVariants.r1,
    color: theme.colors.black,
  },
});
