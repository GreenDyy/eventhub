import React, { useEffect, useState } from 'react'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { addAuth, authSelector } from '../srcRedux/reducers/authReducer'
import AuthNavigator from './AuthNavigator'
import MainNavigator from './MainNavigator'
import SplashScreen from '../screens/SplashScreen'

const AppRouter = () => {
    const { getItem } = useAsyncStorage('auth')

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
        const res = await getItem()
        res && dispatch(addAuth(JSON.parse(res)))
    }

    return (
        <>
            {isShowSplash ? <SplashScreen /> : (auth.accessToken ? <MainNavigator /> : <AuthNavigator />)}
        </>
    )
}

export default AppRouter