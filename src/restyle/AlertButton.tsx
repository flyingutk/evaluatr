import { SpacingProps, BorderProps, BackgroundColorProps } from "@shopify/restyle";
import React, { useCallback, useState } from "react";
import Text from "./Text";
import theme, { Theme } from "./theme";
import BaseButton from "./BaseButton";
import { ReactNode } from "react";
import Icons from "../components/Icons/Icon";
import { Loader } from "../components/Loader";
import DynamicBottomSheet from "../components/BottomSheet/DynamicBottomSheet";
import Box from "./Box";
import { screenHeight } from "../utils/layout/layout.utils";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";

type RestyleProps = SpacingProps<Theme> & BorderProps<Theme> & BackgroundColorProps<Theme>;

type AlertProps = {
  title: string;
  description?: string;
  cancelText: string;
  cancelOnPress?: () => void;
  confirmText: string;
  confirmOnPress: () => void;
};

type Props = RestyleProps & {
  leftIcon?: string | ReactNode;
  rightIcon?: string | ReactNode;
  variant?: string;
  label?: string | ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  alertProps: AlertProps;
};

const AlertButton = ({
  leftIcon,
  rightIcon,
  label,
  variant = "default",
  isLoading,
  color,
  disabled,
  alertProps,
  ...props
}: Props) => {
  const { dismiss } = useBottomSheetModal();
  const [showAlert, setShowAlert] = useState(false);
  const { title, description, cancelText, confirmText, confirmOnPress, cancelOnPress } = alertProps;
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

  const toggleAlert = useCallback(() => {
    setShowAlert((prev) => !prev);
  }, []);
  return (
    <>
      <BaseButton
        disabled={disabled || isLoading}
        flexDirection="row"
        borderRadius={"b2"}
        padding="m"
        backgroundColor={bgColor}
        alignItems="center"
        justifyContent="center"
        {...props}
        onPress={toggleAlert}
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
      <DynamicBottomSheet showSheet={showAlert} onDismiss={toggleAlert} transparent>
        <BaseButton height={screenHeight} justifyContent="center" onPress={() => dismiss()}>
          <Box bg="white" m="l" p="l" borderRadius="b2">
            <Text variant="b3">{title}</Text>
            <Text variant="r1" mt="s">
              {description}
            </Text>
            <Box flexDirection="row" alignItems="center" mt="m">
              <BaseButton
                onPress={() => {
                  cancelOnPress?.();
                  dismiss?.();
                }}
                borderRadius="b2"
                borderWidth={1}
                borderColor="pewterBlue"
                p="m"
                flex={1}
              >
                <Text variant="b1" textAlign="center">
                  {cancelText}
                </Text>
              </BaseButton>
              <BaseButton
                onPress={() => {
                  confirmOnPress?.();
                  dismiss?.();
                }}
                bg="green"
                borderRadius="b2"
                p="m"
                flex={1}
                ml="s"
              >
                <Text variant="b1" color="white" textAlign="center">
                  {confirmText}
                </Text>
              </BaseButton>
            </Box>
          </Box>
        </BaseButton>
      </DynamicBottomSheet>
    </>
  );
};

export default AlertButton;
