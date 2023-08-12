import React, { Component, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Caption, Chip, Subheading, Text } from 'react-native-paper';
import { getTopSearchTerms } from '../../src/services/api/search.service';
import { Sizes } from '../../utils/Constants';
import { useTranslation } from 'react-i18next';
class TopSearches extends Component{
    constructor(props){
        super();
        this.props = props;
        this.state = {topSearchTerms: []}
        const { t } = useTranslation('TopSearches');
        this.t= t
    }
    componentDidMount() {
        getTopSearchTerms(this.props.locale)
            .then(res => res.data.search_results.searches)
            .then(search_results => this.setState({ topSearchTerms: search_results }))
            .catch(err => console.log(err));
        }
    render() {
        if(this.state.topSearchTerms.length > 0){
            return(
                <View style={{padding: Sizes.Size_12, backgroundColor: "#fff"}}>
                    <Subheading>{this.t(`topSearches`)}</Subheading>
                    <View style={{paddingHorizontal: 10, flexDirection: 'row', flexWrap: 'wrap', backgroundColor:"#fff", justifyContent: 'flex-start'}}>
                        {this.state.topSearchTerms.map(item => {return (<Chip mode='outlined' style={{margin: Sizes.Size_12, backgroundColor: "#fff"}} key={item.term} onPress={()=>this.props.setSearchQuery(item.term)}>{item.term}</Chip>)
                        })}
                    </View>
                </View>
            );
        }
        else{
            return null;
        }
    }
}
export default TopSearches;
