import React, { useEffect, useState } from 'react';
import { View, StyleSheet  } from 'react-native';
import { Colors, Fonts, Sizes } from '../../utils/Constants';
import { useTranslation } from 'react-i18next';

import {getHeight} from '../../utils/metrics';

const ProductsListing = (props) => {
    const { t } = useTranslation('ProductsListing');
    const data = props?.data?.items
    const navigation = props?.navigation
    const showFlags = props?.showFlags
    const [products, setProductData] = useState([]);

    const [selected, setSelected] = React.useState(new Map());
    const [sectionTitle, setSectionTitle] = useState(props?.data?.title?.title);
    const [productImages, setProductImages] = useState([]);
    const [productPrices, setProductPrices] = useState([]);
    const [productLabels, setProductLabels] = useState([]);

    const onSelect = React.useCallback(
        id => {
            const newSelected = new Map(selected);
            newSelected.set(id, !selected.get(id));

            setSelected(newSelected);
        },
        [selected],
    );

    async function fetchData() {
        let productLabelsArray = [];
        let concreteProductsArray = []
        let concreteProductPrices = []
        let concreteProductImages = []
        let concreteProductAvailability = []
        data?.map((item) => {
            if (item?.type === 'product-labels'){
                productLabelsArray.push(item)
            }
            else if (item?.type === 'concrete-products'){
                concreteProductsArray.push(item)
            }
            else if (item?.type === 'concrete-product-prices'){
                concreteProductPrices.push(item)
            }
            else if (item?.type === 'concrete-product-availabilities'){
                concreteProductAvailability.push(item)
            }
            else if (item?.type === 'concrete-product-image-sets'){
                concreteProductImages.push(item)
            }
            else if (item?.type === 'product-labels'){
                productLabelsArray.push(item)
            }
        })
        concreteProductsArray.map((prod) => {
            prodImage = concreteProductImages[concreteProductsArray?.indexOf(prod)]?.attributes?.imageSets[0]?.images
            prodPrice = concreteProductPrices[concreteProductsArray?.indexOf(prod)]?.attributes
            prod.images = prodImage
            prod.price = prodPrice?.price
            prod.prices = prodPrice?.prices
            prod.availability = concreteProductAvailability[concreteProductsArray?.indexOf(prod)]?.attributes
        })
        setProductData(concreteProductsArray);
        setProductLabels(productLabelsArray)
    }

    useEffect(() => {
        fetchData()
    }, []);
    
    return (
        <>
            <View style={{ flex: 1, marginBottom: getHeight(10) }}>
                <HorizontalProductList
                    products={products}
                    productPrices={productPrices}
                    productImages={productImages}
                    navigation={navigation}
                    title={sectionTitle}
                    modalOpen={false}
                    productLabels={productLabels}
                    renderType={props?.data?.display?.mode}
                />
            </View>
        </>
    )
}
const styles = StyleSheet.create({

})

export default ProductsListing;
