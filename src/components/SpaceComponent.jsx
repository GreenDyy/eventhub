import { View, Text } from 'react-native'
import React from 'react'

const SpaceComponent = (props) => {
    const { height, width } = props
    return (
        <View style={{ height: height, width: width }} />
    )
}

export default SpaceComponent