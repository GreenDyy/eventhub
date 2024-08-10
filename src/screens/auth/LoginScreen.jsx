import { Lock, Sms } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Switch } from 'react-native';
import authenticationAPI from '../../apis/authApis';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent
} from '../../components';
import { appColors } from '../../constants/appColors';
import { appFonts } from '../../constants/appFonts';
import { images } from '../../constants/images';
import { LoadingModal } from '../../modals';
import { Validate } from '../../utils/validate';
import SocialLogin from './components/SocialLogin';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../srcRedux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initRrrorMessProfile = {
  messEmail: '',
  messPassword: '',
}

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('duyxanh2002@gmail.com');
  const [password, setPassword] = useState('162265');
  const [isRemember, setIsRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessProfile, setErrorMessProfile] = useState(initRrrorMessProfile)
  const [isFormValid, setIsFormValid] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => {
    const getStoredData = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        const rememberValue = await AsyncStorage.getItem('remember');

        if (rememberValue !== null) {
          setIsRemember(JSON.parse(rememberValue));
        }
        if (storedEmail && JSON.parse(rememberValue)) {
          setEmail(storedEmail);
        }
      } catch (error) {
        console.error('Failed to retrieve data:', error);
      }
    };

    getStoredData();
  }, []);

  useEffect(() => {
    if (email && password && !errorMessProfile.messEmail && !errorMessProfile.messPassword) {
      setIsFormValid(true)
    }
    else {
      setIsFormValid(false)
    }
  }, [email, password, errorMessProfile])

  const validateForm = (key) => {
    let tempData = { ...errorMessProfile }
    switch (key) {

      case 'email':
        if (!email) {
          tempData['messEmail'] = 'Vui lòng nhập email'
        }
        else if (!Validate.Email(email)) {
          tempData['messEmail'] = 'Email không đúng dịnh dạng'
        }
        else {
          tempData['messEmail'] = ''
        }
        break

      case 'password':
        if (!password) {
          tempData['messPassword'] = 'Vui lòng nhập mật khẩu'
        }
        // else if (!Validate.Password(password)) {
        //   tempData['messPassword'] = 'Mật khẩu không đúng dịnh dạng'
        // }
        else {
          tempData['messPassword'] = ''
        }
        break

      default:
        break
    }
    setErrorMessProfile(tempData)
  }

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await authenticationAPI.handleAuthentication('/login', { email, password }, 'post');
      setIsLoading(false);
      console.log('login ne: ', res.data)
      dispatch(addAuth(res.data));

      await AsyncStorage.setItem('auth', JSON.stringify(res.data));
      await AsyncStorage.setItem('remember', JSON.stringify(isRemember));
      if (isRemember) {

        await AsyncStorage.setItem('email', email);
      }
    }
    catch {
      setIsLoading(false);
      Alert.alert('Thông báo', 'Tài khoản hoặc mật khẩu không chính xác');
    }
  };

  const handleChangeRemember = async () => {
    setIsRemember(!isRemember);
    if (isRemember) {
      await AsyncStorage.removeItem('email');
    } else {
      await AsyncStorage.setItem('email', email);
    }
    await AsyncStorage.setItem('remember', JSON.stringify(!isRemember));
  };

  return (
    <ContainerComponent isScroll={true} isImageBackground={true}>
      <SpaceComponent height={50} />
      <SectionComponent style={{ justifyContent: 'center', alignItem: 'center' }}>
        <Image source={images.logologin} style={{ width: 162, height: 114, alignSelf: 'center' }} resizeMode='contain' />
      </SectionComponent>

      <SectionComponent>
        <TextComponent text={'Sign in'} fontSize={24} isTitle={true} />
        <SpaceComponent height={21} />
        <TextComponent text={errorMessProfile.messEmail} color={appColors.danger} style={{ marginVertical: 5 }} />
        <InputComponent
          value={email}
          placeholder="Email"
          onChangeText={preText => setEmail(preText)}
          affix={<Sms size={22} color={appColors.green2} />}
          allowClear
          keyboardType={'email-address'}
          onEndEditing={() => validateForm('email')}
        />

        {/* <SpaceComponent height={20} /> */}

        <TextComponent text={errorMessProfile.messPassword} color={appColors.danger} style={{ marginVertical: 5 }} />
        <InputComponent
          value={password}
          placeholder="Password"
          onChangeText={preText => setPassword(preText)}
          affix={<Lock size={22} color={appColors.green2} />}
          allowClear
          isPassword
          onEndEditing={() => validateForm('password')}
        />

        <RowComponent style={{ justifyContent: 'space-between' }}>
          <RowComponent onPress={handleChangeRemember}>
            <Switch
              value={isRemember}
              onValueChange={handleChangeRemember}
              thumbColor={appColors.white}
              trackColor={{ true: appColors.link }} />
            <TextComponent text='Remember Me' fontFamily={appFonts.airBnBRegular} color='black' />
          </RowComponent>

          <ButtonComponent text='Forgot Password?' type='text' color='black' onPress={() => navigation.navigate('ForgotPasswordScreen')} />
        </RowComponent>
      </SectionComponent>

      <SpaceComponent height={16} />

      <SectionComponent>
        <ButtonComponent text='SIGN IN' type='primary' onPress={handleLogin} disable={!isFormValid} />
      </SectionComponent>

      <SocialLogin />

      <SectionComponent>
        <RowComponent style={{ justifyContent: 'center' }}>
          <TextComponent text='Already have an account? ' />
          <ButtonComponent text='Sign up' type='link' onPress={() => navigation.navigate('SignUpScreen')} />
        </RowComponent>
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default LoginScreen;
