import { View, Text, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import { globalStyle } from '../styles/globalStyle'
import { TextComponent } from '../components'
import { appColors } from '../constants/appColors'

interface Props {
    visible: boolean,
    mess?: string,
    onClose?: () => void
}

const LoadingModal = (props: Props) => {
    const { visible, onClose, mess } = props
    return (
        <Modal
            visible={visible}
         
            transparent
            statusBarTranslucent>

            <View style={[globalStyle.container, { backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems:'center', justifyContent:'center' }]}>
               
                <ActivityIndicator color={appColors.white} size={32}/>
                <TextComponent text='Loading' color={appColors.white}/>
            </View>
        </Modal>
    )
}

export default LoadingModal