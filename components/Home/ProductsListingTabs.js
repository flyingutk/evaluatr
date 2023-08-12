import * as React from 'react';
import { View, useWindowDimensions, StyleSheet, Text, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Colors, Sizes, HomePage, Fonts } from '../../utils/Constants';
import ProductsListing from './ProductsListing';
import CustomText from '../CustomText';
import { useTranslation } from 'react-i18next';

export default function ProductsListingTabs(props) {

//     const OverView = () => {
//     return Highlights ? (
//         <View style={styles().overViewStyle}>
//             <Text style={styles().highlightStyle}>{Strings.HIGHLIGHTS}</Text>
//         {Highlights.map(obj => {
//           return(
//             <Caption>
//               {`\u25CF ${obj}`}
//             </Caption>
//         )})}
//         <TouchableOpacity style={styles().showMoreContainerStyle} onPress={showMorePressed}>
//         <Text style={styles().showMoreTextStyle}>{Strings.SHOW_MORE}</Text>
//         </TouchableOpacity>
//       </View>) : null
// };
      const { t, i18n } = useTranslation('ProductsListingTabs');
      let bestOfersTabs = [
        { key: 'first', title: 'Best Discounts', haveValue: true },
        { key: 'second', title: 'Combo Offers', haveValue: true },
        { key: 'third', title: 'Coupons', haveValue: true },
      ]

      const Discounts = () => {
        return (
            <ProductsListing
                data={props.data}
                showFlags
                bottomButtonText={HomePage.ALL_DISCOUNTED_OFFERS}
                showDot={false}
                leftPadding={Sizes.Size_12}

            />
        )
      };
      
      const ComboOffers = () => {
        return (
            <ProductsListing
                data={props.data}
                showFlags
                bottomButtonText={HomePage.ALL_DISCOUNTED_OFFERS}
                showDot={false}
                leftPadding={Sizes.Size_12}
            />
        )
      };

      const Coupons = () => {
        return (
            <ProductsListing
                data={props.data}
                showFlags
                bottomButtonText={HomePage.ALL_DISCOUNTED_OFFERS}
                showDot={false}
                leftPadding={Sizes.Size_12}
            />
        )
      };
      
      
  const renderScene = SceneMap({
    first: Discounts,
    second: ComboOffers,
    third: Coupons
  });
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState([
    { key: 'first', title: 'Best Discounts' },
  ]);

  React.useEffect(()=> {
    tabValues();
  }, []);

  const tabValues = () => {
    let tabArray=[];
    bestOfersTabs.map(obj => {
      if (obj.haveValue == true) {
        tabArray.push({key: obj.key, title: obj.title});
      }
    })
    setRoutes([...tabArray]);
  }

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles().indicatorStyle}
      style={styles().mainTabStyle}
      renderLabel={({route, color, focused}) => (
        <Text 
        style={styles(focused).tabBarStyle}
        numberOfLines={1}
        >
          {route.title}
        </Text>
      )}
      tabStyle={{width:'auto'}}
    />
  );

  return (
        <>
            <View style={{flexDirection:'row', marginBottom:Sizes.Size_10, marginTop:Sizes.Size_10}}>
                <CustomText
                    normalStyle={styles().headerTextStyle} topMargin={Sizes.Size_16}
                    size={Sizes.Size_20}>{t(`bestOffers`)}
                </CustomText>
                <CustomText
                    boldStyle={styles().dotStyle}
                    size={Sizes.Size_10}>{"\u2B24"}
                </CustomText>
            </View>
            <TabView
                style={{height: Dimensions.get("screen").height/1.8, marginLeft:Sizes.Size_16,}}
                swipeEnabled={false}
                navigationState={{ index, routes }}
                renderTabBar={renderTabBar}
                renderScene={renderScene}
                onIndexChange={setIndex}
            />
        </>
    );
}
const styles = (focused) => StyleSheet.create({
    indicatorStyle:{ 
      backgroundColor: Colors.black,
      marginLeft:Sizes.Size_12
    },
    textStyle:{
        color: Colors.black,
        fontWeight: 'bold',
      },
      overViewStyle:{
       paddingStart: Sizes.Size_10,
        flexDirection:"column", 
        flex: 1,
        backgroundColor: Colors.white
      },
      highlightStyle:{
        color: Colors.black,
        fontWeight: 'bold',
        paddingVertical: Sizes.Size_10
      },
      tabBarStyle:{ 
        flex: 1,
        color: focused ? Colors.black : Colors.veryLightPink, 
        paddingHorizontal: focused? Sizes.Size_2: Sizes.Size_6, 
        fontSize: Sizes.Size_12, 
        fontStyle:"normal",
        fontWeight:focused?'bold': 'normal',
        fontFamily:Fonts.OPENSANS_BOLD      
    },
    showMoreContainerStyle:{
        borderRadius: Sizes.Size_20,
        justifyContent: 'center',
        position: 'absolute',
        bottom: Sizes.Size_8,
        alignSelf: 'center',
        borderColor: Colors.black,
        borderWidth: Sizes.Size_2,
        paddingHorizontal: Sizes.Size_10,
        paddingVertical: Sizes.Size_8,  
    },
    showMoreTextStyle:{
        color: Colors.purple,
        fontWeight: 'bold'
    },
    mainTabStyle:{ 
      backgroundColor: Colors.white, 
      color: Colors.black , 
      height: Sizes.Size_40
    },
    headerTextStyle: {
        color: Colors.black,
        fontSize: Sizes.Size_22,
        fontFamily: Fonts.MONTSERRAT_SEMIBOLD,
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: Sizes.Size_0,
        marginLeft: Sizes.Size_26
    },
    dotStyle: {
        color: Colors.purple,
        alignSelf: 'center',
        marginLeft: Sizes.Size_10,
        paddingTop: Sizes.Size_20
    },
})