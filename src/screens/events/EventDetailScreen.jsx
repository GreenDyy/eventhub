import { View, Text } from 'react-native'
import React from 'react'

const EventDetailScreen = ({navigation, route}) => {
    const {item} = route.params
  return (
    <View>
      <Text>{item.title}</Text>
    </View>
  )
}

export default EventDetailScreen