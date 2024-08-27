import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, { ReactNode, useRef, useState } from 'react'
import ButtonComponent from './ButtonComponent'
import { Portal } from 'react-native-portalize'
import { Modalize } from 'react-native-modalize'
import TextComponent from './TextComponent'
import { Camera, Link, MusicLibrary2 } from 'iconsax-react-native'
import { appColors } from '../constants/appColors'
import RowComponent from './RowComponent'
import SpaceComponent from './SpaceComponent'
import ImageCropPicker, { ImageOrVideo, Options } from 'react-native-image-crop-picker'
import { globalStyle } from '../styles/globalStyle'
import AntDesign from 'react-native-vector-icons/AntDesign'
import InputComponent from './InputComponent'

interface Props {
    onSelect: (val: { type: 'url' | 'file'; value: string | ImageOrVideo }) => void;
}

const options: Options = {
    cropping: true,
    mediaType: 'photo',
};

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

const ImagePickerComponent = (props: Props) => {
    const { onSelect } = props;
    const [imageUrl, setImageUrl] = useState('');
    const [isVisibleModalAddUrl, setIsVisibleModalAddUrl] = useState(false);

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
                    onSelect({ type: 'file', value: res });
                });
                break;

            case 'camera':
                ImageCropPicker.openCamera(options).then(res => {
                    onSelect({ type: 'file', value: res });
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

            <Modal
                visible={isVisibleModalAddUrl}
                statusBarTranslucent
                style={{ flex: 1 }}
                transparent
                animationType="slide">
                <View
                    style={[
                        globalStyle.container,
                        {
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            justifyContent: 'center',
                            alignItems: 'center',
                        },
                    ]}>
                    <View
                        style={{
                            backgroundColor: appColors.white,
                            margin: 20,
                            borderRadius: 12,
                            width: '90%',
                            padding: 20,
                        }}>
                        <RowComponent style={{ justifyContent: 'flex-end' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setImageUrl('');
                                    setIsVisibleModalAddUrl(false);
                                }}>
                                <AntDesign name="close" size={24} color={appColors.text} />
                            </TouchableOpacity>
                        </RowComponent>

                        <TextComponent text="Image URL" isTitle fontSize={18} />
                        <SpaceComponent height={5} />
                        <InputComponent
                            placeholder="URL"
                            value={imageUrl}
                            onChangeText={val => setImageUrl(val)}
                            allowClear
                        />
                        <RowComponent style={{ justifyContent: 'flex-end', marginTop: 12 }}>
                            <ButtonComponent
                                type="link"
                                text="Agree"
                                onPress={() => {
                                    setIsVisibleModalAddUrl(false);
                                    onSelect({ type: 'url', value: imageUrl });
                                    setImageUrl('');
                                }}
                            />
                        </RowComponent>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default ImagePickerComponent