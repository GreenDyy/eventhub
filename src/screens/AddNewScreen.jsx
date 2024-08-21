import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ButtonComponent, ChoiceLocationComponent, ContainerComponent, DateTimePickerComponent, DropDownPickerComponent, ImagePickerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../components'
import { authSelector } from '../srcRedux/reducers/authReducer'
import userAPI from '../apis/userApi'
import { Alert } from 'react-native'

const initEvent = {
  title: '',
  description: '',
  location: {
    title: '',
    address: ''
  },
  imageUrl: '',
  users: [],
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
  price: ''
}

const AddNewScreen = () => {
  const user = useSelector(authSelector)
  const [eventData, setEventData] = useState({ ...initEvent, authorId: user.id })
  const [usersSelected, setUsersSelected] = useState([])

  //de coi console.log thoi, xog xoá nha
  useEffect(() => {
    console.log(eventData)
  }, [eventData])

  useEffect(() => {
    handleGetAllUsers()
  }, [])

  const handleGetAllUsers = async () => {
    const api = '/get-all'
    try {
      const res = await userAPI.handleUser(api)
      if (res) {
        let items = []
        res.data.forEach(item => {
          items.push({
            username: item.username,
            email: item.email,
            photo: item.photo,
            value: item.id
          })
        });
        setUsersSelected(items)
      }
    }
    catch (e) {
      console.error(e)
    }
  }

  const changeValue = (key, value) => {
    let temp = { ...eventData }
    temp[key] = value
    setEventData(temp)
  }
  const handleAddEvent = async () => {
    const res = await userAPI.handleUser('/get-all')
    changeValue('user', res.data)
  }

  const handleUpLoadImage = () => {
    Alert.alert('oke bro')
  }

  return (
    <ContainerComponent
      title='Add new event'

      back
      isScroll>
      <SectionComponent>
        <TextComponent text='Add new event' isTitle />
      </SectionComponent>
      <SectionComponent>
       <ImagePickerComponent />
        <SpaceComponent height={20} />
        <InputComponent
          value={eventData.title}
          onChangeText={(val) => { changeValue('title', val) }}
          placeholder='Title'
          allowClear
        />
        <SpaceComponent height={20} />
        <InputComponent
          value={eventData.description}
          onChangeText={(val) => { changeValue('description', val) }}
          placeholder='Description'
          allowClear
          numberOfLines={3}
        />
        <SpaceComponent height={20} />
        <InputComponent
          value={eventData.location.title}
          onChangeText={(val) => { changeValue('location', { ...eventData.location, title: val }) }}
          placeholder='Title Address'
          allowClear

        />
        <SpaceComponent height={20} />
        <InputComponent
          value={eventData.price}
          onChangeText={(val) => { changeValue('price', val) }}
          placeholder='Price'
          allowClear
          keyboardType='number-pad'

        />
      </SectionComponent>

      <SectionComponent>
        <RowComponent >
          <DateTimePickerComponent
            username='Start at:'
            type='time'
            onSelect={(val) => { changeValue('startAt', val) }}
            selected={eventData.startAt}
          />
          <SpaceComponent width={20} />
          <DateTimePickerComponent
            username='End at:'
            type='time'
            onSelect={(val) => { changeValue('endAt', val) }}
            selected={eventData.endAt}
          />
        </RowComponent>

      </SectionComponent>

      <SectionComponent>
        <DateTimePickerComponent
          username='Date at:'
          type='date'
          onSelect={(val) => { changeValue('date', val) }}
          selected={eventData.date}
        />
      </SectionComponent>

      <SectionComponent>
        <DropDownPickerComponent
          username='Invited guest'
          values={usersSelected}
          onSelect={(val) => {
            changeValue('users', val)
            console.log('val', val)
          }}
          selected={eventData.users}
          multible
        />
      </SectionComponent>

      <SectionComponent>
        <ChoiceLocationComponent />
      </SectionComponent>

      <SectionComponent>
        <ButtonComponent text='Add new' onPress={handleAddEvent} />
      </SectionComponent>

    </ContainerComponent>
  )
}

export default AddNewScreen