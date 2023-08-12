import { StyleSheet } from "react-native";

const fontSize24 = {
  fontSize: 24,
};
const fontSizeTwelve = {
  fontSize: 12,
};

const boldFont = {
  fontWeight: "bold",
};

const textUppercase = {
  textTransform: "uppercase",
};
const textCapitalized = {
  textTransform: "capitalized",
};

const TypoStyles = StyleSheet.create({
  screenTitle: {
    ...fontSize24,
    ...boldFont,
  },
  textUppercase: {
    ...textUppercase,
  },
  textCapitalized: {
    ...textCapitalized,
  },
  boldFont: {
    ...boldFont,
  },
  fontSizeTwelve: {
    fontSize: 13
  },
  fontSizeSixteen: {
    fontSize: 16
  }
});

export { TypoStyles };
