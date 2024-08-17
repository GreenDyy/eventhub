import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ButtonComponent, ChoiceLocationComponent, ContainerComponent, InputComponent, SectionComponent, SpaceComponent, TextComponent } from '../components'
import { authSelector } from '../srcRedux/reducers/authReducer'

const initEvent = {
  title: '',
  description: '',
  location: {
    title: '',
    address: ''
  },
  imageUrl: '',
  user: [],
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
}

const AddNewScreen = () => {
  const user = useSelector(authSelector)
  const [eventData, setEventData] = useState({ ...initEvent, authorId: user.id })


  useEffect(() => {
    console.log(eventData)
  }, [eventData])


  const changeValue = (key, value) => {
    let temp = { ...eventData }
    temp[key] = value
    setEventData(temp)
  }
  const handleAddEvent = async () => {
    console.log(eventData)
  }

  return (
    <ContainerComponent
      isScroll>
      <SectionComponent>
        <TextComponent text='Add new event' isTitle />
      </SectionComponent>
      <SectionComponent>
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
          onChangeText={(val) => { changeValue('location', {...eventData.location, title: val}) }}
          placeholder='Title Address'
          allowClear
          numberOfLines={3}
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