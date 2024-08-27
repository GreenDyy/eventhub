import { View, Text, Modal, TouchableOpacity, Alert, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ButtonComponent, InputComponent, RowComponent, SpaceComponent, TextComponent } from '../components'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { appColors } from '../constants/appColors'
import { CloseSquare, SearchNormal } from 'iconsax-react-native'
import axios from 'axios'
import { LocationModel } from '../models/LocationModel'
import LoadingModal from './LoadingModal'
import MapView from 'react-native-maps'
import { appInfors } from '../constants/appInfors'
import Geolocation from '@react-native-community/geolocation'
import Geocoder from 'react-native-geocoding'

interface Props {
    visible: boolean,
    onClose: () => void
    onSelect: (val: {
        address: string,
        position?: {
            lat: number,
            long: number,
        }
    }) => void
}

Geocoder.init(appInfors.GOOGLE_MAPS_API_KEY as string)

const LocationModal = (props: Props) => {
    const { visible, onSelect, onClose } = props
    const [searchKey, setSearchKey] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [locations, setLocations] = useState<LocationModel[]>([])
    const [addressSelected, setAddressSelected] = useState('')
    const [myLocation, setMyLocation] = useState<{ lat: number, long: number }>()

    useEffect(() => {
        Geolocation.getCurrentPosition((position) => {
            if (position.coords) {
                setMyLocation({
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                })
            }
        })
    }, []);

    //chưa hoạt động dc, do api google map -> bill
    useEffect(() => {
        Geocoder.from(addressSelected).then(location => {
            const position = location.results[0].geometry.location
            console.log(position)
            setMyLocation({
                lat: position.lat,
                long: position.lng
            })
        }).catch((e) => {
            console.log('Lỗi lấy lat long: ', e)
        })
    }, [addressSelected])

    useEffect(() => {
        if (!searchKey) {
            setLocations([])
        }
    }, [searchKey])

    const handleSearchLocation = async () => {
        //lấy từ app eventhub bên here
        const latitude = 10.8231
        const longitude = 106.6297
        const apiKey = 'dMtcjREnppyVY6bFJEA-J5SZzMxEzbnj18LNlWwsYzA'
        const api = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${searchKey}&at=${latitude},${longitude}&limit=10&apiKey=${apiKey}`
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

    const handleSelectedLocation = (location: any) => {
        setAddressSelected(location)
        setSearchKey('')
        console.log(addressSelected)
    }

    return (
        <Modal
            animationType='slide'
            visible={visible}
            transparent={true}
        >
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={{ flex: 1, backgroundColor: '#EAF9F4', paddingVertical: 20, paddingHorizontal: 20, marginTop: 120, borderTopRightRadius: 30, borderTopLeftRadius: 30, elevation: 8, borderColor: appColors.gray2, borderWidth: 1 }}>
                    <RowComponent style={{ justifyContent: 'center', paddingHorizontal: 20 }}>
                        <InputComponent
                            value={searchKey}
                            onChangeText={(val) => { setSearchKey(val) }}
                            affix={<SearchNormal size={20} color={appColors.gray} />}
                            placeholder='Search'
                            allowClear
                            onEndEditing={handleSearchLocation} />
                        <SpaceComponent width={10} />
                        <ButtonComponent type='link' text='Close' onPress={onClose} />
                    </RowComponent>

                    {!isLoading && locations.length > 0 ? (
                        <View style={[localStyles.dropdown]}>
                            <FlatList
                                scrollEnabled
                                data={locations}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity style={{ marginBottom: 10 }}
                                            onPress={() => { handleSelectedLocation(item.address.label) }}>
                                            <TextComponent text={item.address.label} />
                                        </TouchableOpacity>
                                    )
                                }} />
                        </View>
                    ) :
                        <View style={{ marginTop: 10 }}>
                            <TextComponent text={searchKey ? 'Location not found' : 'Search location'} />
                        </View>}

                    <MapView style={{ width: appInfors.sizes.WIDTH, height: 400, alignSelf: 'center', marginVertical: 20 }}
                        initialRegion={{
                            latitude: myLocation?.lat ?? 10.803731913022185,
                            longitude: myLocation?.long ?? 106.6678559577979,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        showsMyLocationButton
                        showsUserLocation
                        mapType='standard'

                        region={{
                            latitude: myLocation?.lat ?? 10.803731913022185,
                            longitude: myLocation?.long ?? 106.6678559577979,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />

                    <ButtonComponent text='Comfirm' onPress={() => {
                        onSelect({
                            address: addressSelected,
                            position: myLocation
                        })
                        onClose()
                    }} />
                    <LoadingModal visible={isLoading} />
                </View>
            </View>


        </Modal>
    )
}

export default LocationModal

const localStyles = StyleSheet.create({
    dropdown: {
        position: 'absolute',
        backgroundColor: appColors.white,
        alignSelf: 'center',
        zIndex: 10,
        borderRadius: 10,
        padding: 20,
        borderWidth: 1,
        top: 90, width: '100%',
        borderColor: appColors.gray2
    }
})