import { createTheme } from "@shopify/restyle";

const fontFamily = {
  regular: "Poppins-Regular",
  semiBold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
};

const palette = {
  maizeCrayola: "#FFC94C",
  rustyRed: "#E52D42",
  lightRed: "#FFCCCC",
  mandarin: "#F9774D",
  green: "#028E46",
  white: "#FFFFFF",
  black: "#000000",
  black10: "rgba(0, 0, 0, 0.1)", //#000000
  black30: "rgba(0, 0, 0, 0.3)", //#000000
  black60: "rgba(0, 0, 0, 0.6)", //#000000
  maastrichtBlue: "#0B1932",
  pewterBlue: "#909FBA",
  silver: "#D3DCEC",
  silver20: "rgba(211, 220, 236, 0.2)", //#D3DCEC
  davyGrey: "#575561",
  lightPink: "rgba(249, 119, 77, 0.12)",
  darkBlueGray: "#607099",
  azureishWhite: "#D3DCEC",
  lightGrey: "#F0F4FB",
  forestGreen: "#0E4924",
  lightSilver: "rgba(211, 220, 236, 0.5)",
  grey5: "#B0BDD4",
  panache: "#E6F4EC",
};

const theme = createTheme({
  colors: {
    transparent: "transparent",
    lightGrey: palette.lightGrey,
    lightPink: palette.lightPink,
    black10: palette.black10,
    black30: palette.black30,
    black60: palette.black60,
    maizeCrayola: palette.maizeCrayola,
    rustyRed: palette.rustyRed,
    lightRed: palette.lightRed,
    white: palette.white,
    black: palette.black,
    maastrichtBlue: palette.maastrichtBlue,
    pewterBlue: palette.pewterBlue,
    green: palette.green,
    silver: palette.silver,
    silver20: palette.silver20,
    darkBlueGray: palette.darkBlueGray,
    azureishWhite: palette.azureishWhite,
    forestGreen: palette.forestGreen,
    mandarin: palette.mandarin,
    lightSilver: palette.lightSilver,
    grey5: palette.grey5,
    panache: palette.panache,
    davyGrey: palette.davyGrey,
  },
  zIndices: {
    z01: -1,
    z0: 0,
    z1: 1,
    z2: 10,
    z3: 100,
  },
  spacing: {
    xxs: 2,
    xs: 5,
    s: 8,
    m: 12,
    l: 16,
    xl: 18,
    xxl: 22,
    xxxl: 24,
    x24: -24,
    x48: -48,
  },
  borderRadii: {
    b0: 4,
    b1: 6,
    b2: 8,
    b3: 12,
    b4: 15,
    b5: 25,
    b6: 41,
  },
  textVariants: {
    defaults: { fontFamily: fontFamily.regular, fontWeight: "400", fontSize: 16, color: "black" },
    buttonLabel: {
      fontFamily: fontFamily.semiBold,
      fontWeight: "500",
      fontSize: 16,
      color: "black",
    },
    r00: { fontFamily: fontFamily.regular, fontWeight: "400", fontSize: 10, color: "maastrichtBlue" },
    r0: { fontFamily: fontFamily.regular, fontWeight: "400", fontSize: 12, color: "maastrichtBlue" },
    r1: { fontFamily: fontFamily.regular, fontWeight: "400", fontSize: 14, color: "maastrichtBlue" },
    r2: { fontFamily: fontFamily.regular, fontWeight: "400", fontSize: 16, color: "maastrichtBlue" },
    r3: { fontFamily: fontFamily.regular, fontWeight: "400", fontSize: 18, color: "maastrichtBlue" },
    r4: { fontFamily: fontFamily.regular, fontWeight: "400", fontSize: 20, color: "maastrichtBlue" },
    r5: { fontFamily: fontFamily.regular, fontWeight: "400", fontSize: 24, color: "maastrichtBlue" },

    s0: { fontFamily: fontFamily.semiBold, fontWeight: "500", fontSize: 12, color: "maastrichtBlue" },
    s1: { fontFamily: fontFamily.semiBold, fontWeight: "500", fontSize: 14, color: "maastrichtBlue" },
    s2: { fontFamily: fontFamily.semiBold, fontWeight: "500", fontSize: 16, color: "maastrichtBlue" },
    s3: { fontFamily: fontFamily.semiBold, fontWeight: "500", fontSize: 18, color: "maastrichtBlue" },
    s4: { fontFamily: fontFamily.semiBold, fontWeight: "500", fontSize: 20, color: "maastrichtBlue" },
    s5: { fontFamily: fontFamily.semiBold, fontWeight: "500", fontSize: 24, color: "maastrichtBlue" },

    b0: { fontFamily: fontFamily.bold, fontWeight: "600", fontSize: 12, color: "maastrichtBlue" },
    b1: { fontFamily: fontFamily.bold, fontWeight: "600", fontSize: 14, color: "maastrichtBlue" },
    b2: { fontFamily: fontFamily.bold, fontWeight: "600", fontSize: 16, color: "maastrichtBlue" },
    b3: { fontFamily: fontFamily.bold, fontWeight: "600", fontSize: 18, color: "maastrichtBlue" },
    b4: { fontFamily: fontFamily.bold, fontWeight: "600", fontSize: 20, color: "maastrichtBlue" },
    b5: { fontFamily: fontFamily.bold, fontWeight: "600", fontSize: 24, color: "maastrichtBlue" },
    b6: { fontFamily: fontFamily.bold, fontWeight: "700", fontSize: 18, color: "maastrichtBlue" },
  },

  cardVariants: {
    defaults: {},
    elevated: {
      borderWidth: 1,
      borderColor: "silver",
      backgroundColor: "white",
      shadowColor: "black30",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
      borderRadius: "b2",
      p: "xxs",
      m: "xxs",
    },
    shadow: {
      backgroundColor: "white",
      shadowColor: "black30",
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.41,
      shadowRadius: 9.11,

      elevation: 14,
      borderRadius: "b2",
      p: "xxs",
      m: "xxs",
    },
  },
});

export type Theme = typeof theme;

export default theme;
