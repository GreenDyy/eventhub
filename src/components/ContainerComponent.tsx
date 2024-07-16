import React, { ReactNode } from 'react';
import { View, ImageBackground, ScrollView, SafeAreaView, StatusBar, StyleProp, ViewStyle } from 'react-native';
import { globalStyle } from '../styles/globalStyle';
import { images } from '../constants/images';

interface Props {
    children: ReactNode;
    isScroll?: boolean;
    isImageBackground?: boolean;
    style?: StyleProp<ViewStyle>;
    title?: string;
}

const ContainerComponent = (props: Props) => {
    const { children, isScroll = false, isImageBackground = false, style, title } = props;

    const returnContainer = isScroll ? (
        <ScrollView style={style}>
            {children}
        </ScrollView>
    ) : (
        <View style={{ flex: 1 }}>
            {children}
        </View>
    );

    return isImageBackground ? (
        <ImageBackground
            source={images.background}
            style={{ flex: 1 }}
            imageStyle={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
                <View>
                    {returnContainer}
                </View>
            </SafeAreaView>
        </ImageBackground>
    ) : (
        <SafeAreaView style={[globalStyle.container, { paddingTop: StatusBar.currentHeight }]}>
            <View>
                {returnContainer}
            </View>
        </SafeAreaView>
    );
};

export default ContainerComponent;
