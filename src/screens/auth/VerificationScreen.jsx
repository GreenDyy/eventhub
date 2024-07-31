import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import { appFonts } from '../../constants/appFonts'
import authenticationAPI from '../../apis/authApis'
import { LoadingModal } from '../../modals'
import { useDispatch } from 'react-redux'
import { ArrowRight } from 'iconsax-react-native'
import { globalStyle } from '../../styles/globalStyle'
import { formatTime } from '../../utils/utils'
import { addAuth } from '../../srcRedux/reducers/authReducer'

const VerificationScreen = ({ navigation, route }) => {
  const { code, email, password, username } = route.params
  const [isLoading, setIsLoading] = useState(false)
  const [currentCode, setCurrentCode] = useState(code)
  const [codeValues, setCodeValues] = useState([])
  const [stringCode, setStringCode] = useState('')
  const [limit, setLimit] = useState(120)
  const [errorMessage, setErrorMessage] = useState('')

  const ref1 = useRef()
  const ref2 = useRef()
  const ref3 = useRef()
  const ref4 = useRef()

  const dispatch = useDispatch()

  //mới vào thì focus vào ô đầu tiên liền
  useEffect(() => {
    ref1.current.focus()
  }, [])

  useEffect(() => {
    setStringCode(codeValues.join(''))
  }, [codeValues])

  useEffect(() => {
    const interval = setInterval(() => {
      setLimit(limit => limit > 0 ? limit - 1 : 0)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleChangeCode = (val, index) => {
    const tempData = [...codeValues]
    tempData[index] = val
    setCodeValues(tempData)
  }

  const handleVarification = async () => {
    // Nếu mã hết hạn, hiển thị thông báo lỗi và kết thúc hàm
    if (limit <= 0) {
      setErrorMessage('Code hết thời hạn, vui lòng ấn gửi lại');
      return;
    }

    // Nếu mã hợp lệ, tiến hành xác thực
    if (stringCode === currentCode.toString()) {
      setIsLoading(true);
      try {
        // Gửi yêu cầu đăng ký
        const res = await authenticationAPI.handleAuthentication('/register', { username, email, password }, 'post');
        dispatch(addAuth(res.data));
        await AsyncStorage.setItem('auth', JSON.stringify(res.data));
        setIsLoading(false); 
        setErrorMessage(''); 
      } catch (e) {
        // Xử lý lỗi nếu có
        // console.log(e);
        setErrorMessage('Email đã được sử dụng, vui lòng chọn email khác');
        setIsLoading(false); // Kết thúc trạng thái loading ngay cả khi có lỗi
      }
    } else {
      // Nếu mã không khớp, hiển thị thông báo lỗi
      setErrorMessage('Invalid code');
      console.log('stringCode:', stringCode);
      console.log('currentCode:', currentCode);
    }
  };


  const handleResendCode = async () => {
    const api = '/verification'
    setIsLoading(true)
    try {
      const res = await authenticationAPI.handleAuthentication(api, { email }, 'post')
      setCurrentCode(res.data.code)
      setLimit(120)
      setErrorMessage('')
      setIsLoading(false)
      setCodeValues([]); // Reset các ô nhập liệu
      ref1.current.focus()
      console.log(res)
    }
    catch (e) {
      setIsLoading(false)
      console.log(e)
    }
  }

  return (
    <ContainerComponent back isImageBackground isScroll>
      <SectionComponent>
        <TextComponent text='Verification' isTitle />
        <SpaceComponent height={12} />
        <TextComponent text={`We have send you the verification code on ****${email.slice(4)}`} />

        <SpaceComponent height={26} />

        <RowComponent style={{ justifyContent: 'space-around' }}>
          <TextInput
            value={codeValues[0]}
            placeholder="-"
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(val) => {
              handleChangeCode(val, 0)
              val && ref2.current.focus();
            }}
            ref={ref1}
          />
          <TextInput
            value={codeValues[1]}
            placeholder="-"
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(val) => {
              handleChangeCode(val, 1)
              val && ref3.current.focus();
            }}
            ref={ref2}
          />
          <TextInput
            value={codeValues[2]}
            placeholder="-"
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(val) => {
              handleChangeCode(val, 2)
              val && ref4.current.focus();
            }}
            ref={ref3}
          />
          <TextInput
            value={codeValues[3]}
            placeholder="-"
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(val) => {
              handleChangeCode(val, 3)
              val && console.log('Mã bạn nhập là: ', codeValues);
            }}
            ref={ref4}
          />
        </RowComponent>

      </SectionComponent>

      <SectionComponent style={{ marginTop: 40 }}>
        <ButtonComponent
          text='Continue'
          type='primary'
          onPress={handleVarification}
          disable={codeValues.length !== 4 || codeValues.some((val) => val === '')}
          icon={
            <View style={[globalStyle.iconContainer, { backgroundColor: codeValues.length !== 4 || codeValues.some((val) => val === '') ? appColors.gray : appColors.link }]}>
              <ArrowRight size={18} color={appColors.white} />
            </View>
          }
          iconFlex='right'
        />
      </SectionComponent>

      {errorMessage &&
        <SectionComponent>
          <TextComponent text={errorMessage} color={appColors.danger} style={{ textAlign: 'center' }} />
        </SectionComponent>
      }

      <SectionComponent>
        {limit > 0 ?
          <RowComponent style={{ justifyContent: 'center' }}>
            <TextComponent text='Re-send code in ' />
            <TextComponent text={formatTime(limit)} color={appColors.link} />
          </RowComponent>
          :
          <RowComponent style={{ justifyContent: 'center' }}>
            <ButtonComponent
              type='link'
              text='Resend code' flex={0}
              onPress={handleResendCode} />
          </RowComponent>
        }
      </SectionComponent>

      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  )
}

export default VerificationScreen

const styles = StyleSheet.create({
  input: {
    height: 55, width: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray2,
    fontSize: 24,
    fontFamily: appFonts.airBnBBold,
    textAlign: 'center',

  }
})