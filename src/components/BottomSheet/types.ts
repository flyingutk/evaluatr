import { ReactNode } from "react";

export type BottomSheetProps = {
  showSheet: boolean;
  onDismiss?: () => void;
  children: ReactNode;
  transparent?: boolean;
};
