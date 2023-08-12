import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { BottomSheetProps } from "./types";

const BottomSheet = ({ showSheet, onDismiss, children }: BottomSheetProps) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["50%"], []);
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} />
    ),
    [],
  );
  useEffect(() => bottomSheetRef.current?.[showSheet ? "present" : "dismiss"]?.(), [showSheet]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      keyboardBehavior="interactive"
      handleComponent={null}
      snapPoints={snapPoints}
      // dismissOnPanDown={false}
      onDismiss={onDismiss}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetScrollView>{children}</BottomSheetScrollView>
    </BottomSheetModal>
  );
};
export default BottomSheet;
