import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import DrawerCustom from '../components/DrawerCustom'
import TabNavigator from './TabNavigator'

const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
    }}
    //  drawerContent={DrawerCustom}
    drawerContent={props => <DrawerCustom {...props}/>}
    >
        <Drawer.Screen name='Home' component={TabNavigator} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator