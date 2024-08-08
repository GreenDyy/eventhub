import { View, Text, TouchableOpacity, StatusBar, Platform, Alert } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, removeAuth } from '../../srcRedux/reducers/authReducer'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { LoginManager } from 'react-native-fbsdk-next'
import { globalStyle } from '../../styles/globalStyle'
import { appColors } from '../../constants/appColors'
import { CircleComponent, RowComponent, TextComponent } from '../../components'
import { HambergerMenu, Notification } from 'iconsax-react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { appFonts } from '../../constants/appFonts'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const auth = useSelector(authSelector)
  console.log('đang Home')

  const handleLogout = async () => {
    dispatch(removeAuth({}))
    await AsyncStorage.removeItem('auth')
    await GoogleSignin.signOut()
    LoginManager.logOut()
  }

  return (
    <View style={[globalStyle.container]}>
      {/* <Text>{auth?.email}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity> */}
      <StatusBar barStyle={'light-content'} />
      <View style={{
        backgroundColor: appColors.primary,
        height: 170,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
        paddingHorizontal: 16
      }}>
        <RowComponent>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <HambergerMenu size={24} color={appColors.white} />
            </TouchableOpacity>
            <View style={[{flex: 1, alignItems: 'center'}]}>
              <RowComponent>
                <TextComponent
                  text="Current Location"
                  color={appColors.white2}
                  size={12}
                />
                <MaterialIcons
                  name="arrow-drop-down"
                  size={18}
                  color={appColors.white}
                />
              </RowComponent>
              <TextComponent
                text="New York, USA"
                flex={0}
                color={appColors.white}
                font={appFonts.airBnBMedium}
                size={13}
              />
            </View>

            <CircleComponent 
            color="#524CE0" 
            size={36}
            onPress={()=>{Alert.alert('Thông báo here')}}>
              <View>
                <Notification size={18} color={appColors.white} />
                <View
                  style={{
                    backgroundColor: '#02E9FE',
                    width: 10,
                    height: 10,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: '#524CE0',
                    position: 'absolute',
                    top: -2,
                    right: -2,
                  }}
                />
              </View>
            </CircleComponent>
          </RowComponent>

      </View>

      <View style={{ flex: 1 }}>

      </View>
    </View>
  )
}

export default HomeScreen