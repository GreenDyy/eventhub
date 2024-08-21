import { View, Text } from 'react-native'
import React, { ReactNode, useRef } from 'react'
import ButtonComponent from './ButtonComponent'
import { Portal } from 'react-native-portalize'
import { Modalize } from 'react-native-modalize'
import TextComponent from './TextComponent'
import { Camera, Link, MusicLibrary2 } from 'iconsax-react-native'
import { appColors } from '../constants/appColors'
import RowComponent from './RowComponent'
import SpaceComponent from './SpaceComponent'
import ImageCropPicker from 'react-native-image-crop-picker'

const choiceImages = [
    {
        key: 'camera',
        title: 'Take a picture',
        icon: <Camera size={22} color={appColors.text} />,
    },
    {
        key: 'library',
        title: 'From libary',
        icon: <MusicLibrary2 size={22} color={appColors.text} />,
    },
    {
        key: 'url',
        title: 'From url',
        icon: <Link size={22} color={appColors.text} />,
    },
];

const ImagePickerComponent = () => {

    const modalRef = useRef<Modalize>()

    const renderItem = (item: { icon: ReactNode; key: string; title: string }) => (
        <RowComponent
            key={item.key}
            style={{ marginBottom: 20 }}
            onPress={() => handleChoiceImage(item.key)}>
            {item.icon}
            <SpaceComponent width={12} />
            <TextComponent text={item.title} flex={1} />
        </RowComponent>
    )

    const handleChoiceImage = (key: string) => {
        switch (key) {
          case 'library':
            ImageCropPicker.openPicker(options).then(res => {
              onSelect({type: 'file', value: res});
            });
            break;

          case 'camera':
            ImageCropPicker.openCamera(options).then(res => {
              onSelect({type: 'file', value: res});
            });
            break;
          default:
            setIsVisibleModalAddUrl(true);
            break;
        }

        modalRef.current?.close();
    };

    return (
        <>
            <ButtonComponent
                text='Upload image'
                type='link'
                onPress={() => modalRef.current?.open()}
            />
            <Portal>
                <Modalize
                    adjustToContentHeight
                    ref={modalRef}
                    handlePosition='inside'
                >
                    <View style={{ marginVertical: 30, paddingHorizontal: 20 }}>
                        {choiceImages.map((item, index) => {
                            return renderItem(item)
                        })}
                    </View>

                </Modalize>
            </Portal>
        </>
    )
}

export default ImagePickerComponent