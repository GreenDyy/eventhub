import { View, Text } from 'react-native'
import React from 'react'
import { ButtonComponent } from '../../components'

const SearchEvent = ({navigation, route}) => {
    const {isFilter} = route.params
    console.log(isFilter)
  return (
    <View>
      <Text>SearchEvent</Text>
      <ButtonComponent text='goBack' onPress={()=>{navigation.goBack()}}/>
    </View>
  )
}

export default SearchEvent