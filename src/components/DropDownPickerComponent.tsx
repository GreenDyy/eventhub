import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import TextComponent from './TextComponent'
import RowComponent from './RowComponent'
import { ArrowDown2, Check, Heart, SearchNormal } from 'iconsax-react-native'
import { appColors } from '../constants/appColors'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import InputComponent from './InputComponent'
import ButtonComponent from './ButtonComponent'
import SpaceComponent from './SpaceComponent'
import { appFonts } from '../constants/appFonts'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface SelectecValue {
    username: string
    email: string
    value: any
    photo: string
}
interface Props {
    username?: string
    values: SelectecValue[]
    selected?: string | string[]
    onSelect: (val: string | string[]) => void
    multible?: boolean
}

const DropDownPickerComponent = (props: Props) => {
    const { username, values, onSelect, selected, multible } = props
    const [isShowModal, setIsShowModal] = useState(false)
    const [searchKey, setSearchKey] = useState('')
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const modalRef = useRef<Modalize>()

    useEffect(() => {
        if (isShowModal) {
            modalRef.current?.open()
        }
    }, [isShowModal])

    useEffect(() => {
        onSelect(selectedItems)
    }, [multible, selectedItems])

    useEffect(() => {
        if (isShowModal && selected) {
            setSelectedItems(multible ? (selected as string[]) : []);
        }
    }, [isShowModal, selected, multible]);

    const handleSelectItem = (id: string) => {
        // neu co id user nay trong mảng đã chọn thì xoá nó rồi set data mới, còn chưa có thì thêm vào
        if (selectedItems.includes(id)) {
            let newData = [...selectedItems]
            const index = newData.findIndex(value => value === id)
            if (index !== -1) {
                newData.splice(index, 1)
            }
            setSelectedItems(newData)
        }
        else {
            setSelectedItems([...selectedItems, id])
        }
    }

    const renderSelectedItem = (item: SelectecValue) => {
        return (

            <RowComponent key={item.value} style={[localStyle.item]}

                onPress={
                    multible ?
                        () =>
                            handleSelectItem(item.value)
                        :

                        () => onSelect(item.value)}
            >
                <RowComponent>
                    <Image source={{ uri: item.photo ?? 'https://i.pinimg.com/736x/28/dc/36/28dc36d443030e5222e4b39118f18d4e.jpg' }}
                        style={{ height: 48, width: 48, borderRadius: 12 }} />
                    <SpaceComponent width={10} />
                    <View style={{ height: 50, justifyContent: 'space-between' }}>
                        <TextComponent text={item.username}
                            fontFamily={selected?.includes(item.value) ? appFonts.airBnBBold : appFonts.airBnBRegular}
                            color={selected?.includes(item.value) ? appColors.primary : appColors.text} />
                        <TextComponent text={item.email}
                            fontFamily={selected?.includes(item.value) ? appFonts.airBnBBold : appFonts.airBnBRegular}
                            color={selected?.includes(item.value) ? appColors.primary : appColors.text} fontSize={12} />
                    </View>
                </RowComponent>

                <Heart size={22} color={appColors.green1} variant={selected?.includes(item.value) ? 'Bold' : 'Broken'} />

            </RowComponent >

        )
    }

    return (
        <View style={{}}>
            {username && <TextComponent text={username} style={{ marginBottom: 8 }} />}
            <RowComponent
                onPress={() => { setIsShowModal(true) }}
                style={{
                    flexDirection: 'row',
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: appColors.gray2,
                    width: '100%',
                    minHeight: 56,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: appColors.white,
                    padding: 8,
                    // marginBottom: 20,
                }}>
                <RowComponent>
                    <TextComponent text={selectedItems.length !== 0 ? 'Đã chọn' : 'Select'} />
                </RowComponent>
                <ArrowDown2 size={22} color={appColors.gray} />
            </RowComponent>

            <Portal>
                <Modalize
                    handlePosition='outside'
                    ref={modalRef}
                    onClose={() => { setIsShowModal(false) }}
                    scrollViewProps={{
                        showsVerticalScrollIndicator: false
                    }}
                    HeaderComponent={
                        <RowComponent style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                            <View style={{ flex: 1 }}>
                                <InputComponent
                                    style={{ marginBottom: 0 }}
                                    placeholder='Search...'
                                    value={searchKey}
                                    allowClear
                                    affix={<SearchNormal size={22} color={appColors.text} />}
                                    onChangeText={(val) => { setSearchKey(val) }} />
                            </View>
                            <SpaceComponent width={10} />
                            <ButtonComponent text='Cancel' type='link' onPress={() => { modalRef.current?.close() }} />
                        </RowComponent>
                    }
                    FooterComponent={
                        multible && (
                            <View style={{ paddingHorizontal: 20, paddingBottom: 30 }}>
                                <ButtonComponent
                                    text="Agree"
                                    type="primary"
                                    onPress={() => {
                                        onSelect(selectedItems);
                                        modalRef.current?.close();
                                    }}
                                />
                            </View>
                        )
                    }>
                    {/* data se hien thi o day */}
                    <View style={{ paddingHorizontal: 20 }}>
                        {values.map((item, index) => {
                            return (
                                renderSelectedItem(item)
                            )
                        })}
                    </View>

                </Modalize>
            </Portal>
        </View>
    )
}

export default DropDownPickerComponent

const localStyle = StyleSheet.create({
    item: {
        marginBottom: 20,
        fontFamily: appFonts.airBnBMedium,
        justifyContent: 'space-between'
    }
})