

type ParamList = keyof RootStackParamList;
export const routes: { [key: string]: ParamList } = {
  BottomTabs: "BottomTabs",
  Default: "Default",

};

export type RootStackParamList = {
  Default: undefined;
  BottomTabs: BottomStackParamList;
 
};

type BottomParamList = keyof BottomStackParamList;

export const bottomTabsRouts: {[key: string]: BottomParamList} = {
  Home: 'Home',
  More: 'More',
  Delivery: 'Delivery',
};

export type BottomStackParamList = {
  Home: undefined;
  More: undefined;
  Delivery: undefined;
};
