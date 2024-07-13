import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = () => {
  console.log('đang Home')
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor:'green', height: '100%'}}>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={()=>{AsyncStorage.clear(); console.log('da clear')}}>
        <Text>cc</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen