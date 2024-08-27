import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ButtonComponent, ChoiceLocationComponent, ContainerComponent, DateTimePickerComponent, DropDownPickerComponent, ImagePickerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../components'
import { authSelector } from '../srcRedux/reducers/authReducer'
import userAPI from '../apis/userApi'
import { Alert, Image } from 'react-native'
import { appColors } from '../constants/appColors'
import { showMessage, hideMessage } from "react-native-flash-message";

const initEvent = {
  title: '',
  category: '',
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
    // console.log(eventData)
  }, [eventData])

  useEffect(() => {
    // data này dùng cho DropDownUser nha
    handleGetAllUsers()
    console.log('có ko:', usersSelected)
  }, [])


  const handleGetAllUsers = async () => {
    const api = '/get-all'
    try {
      const res = await userAPI.handleUser(api)
      if (res) {
        let items = []
        res.data.forEach(item => {
          items.push({

            label: item.username,
            value: {
              id: item.id,
              username: item.username,
              email: item.email,
              photo: item.photo,
            }
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
    if (eventData.title && eventData.category && eventData.location.title && eventData.location.address && eventData.price) {
      showMessage({
        message: "Thành công",
        description: "This is our second message",
        type: "success",
      });
    }
    else {
      const missingFields = [];
      if (!eventData.title) {
        missingFields.push('Title')
      }
      if (!eventData.category) {
        missingFields.push('Category')
      }
      if (!eventData.location.title) {
        missingFields.push('Title Location')
      }
      if (!eventData.location.address) {
        missingFields.push('Address')
      }
      if (!eventData.price) {
        missingFields.push('Price')
      }

      showMessage({
        message: "Thông báo",
        description: `Vui lòng nhập đầy đủ thông tin thông tin sau: ${missingFields.join(', ')}`,
        type: "danger",
      });
    }
  }

  const handleImageSelected = (val) => {
    // mục tiêu cuối củng là cho ảnh thành 1 url và load nó thoi
    changeValue('imageUrl', val.path)
    console.log('đây là file hình: ', val.path)
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
        {/* vùng show ảnh */}
        {
          eventData.imageUrl && (
            <Image
              source={{ uri: eventData.imageUrl }}
              style={{ width: '100%', height: 250 }} />)
        }

        <SpaceComponent height={12} />

        <ImagePickerComponent onSelect={(val) => {
          val.type === 'url'
            ? changeValue('imageUrl', val.value)
            : handleImageSelected(val.value)
        }} />

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

        <DropDownPickerComponent
          values={[
            {
              label: 'Sport',
              value: 'sport',
            },
            {
              label: 'Food',
              value: 'Food',
            },
            {
              label: 'Art',
              value: 'art',
            },
            {
              label: 'Music',
              value: 'music',
            },
            {
              label: 'Game',
              value: 'game',
            },
          ]}
          onSelect={(val) => {
            changeValue('category', val)
          }}
          selected={eventData.category}
          type='withoutImage'
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
          title='Invited guest'
          values={usersSelected}
          onSelect={(val) => {
            changeValue('users', val)
          }}
          selected={eventData.users}
          multible
          type='withImage'
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