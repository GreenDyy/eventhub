import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AddSquare } from 'iconsax-react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { CircleComponent, TextComponent } from '../components'
import { appColors } from '../constants/appColors'
import { AddNewScreen } from '../screens'
import { globalStyle } from '../styles/globalStyle'
import EventNavigator from './EventNavigator'
import ExplorerNavigator from './ExplorerNavigator'
import MapNavigator from './MapNavigator'
import ProfileNavigator from './ProfileNavigator'
import { appFonts } from '../constants/appFonts'


const TabNavigator = () => {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    height: 68,
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let icon
                    size = 22
                    color = focused ? appColors.green1 : appColors.gray3
                    switch (route.name) {
                        case 'Explorer':
                            // icon = <Home size={size} color={color} />
                            icon = <FontAwesome5 name={'compass'} size={size} color={color} />
                            break
                        case 'Event':
                            icon = <MaterialCommunityIcons name={'calendar-month'} size={size} color={color} />
                            break
                        case 'Add':
                            icon = (
                                <CircleComponent
                                    size={52}
                                    styles={[{ marginTop: -60 }, globalStyle.shadow]}
                                >
                                    <AddSquare size={22} color={appColors.white} variant='Bold' />
                                </CircleComponent>
                            )
                            break
                        case 'Map':
                            icon = <FontAwesome5 name='map-marker-alt' size={size} color={color} />
                            break
                        case 'Profile':
                            icon = <FontAwesome5 name='user-tie' size={size} color={color} />
                            break
                        default:
                            break
                    }
                    return icon
                },
                tabBarIconStyle: {
                    marginBottom: 0,
                    marginTop: 12
                },
                tabBarLabel: ({ focused }) => {
                    return route.name !== 'Add' && (
                        <TextComponent
                            text={route.name}
                            color={focused ? appColors.green1 : appColors.gray3}
                            fontSize={12}
                            fontFamily={appFonts.airBnBMedium}
                            style={{
                                marginBottom: 10
                            }}
                        />
                    )
                },

            })}>
            <Tab.Screen name='Explorer' component={ExplorerNavigator} />
            <Tab.Screen name='Event' component={EventNavigator} />
            <Tab.Screen name='Add' component={AddNewScreen} />
            <Tab.Screen name='Map' component={MapNavigator} />
            <Tab.Screen name='Profile' component={ProfileNavigator} />
        </Tab.Navigator>
    )
}

export default TabNavigator