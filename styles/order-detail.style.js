import { StyleSheet } from "react-native";
import { flexDirectionRow, flexOne } from "./common.styles";

const paddingLeftSixteen = {
    paddingLeft: 16
}
const paddingTopSixteen = {
    paddingTop: 16
}
const paddingRightSixteen = {
    paddingRight: 16
}

const marginLeftSixteen = {
    marginLeft: 16
}
const marginRightSixteen = {
    marginRight: 16
}
const orderItemImageWidth = {
    width:64 
  };
  const orderItemHeight = {
    height: 80
  };
  const orderItemTitleHeight = {
    height: 34
  };

  const orderStatusButton = {
    paddingTop: 4,
    paddingRight: 7.5,
    paddingBottom: 4,
    paddingLeft: 7.5,
  };
  const paymentApprovedColor = {
    backgroundColor: "#FFCF88",
  };

const orderDetailAddrerssStyles = StyleSheet.create({
    container : {
        ...paddingLeftSixteen,
        ...paddingTopSixteen,
        ...paddingRightSixteen,
        height: 150,
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#F3F3F3',
        borderRadius: 6,
        
    },
    title : {
        lineHeight: 22,
        fontSize: 16
    },
    linePadding :{
        paddingTop: 10
    },
    customerName: {
        lineHeight: 18,
        fontSize: 13
    }
});

const orderDetailPaymentStyles = StyleSheet.create({
    container : {
        ...paddingLeftSixteen,
        ...paddingTopSixteen,
        ...paddingRightSixteen,
        height: 150,
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#F3F3F3',
        borderRadius: 6,   
    },
    title : {
        lineHeight: 22,
        fontSize: 16
    },
    linePadding :{
        paddingTop: 10
    },
    paymentInfo: {
        lineHeight: 18,
        fontSize: 13
    },
    linePadding :{
        paddingTop: 10
    },
});

const orderDetailStatus = StyleSheet.create({
    container : {
        ...paddingLeftSixteen,
        ...paddingTopSixteen,
        ...paddingRightSixteen,
        height: 150,
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#F3F3F3',
        borderRadius: 6,   
    },
    title : {
        lineHeight: 22,
        fontSize: 16
    },
    linePadding :{
        paddingTop: 10
    },
    paymentInfo: {
        lineHeight: 18,
        fontSize: 13
    },
    linePadding :{
        paddingTop: 10
    },
});

const orderSummary = StyleSheet.create({
    container : {
        ...paddingLeftSixteen,
        ...paddingTopSixteen,
        ...paddingRightSixteen,
        height: 160,
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#F3F3F3',
        borderRadius: 6,   
    },
    orderSummaryLineContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        borderBottomWidth:1,
        borderBottomColor: '#F1EBEB', 
        // backgroundColor: 'red', 
        height: 40 
    },
    paymentSummayLine : {
        lineHeight: 40,
        fontSize: 14
    }
})

const orderDetailStyles = StyleSheet.create({
    cardMarginBottom:{
        marginBottom: 10
    },
    title: {
        lineHeight: 24,
        fontSize: 18
    },
    dateWrapper : {
        ...flexDirectionRow,
    },
    date: {
        lineHeight: 20,
        fontSize: 13
    },
    orderItemContainerWrapper: {
        marginTop: 15
    },
    orderItemContainer: {
        borderBottomWidth:1,
        borderBottomColor: '#F1EBEB',
        marginBottom: 10,
        paddingBottom: 15
    },
    orderItem: {
        ...flexDirectionRow,
        ...orderItemHeight,
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
      },
      orderItemExtendedWrapper: {
          height: 20,
          paddingLeft: 64,
          marginTop:5
      },
      orderItemExtended : {
            ...marginLeftSixteen,
            ...marginRightSixteen,
            ...flexDirectionRow,
            justifyContent: 'space-between'
      },
      orderStatus: {
        ...orderStatusButton,
        borderRadius: 4,
      },
      paymentApproved: {
        ...paymentApprovedColor,
      },
});


export {orderDetailAddrerssStyles, 
    orderDetailPaymentStyles, 
    orderSummary,
    orderDetailStatus, 
    orderDetailStyles}
