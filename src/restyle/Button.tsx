import { ActivityIndicator } from "react-native";
import { SpacingProps, BorderProps, BackgroundColorProps } from "@shopify/restyle";

import Text from "./Text";
import theme, { Theme } from "./theme";
import  BaseButton from "./BaseButton";
import { ReactNode } from "react";
import Icons from "../components/Icons/Icon";
import { Loader } from "../components/Loader";


type RestyleProps = SpacingProps<Theme> & BorderProps<Theme> & BackgroundColorProps<Theme>;

type Props = RestyleProps & {
  leftIcon?: string | ReactNode;
  rightIcon?: string | ReactNode;
  variant?: string;
  label?: string | ReactNode;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
};

const Button = ({ leftIcon, rightIcon, label, variant = "default", isLoading, color, disabled, ...props }: Props) => {
  const bgColor: BackgroundColorProps<Theme> = disabled
    ? "azureishWhite"
    : variant === "default"
    ? "green"
    : "maizeCrayola";
  const textColor: BackgroundColorProps<Theme> = disabled
    ? "pewterBlue"
    : variant === "default"
    ? "white"
    : "maastrichtBlue";

  return (
    <BaseButton
      disabled={disabled || isLoading}
      flexDirection="row"
      borderRadius={"b2"}
      padding="m"
      backgroundColor={bgColor}
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {leftIcon ? typeof leftIcon === "string" ? <Icons icon={leftIcon} /> : leftIcon : null}
      {isLoading ? (
        <Loader color={theme.colors["white"]} size={23} />
      ) : typeof label === "string" ? (
        <Text variant="buttonLabel" color={color || textColor} marginHorizontal={"xs"}>
          {label}
        </Text>
      ) : (
        label
      )}
      {rightIcon ? typeof rightIcon === "string" ? <Icons icon={rightIcon} /> : rightIcon : null}
    </BaseButton>
  );
};

export default Button;
