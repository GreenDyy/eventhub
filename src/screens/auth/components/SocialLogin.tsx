import React, { useState } from 'react'
import { ButtonComponent, SectionComponent, SpaceComponent, TextComponent } from '../../../components'
import { appColors } from '../../../constants/appColors'
import { appFonts } from '../../../constants/appFonts'
import { Facebook, Google } from '../../../assets/svgs'
import { Alert } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import authenticationAPI from '../../../apis/authApis'
import { Profile, LoginManager, Settings } from 'react-native-fbsdk-next'
import { useDispatch } from 'react-redux'
import { addAuth } from '../../../srcRedux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoadingModal } from '../../../modals'

GoogleSignin.configure({
    // webClientId: '165452714649-nq15b8vbecas7rd7mfm4du3k85t80u8b.apps.googleusercontent.com'
})
Settings.setAppID('882194853726940')
const SocialLogin = () => {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch()

    const handleLoginWithGoogle = async () => {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

        try {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn();
            console.log('thông tin google này sẽ dc gửi qua BE: ', userInfo.user);

            const newUser = {
                username: userInfo.user.name,
                email: userInfo.user.email,
                photo: userInfo.user.photo,
                //thông tin khác nếu cần
            }
            const res = await authenticationAPI.handleAuthentication('/googleSignin', newUser, 'post')
            console.log(res);
            await AsyncStorage.setItem('auth', JSON.stringify(res.data))
            dispatch(addAuth(res.data))
            setIsLoading(false)
        } catch (error) {
            // console.error(error);
            // Alert.alert('Error', 'Google Sign-In failed. Please try again.');
            
            setIsLoading(false)
        }
    };

    const handleLoginWithFacebook = async () => {
        // setIsLoading(true)
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile'])
            if (result.isCancelled) {
                console.log("Login cancelled");
            }
            else {
                const currentProfile = await Profile.getCurrentProfile()
                if (currentProfile) {
                    const newUser = {
                        username: currentProfile.name,
                        email: currentProfile.userID,
                        photo: currentProfile.imageURL,
                    }

                    const res = await authenticationAPI.handleAuthentication('/googleSignin', newUser, 'post')
                    await AsyncStorage.setItem('auth', JSON.stringify(res.data))
                    dispatch(addAuth(res.data))
                    console.log('data login fb:', res)
                }
            }
            setIsLoading(false)
        }
        catch {
            setIsLoading(false)
        }
    }

    return (
        <SectionComponent>
            <TextComponent
                text='OR' color={appColors.gray}
                fontSize={16} style={{ textAlign: 'center' }}
                fontFamily={appFonts.airBnBMedium} />

            <SpaceComponent height={16} />

            <ButtonComponent
                type='primary'
                text='Login with Google'
                color={appColors.text}
                icon={<Google />}
                backgroundColor={appColors.white}
                fontFamily={appFonts.airBnBRegular}
                iconFlex='left'
                onPress={handleLoginWithGoogle}
            />

            <ButtonComponent
                type='primary'
                text='Login with Facebook'
                color={appColors.text}
                icon={<Facebook />}
                backgroundColor={appColors.white}
                fontFamily={appFonts.airBnBRegular}
                iconFlex='left'
                onPress={handleLoginWithFacebook}
            />
            <LoadingModal visible={isLoading} />
        </SectionComponent>
    )
}

export default SocialLogin