import Geolocation from '@react-native-community/geolocation'
import axios from 'axios'
import { SearchNormal } from 'iconsax-react-native'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { ButtonComponent, InputComponent, RowComponent, SpaceComponent, TextComponent } from '../components'
import { appColors } from '../constants/appColors'
import { appInfors } from '../constants/appInfors'
import { LocationModel } from '../models/LocationModel'
import LoadingModal from './LoadingModal'

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

const LocationModal = (props: Props) => {
    const { visible, onSelect, onClose } = props
    const [searchKey, setSearchKey] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [locations, setLocations] = useState<LocationModel[]>([])
    const [addressSelected, setAddressSelected] = useState('')
    const [myLocation, setMyLocation] = useState<{ lat: number, long: number }>()

    useEffect(() => {
        // mặc định vào là lấy ví trị của bạn
        Geolocation.getCurrentPosition((position) => {
            if (position.coords) {
                setMyLocation({
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                })
            }
        })
    }, []);

    useEffect(() => {
        setIsLoading(true);
        // lấy ra lat long từ địa chỉ đã chọn
        fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(addressSelected)}&format=json`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const location = data[0];
                    console.log(`Latitude: ${location.lat}, Longitude: ${location.lon}`);

                    // Set the new location
                    setMyLocation({
                        lat: parseFloat(location.lat),
                        long: parseFloat(location.lon)
                    });
                } else {
                    console.log('Lỗi lấy lat long');
                }
            })
            .catch(error => console.error('Error:', error))
            .finally(() => {
                setIsLoading(false);
            });
    }, [addressSelected]);

    useEffect(() => {
        if (!searchKey) {
            setLocations([])
        }
    }, [searchKey])

    //này để lấy 1 mảng các vị trí liên quan có tên cụ thể
    const handleSearchLocation = async () => {
        //lấy từ app eventhub bên here
        const apiKey = 'dMtcjREnppyVY6bFJEA-J5SZzMxEzbnj18LNlWwsYzA'
        const api = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${searchKey}&limit=20&apiKey=${apiKey}`;
        try {
            setIsLoading(true)
            const res = await axios.get(api)
            if (res.status === 200) {
                setLocations(res.data.items)
                setIsLoading(false)
            }
        }
        catch (e) {
            Alert.alert('lỗi tìm kiếm vị trí', `${e}`)
            console.log(e)
            setIsLoading(false)
        }
    }

    const handleGetAddressFromPosition = async ({
        latitude,
        longitude,
    }: {
        latitude: number;
        longitude: number;
    }) => {
        //lấy từ app eventhub bên here
        const apiKey = 'dMtcjREnppyVY6bFJEA-J5SZzMxEzbnj18LNlWwsYzA'
        const api = `https://geocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&apiKey=${apiKey}`
        try {
            const res = await axios.get(api)
            const curLocation = res.data.items[0]
            console.log('vị trị vừa tap vào nè: ', curLocation.address.label)
            setMyLocation({
                lat: latitude,
                long: longitude
            })
            setAddressSelected(curLocation.address.label)
            onSelect({
                address: curLocation.address.label,
                position: {
                    lat: latitude,
                    long: longitude,
                },
            })
        }
        catch (e) {
            console.log(e)
        }
        onClose();
    };

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
                                            onPress={async () => {
                                                setIsLoading(true);
                                                setAddressSelected(item.address.label);
                                                setSearchKey('');
                                            }}>
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
                        region={{
                            latitude: myLocation?.lat ?? 10.803731913022185,
                            longitude: myLocation?.long ?? 106.6678559577979,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        showsMyLocationButton
                        showsUserLocation
                        mapType='standard'
                        onPress={event => {
                            handleGetAddressFromPosition(event.nativeEvent.coordinate)
                            console.log('chổ tui click vào map nè: ', event.nativeEvent.coordinate)
                        }
                        }
                    >
                        {/* Thêm Marker vào MapView */}
                        {myLocation && (
                            <Marker
                                coordinate={{
                                    latitude: myLocation.lat,
                                    longitude: myLocation.long
                                }}
                                title="Vị trí đã chọn"
                            />
                        )}
                    </MapView>

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