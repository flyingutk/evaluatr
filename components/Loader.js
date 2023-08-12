import * as React from 'react';
import { View } from 'react-native';

import { ActivityIndicator } from 'react-native-paper';

export function Loader({color}) {
    let loaderColor = color ? color : "#028E46";
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ width: "100%", innerHeight: "100%", margin: 4 }}>
                <ActivityIndicator animating={true} color={loaderColor} />
            </View>
        </View>);
}