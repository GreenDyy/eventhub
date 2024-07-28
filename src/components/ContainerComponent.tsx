import React, { ReactNode } from 'react';
import { View, ImageBackground, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { globalStyle } from '../styles/globalStyle';
import { images } from '../constants/images';
import { useNavigation } from '@react-navigation/native';
import RowComponent from './RowComponent';
import { ArrowLeft } from 'iconsax-react-native';
import { appColors } from '../constants/appColors';
import TextComponent from './TextComponent';
import { appFonts } from '../constants/appFonts';

interface Props {
    children: ReactNode;
    isScroll?: boolean;
    isImageBackground?: boolean;
    style?: StyleProp<ViewStyle>;
    title?: string;
    back?: boolean;
}

const ContainerComponent = (props: Props) => {
    const { children, isScroll = false, isImageBackground = false, style, title, back } = props;
    const navigation = useNavigation();

    const headerComponent = (
        <View style={{ flex: 1 }}>
            {(title || back) && (
                <RowComponent
                    style={{
                        paddingHorizontal: 16,
                        paddingVertical: 10,
                        minWidth: 48,
                        minHeight: 48,
                        justifyContent: 'flex-start',
                    }}>
                    {back && (
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ marginRight: 12 }}>
                            <ArrowLeft size={24} color={appColors.text} />
                        </TouchableOpacity>
                    )}
                    {title ? (
                        <TextComponent
                            text={title}
                            fontSize={16}
                            fontFamily={appFonts.airBnBMedium}
                            flex={1}
                        />
                    ) : (
                        <></>
                    )}
                </RowComponent>
            )}
        </View>
    );

    const returnContainer = isScroll ? (
        <ScrollView style={[style, { marginTop: title || back ? 48 : 0 }]} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
            {children}
        </ScrollView>
    ) : (
        <View style={[style, { marginTop: title || back ? 48 : 0, flex: 1 }]}>
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
                    {headerComponent}
                    {returnContainer}
                </View>
            </SafeAreaView>
        </ImageBackground>
    ) : (
        <SafeAreaView style={[globalStyle.container, { paddingTop: StatusBar.currentHeight }]}>
            <View>
                {headerComponent}
                {returnContainer}
            </View>
        </SafeAreaView>
    );
};

export default ContainerComponent;
