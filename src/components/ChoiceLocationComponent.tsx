import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { appColors } from '../constants/appColors'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
import CardComponent from './CardComponent'
import { ArrowRight2, Location } from 'iconsax-react-native'
import SpaceComponent from './SpaceComponent'
import { LocationModal } from '../modals'

interface Props {
    onPress?: () => void
}

const ChoiceLocationComponent = (props: Props) => {
    const { onPress } = props

    const [showModalLocation, setShowModalLocation] = useState(false)
    const [addressSelected, setAddressSelected] = useState<any>()


    //test useEffect nhớ xoá nè
    useEffect(
        () => {
            console.log('Địa chỉ sau confirm: ', addressSelected)
        }, [addressSelected]
    )
    const handleClose = () => {
        setShowModalLocation(false)
    }

    return (
        <>
            <RowComponent style={[localStyles.inputContainer, { justifyContent: 'space-between' }]}
                onPress={() => { setShowModalLocation(!showModalLocation) }}>
                <RowComponent style={{ flex: 1 }}>
                    <CardComponent
                        styles={{ justifyContent: 'center', alignItems: 'center', height: 45, width: 45, padding: 0, margin: 0, borderRadius: 10 }}
                        bgColor={appColors.bg_primary}>
                        <CardComponent
                            styles={{ justifyContent: 'center', alignItems: 'center', height: 30, width: 30, padding: 0, margin: 0, borderRadius: 10 }}
                            bgColor={appColors.white}>
                            <Location size={15} color={appColors.primary} />
                        </CardComponent>
                    </CardComponent>
                    <SpaceComponent width={10} />
                    <TextComponent text={addressSelected ? addressSelected.address : 'Chọn vị trí'} numberOfLines={1} style={{ flex: 1 }} />
                </RowComponent>
                <ArrowRight2 color={appColors.primary} size={22} />
            </RowComponent>

            <LocationModal visible={showModalLocation} onClose={handleClose} onSelect={(val) => {
                setAddressSelected(val)
            }} />
        </>
    )
}

export default ChoiceLocationComponent

const localStyles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: appColors.gray2,
        width: '100%',
        minHeight: 56,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appColors.white,
        padding: 8
        // marginBottom: 20,
    },
})