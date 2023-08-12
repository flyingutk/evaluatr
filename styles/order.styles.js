import { StyleSheet } from "react-native";
import { flexDirectionRow, flexOne } from "./common.styles";


const orderSummaryBase = {
  height: 150,
  backgroundColor: "white",
  borderRadius: 6,
};

const orderSummaryPadding = {
  // paddingTop: 18,
  // paddingLeft: 16,
  // paddingRight: 16,
  // paddingBotom: 18,
};

const paymentStatusPadding = {
  paddingTop: 4,
  paddingRight: 7.5,
  paddingBottom: 4,
  paddingLeft: 7.5,
};

const paymentStatusMarginTop = {
  marginTop: 15
};
//Order Status
const paymentApprovedColor = {
  backgroundColor: "#FFCF88",
};
const orderCancelled = {
  backgroundColor: "#FF4545",
};
const orderShipped = {
  backgroundColor: "#BFE77F",
};


const orderItemImageWidth = {
  width:64 
};
const orderItemHeight = {
  height: 80
};

const orderItemTitleHeight = {
  height: 34
};

const OrdersStyles = StyleSheet.create({

  orderSummary: {
    ...orderSummaryBase,
    ...orderSummaryPadding,
    marginBottom:15
  },
  paymentStatusMargin: {
    ...paymentStatusMarginTop,
    
  },
  orderStatus: {
    ...paymentStatusPadding,
    borderRadius: 4,
  },
  paymentApproved: {
    ...paymentApprovedColor,
  },
  orderShipped: {
    ...orderShipped,
  },
  orderCancelled: {
   ...orderCancelled
  },
  testStyle: {
    backgroundColor: "red",
  },

  orderItem: {
    ...flexDirectionRow,
    ...orderItemHeight,
    backgroundColor: 'pink'
  },
  orderItemImageContainer: {
    ...orderItemHeight,
    ...orderItemImageWidth,
  },
  orderItemImage:{
    ...orderItemHeight,
    ...orderItemImageWidth,
    resizeMode: 'contain'
  },
  orderItemDetails: {
    ...flexOne,
    ...orderItemHeight,
    backgroundColor: 'red',
    paddingLeft: 16,
    paddingRight: 16

  },
  orderItemName: {
    ...orderItemTitleHeight
  },
  orderItemNameText: {
   lineHeight: 17,
  },
  orderDeliveryDate: {
    lineHeight: 14,
    fontSize: 10
  }
});

export { OrdersStyles };
