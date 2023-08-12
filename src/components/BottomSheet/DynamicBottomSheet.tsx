import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetScrollView,
    useBottomSheetDynamicSnapPoints,
    BottomSheetBackdropProps,
  } from "@gorhom/bottom-sheet";
  import React, { useCallback, useEffect, useMemo, useRef } from "react";
  import { Keyboard, StyleSheet } from "react-native";
  import { useSafeAreaInsets } from "react-native-safe-area-context";
  import { BottomSheetProps } from "./types";
  
  const DynamicBottomSheet = ({ showSheet, onDismiss, children, transparent }: BottomSheetProps) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);
  
    const { bottom: safeBottomArea } = useSafeAreaInsets();
    const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
      useBottomSheetDynamicSnapPoints(initialSnapPoints);
  
    const contentContainerStyle = useMemo(() => [{ paddingBottom: safeBottomArea }], [safeBottomArea]);
  
    useEffect(() => bottomSheetRef.current?.[showSheet ? "present" : "dismiss"]?.(), [showSheet]);
  
    useEffect(() => {
      const listnerKeyboard = Keyboard.addListener("keyboardWillHide", () => {
        bottomSheetRef.current?.collapse();
      });
      // eslint-disable-next-line @typescript-eslint/unbound-method
      return listnerKeyboard.remove;
    }, []);
  
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} />
      ),
      [],
    );
  
    // renders
    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        keyboardBehavior="interactive"
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        enablePanDownToClose={true}
        handleComponent={null}
        // dismissOnPanDown={false}
        onDismiss={onDismiss}
        backdropComponent={renderBackdrop}
        backgroundStyle={transparent ? styles.transparentBackground : void 0}
      >
        <BottomSheetScrollView
          keyboardShouldPersistTaps={"handled"}
          style={contentContainerStyle}
          onLayout={handleContentLayout}
        >
          {children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  };
  const styles = StyleSheet.create({ transparentBackground: { backgroundColor: "transparent" } });
  
  export default DynamicBottomSheet;
  