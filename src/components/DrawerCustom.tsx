import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar, Image, FlatList } from 'react-native'
import React from 'react'
import TextComponent from './TextComponent'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, removeAuth } from '../srcRedux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { LoginManager } from 'react-native-fbsdk-next'
import RowComponent from './RowComponent'
import { globalStyle } from '../styles/globalStyle'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SpaceComponent from './SpaceComponent'
import { appColors } from '../constants/appColors'
import { Bookmark2, Calendar, Logout, Message2, MessageQuestion, Setting2, Sms, User } from 'iconsax-react-native'

const DrawerCustom = ({ navigation }: any) => {
    const user = useSelector(authSelector)
    const dispatch = useDispatch()

    const size = 20;
    const color = appColors.gray;
    const drawerMenu = [
        {
            key: 'MyProfile',
            title: 'My Profile',
            icon: <User size={size} color={color} />,
        },
        {
            key: 'Message',
            title: 'Message',
            icon: <Message2 size={size} color={color} />,
        },
        {
            key: 'Calendar',
            title: 'Calendar',
            icon: <Calendar size={size} color={color} />,
        },
        {
            key: 'Bookmark',
            title: 'Bookmark',
            icon: <Bookmark2 size={size} color={color} />,
        },
        {
            key: 'ContactUs',
            title: 'Contact Us',
            icon: <Sms size={size} color={color} />,
        },
        {
            key: 'Settings',
            title: 'Settings',
            icon: <Setting2 size={size} color={color} />,
        },
        {
            key: 'HelpAndFAQs',
            title: 'Help & FAQs',
            icon: <MessageQuestion size={size} color={color} />,
        },
        {
            key: 'SignOut',
            title: 'Sign Out',
            icon: <Logout size={size} color={color} />,
        },
    ];


    const handleLogout = async () => {
        dispatch(removeAuth())
        await AsyncStorage.removeItem('auth')
        await GoogleSignin.signOut()
        LoginManager.logOut()
    }

    const handleNavigationToProfile = () => {
        navigation.closeDrawer()
        navigation.navigate('Profile')
    }

    return (
        <View style={[localStyles.container]}>
            {/* avatar */}
            <TouchableOpacity onPress={handleNavigationToProfile}>
                {
                    !user?.photo ? (
                        <Image source={{ uri: user.photo }} style={[localStyles.avatar]} resizeMode='contain' />
                    ) : (
                        <View style={[localStyles.avatar, { backgroundColor: appColors.gray }]}>
                            <TextComponent
                                text={user?.username ?
                                    user.username.split(' ')
                                    [user.username.split(' ').length - 1].substring(0, 1)
                                    : ''
                                }
                                fontSize={22}
                                isTitle
                                color={appColors.white} />
                        </View>
                    )
                }
                <TextComponent text={user?.username} isTitle fontSize={18} />
            </TouchableOpacity>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={drawerMenu}
                style={{ flex: 1, marginVertical: 20 }}
                renderItem={({ item, index }) => (
                    <RowComponent
                        style={[localStyles.listItem]}
                        onPress={
                            item.key === 'SignOut'
                                ? () => handleLogout()
                                : () => {
                                    console.log(item.key);
                                    navigation.closeDrawer();
                                }
                        }>
                        {item.icon}
                        <TextComponent
                            text={item.title}
                            style={localStyles.listItemText}
                        />
                    </RowComponent>
                )}
            />

            <RowComponent style={{ justifyContent: 'flex-start' }}>
                <TouchableOpacity style={[globalStyle.button, { backgroundColor: '#00F8FF33', height: 'auto' }]}>
                    <MaterialCommunityIcons name='crown' size={22} color={'#00F8FF'} />
                    <SpaceComponent width={8} />
                    <TextComponent text='Upgrade Pro' color='#00F8FF' />
                </TouchableOpacity>
            </RowComponent>

            <TouchableOpacity onPress={handleLogout}>
                <Text>Logout</Text>
            </TouchableOpacity>

        </View>
    )
}

export default DrawerCustom

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingVertical: Platform.OS === 'android' ? StatusBar.currentHeight : 48,
    },

    avatar: {
        width: 52,
        height: 52,
        borderRadius: 100,
        marginBottom: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    listItem: {
        paddingVertical: 12,
        justifyContent: 'flex-start',
    },

    listItemText: {
        paddingLeft: 12,
    },
});