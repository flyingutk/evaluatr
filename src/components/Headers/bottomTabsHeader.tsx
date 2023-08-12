
import { ReactNode } from "react";
import Box from "../../restyle/Box";
import Text from "../../restyle/Text";

const BottomTabsHeader = ({
  title,
  renderLeft,
  renderRight,
}: {
  title: string | ReactNode;
  renderLeft?: ReactNode;
  renderRight?: ReactNode;
}) => {
  return (
    <Box flexDirection="row" alignItems="center" borderBottomColor="silver" borderBottomWidth={1}>
      <Box flex={1} alignItems="flex-start">
        {renderLeft}
      </Box>
      <Box flex={1} padding="m">
        {typeof title === "string" ? (
          <Text textAlign="center" variant="b2">
            {title}
          </Text>
        ) : (
          title
        )}
      </Box>
      <Box flex={1} alignItems="flex-end">
        {renderRight}
      </Box>
    </Box>
  );
};
export default BottomTabsHeader;
