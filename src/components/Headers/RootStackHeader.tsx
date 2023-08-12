import { NativeStackHeaderProps, NativeStackNavigationProp } from "@react-navigation/native-stack";
import Box from "../../restyle/Box";
import Text from "../../restyle/Text";
import BackButton from "./BackButton";

const RootStackHeader = ({ navigation, route, options, back }: NativeStackHeaderProps) => {
  const title = options?.title || route.name;

  return (
    <Box flexDirection="row" alignItems="center" borderBottomColor="silver" borderBottomWidth={1} bg="white">
      <BackButton navigation={navigation} />
      <Box flex={1} padding="m">
        <Text textAlign="center" variant="b1">
          {title}
        </Text>
      </Box>
      <Box width={50} />
    </Box>
  );
};
export default RootStackHeader;
