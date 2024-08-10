import { View, Text, TouchableOpacity, StatusBar, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, removeAuth } from '../../srcRedux/reducers/authReducer'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { LoginManager } from 'react-native-fbsdk-next'
import { globalStyle } from '../../styles/globalStyle'
import { appColors } from '../../constants/appColors'
import { CircleComponent, RowComponent, SpaceComponent, TextComponent } from '../../components'
import { HambergerMenu, Notification, SearchNormal1, Sort } from 'iconsax-react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { appFonts } from '../../constants/appFonts'

const HomeScreen = ({ navigation }) => {
  const [isFilter, setIsFilter] = useState(false)

  const dispatch = useDispatch()
  const auth = useSelector(authSelector)

  return (
    <View style={[globalStyle.container]}>
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
          <View style={[{ flex: 1, alignItems: 'center' }]}>
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
            onPress={() => { Alert.alert('Thông báo here') }}>
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

        <SpaceComponent height={24} />

        {/* thanh search */}
        <RowComponent>
          <RowComponent
            style={{ flex: 1 }}
            onPress={() =>
              navigation.navigate('SearchEvent', {
                isFilter: false,
              })
            }
          >
            <SearchNormal1
              variant="TwoTone"
              size={22}
              color={appColors.white}
            />
            <View
              style={{
                width: 1,
                height: 18,
                marginHorizontal: 12,
                backgroundColor: '#A29EF0',
              }}
            />
            <TextComponent text="Search..." color={`#A29EF0`}  />
          </RowComponent>

          {/* nút fillter */}
          <RowComponent
            onPress={() =>
              navigation.navigate('SearchEvent', {
                isFilter: true,
              })
            }
            style={{
              backgroundColor: '#5D56F3',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 100,
            }}>
            <CircleComponent size={19.3} color={`#A29EF0`}>
              <Sort size={12} color={appColors.primary} />
            </CircleComponent>
            <SpaceComponent width={8} />
            <TextComponent text="Filters" color={appColors.white} />
          </RowComponent>

        </RowComponent>

      </View>

      <View style={{ flex: 1 }}>

      </View>
    </View>
  )
}

export default HomeScreen