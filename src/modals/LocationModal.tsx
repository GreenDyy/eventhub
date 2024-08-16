import { View, Text, Modal, TouchableOpacity, Alert, FlatList } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, InputComponent, RowComponent, SpaceComponent, TextComponent } from '../components'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { appColors } from '../constants/appColors'
import { CloseSquare, SearchNormal } from 'iconsax-react-native'
import axios from 'axios'
import { LocationModel } from '../models/LocationModel'
import LoadingModal from './LoadingModal'

interface Props {
    visible: boolean,
    onSelect?: (val: string) => void
    onClose?: () => void
}

const LocationModal = (props: Props) => {
    const { visible, onSelect, onClose } = props
    const [searchKey, setSearchKey] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [locations, setLocations] = useState<LocationModel[]>([])

    const handleSearchLocation = async () => {
        //lấy từ app eventhub bên here
        const latitude = 10.8231
        const longitude = 106.6297
        const apiKey = 'dMtcjREnppyVY6bFJEA-J5SZzMxEzbnj18LNlWwsYzA'
        const api = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${searchKey}&at=${latitude},${longitude}&radius=1000&limit=10&apiKey=${apiKey}`
        try {
            setIsLoading(true)
            const res = await axios.get(api)
            if (res.status === 200) {
                console.log(res.data.items)
                setLocations(res.data.items)
                setIsLoading(false)
            }
        }
        catch (e) {
            Alert.alert('lỗi', `${e}`)
            console.log(e)
            setIsLoading(false)
        }
    }

    return (
        <Modal
            animationType='slide'
            visible={visible}
            transparent={true}
        >
            <View style={{ flex: 1, backgroundColor: '#EAF9F4', paddingVertical: 20, paddingHorizontal: 20, marginTop: 60, borderTopRightRadius: 30, borderTopLeftRadius: 30, borderWidth: 1 }}>
                <RowComponent style={{ justifyContent: 'center', paddingHorizontal: 20 }}>
                    <InputComponent
                        value={searchKey}
                        onChangeText={(val) => { setSearchKey(val) }}
                        affix={<SearchNormal size={20} color={appColors.gray} />}
                        placeholder='Search'
                        allowClear
                        onEndEditing={handleSearchLocation} />
                    <SpaceComponent width={5} />
                    <ButtonComponent type='link' text='Close' onPress={onClose} />
                </RowComponent>

                <LoadingModal visible={isLoading} />

                {!isLoading && locations.length > 0 ? (
                    <FlatList
                        data={locations}
                        renderItem={({ item, index }) => {
                            return (
                                <TextComponent text={item.address.city} />
                            )
                        }} />
                ) :
                    <View>
                        <TextComponent text={searchKey ? 'Location not found' : 'Search location'} />
                    </View>}
            </View>


        </Modal>
    )
}

export default LocationModal