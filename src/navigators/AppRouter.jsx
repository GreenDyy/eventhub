import React, { useEffect, useState } from 'react'
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { addAuth, authSelector } from '../srcRedux/reducers/authReducer'
import AuthNavigator from './AuthNavigator'
import MainNavigator from './MainNavigator'
import SplashScreen from '../screens/SplashScreen'

const AppRouter = () => {
    //trong router này. nó sẽ checkGogin, là dò auth trong AsynsStoreage xem có ko rồi mới gán data vào redux, từ redux đó mới lấy accessToken để quyết đính sẽ đến router nào
    const [isShowSplash, setIsShowSplash] = useState(true)
    const dispatch = useDispatch()
    const auth = useSelector(authSelector)

    console.log(auth)

    useEffect(() => {
        checkLogin()
        const timeout = setTimeout(() => {
            setIsShowSplash(false)
        }, 1500)

        return () => { clearTimeout(timeout) }
    }, [])

    const checkLogin = async () => {
        try {
            console.log('Đang check login');
            const res = await AsyncStorage.getItem('auth');

            if (res) {
                try {
                    const parsedRes = JSON.parse(res);
                    dispatch(addAuth(parsedRes));
                } catch (e) {
                    console.log(res)
                    console.error('Không thể parse JSON:', e);
                }
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra đăng nhập:', error);
        }
    }

    return (
        <>
            {/* dùng chính */}
            {isShowSplash ? <SplashScreen /> : (auth.accessToken ? <MainNavigator /> : <AuthNavigator />)}
            {/* test mốt xoá, xoá thì mở lại cái trên */}
            {/* {isShowSplash ? <SplashScreen /> : (auth.accessToken ? <MainNavigator /> : <AuthNavigator />)} */}
        </>
    )
}

export default AppRouter