import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ButtonComponent, ChoiceLocationComponent, ContainerComponent, DateTimePickerComponent, DropDownPickerComponent, ImagePickerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../components'
import { authSelector } from '../srcRedux/reducers/authReducer'
import userAPI from '../apis/userApi'
import { Alert, Image } from 'react-native'
import { appColors } from '../constants/appColors'
import { showMessage, hideMessage } from "react-native-flash-message";
import storage from '@react-native-firebase/storage'
import eventAPI from '../apis/eventApi'
import { LoadingModal } from '../modals'

const initEvent = {
  title: '',
  category: '',
  description: '',
  locationTitle: '',
  locationAddress: '',
  position: {
    lat: '',
    long: '',
  },
  imageUrl: '',
  users: [],
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
  price: ''
}

const AddNewScreen = ({ navigation }) => {
  const user = useSelector(authSelector)
  const [eventData, setEventData] = useState({ ...initEvent, authorId: user.id })
  const [usersSelected, setUsersSelected] = useState([])
  const [imageSelected, setImageSeleted] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  //de coi console.log thoi, xog xoá nha
  useEffect(() => {
    console.log(eventData)
  }, [eventData])

  useEffect(() => {
    // data này dùng cho DropDownUser nha
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
    setIsLoading(true);
    
    if (eventData.title && eventData.category && eventData.locationTitle && eventData.locationAddress && eventData.price) {
        if (imageSelected) {
            try {
                const fileExtension = imageSelected.mime.split('/')[1]; // lấy phần đuôi tệp từ mime
                const fileName = `image-${imageSelected.modificationDate}.${fileExtension}`;
                const pathFireBase = `images/${fileName}`;
                
                // Upload file lên Firebase
                const uploadTask = storage().ref(pathFireBase).putFile(imageSelected.path);

                uploadTask.on('state_changed', (snapshot) => {
                    // Xử lý quá trình upload (có thể thêm thông báo tiến độ)
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                });

                await uploadTask;

                const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                console.log('image được lưu tại: ', downloadURL);
                changeValue('imageUrl', downloadURL);

                handlePushEvent({...eventData, imageUrl: downloadURL});
                
                showMessage({
                    message: "Thành công",
                    description: "Thêm sự kiện thành công",
                    type: "success",
                });

                navigation.goBack();
            } catch (error) {
                console.error('Error uploading image: ', error);
                showMessage({
                    message: "Lỗi",
                    description: "Đã xảy ra lỗi khi tải ảnh lên",
                    type: "danger",
                });
            }
        } else {
            handlePushEvent(eventData);
            showMessage({
                message: "Thành công",
                description: "Thêm sự kiện thành công",
                type: "success",
            });
            navigation.goBack();
        }
    } else {
        const missingFields = [];
        if (!eventData.title) missingFields.push('Title');
        if (!eventData.category) missingFields.push('Category');
        if (!eventData.locationTitle) missingFields.push('Title Location');
        if (!eventData.locationAddress) missingFields.push('Address');
        if (!eventData.price) missingFields.push('Price');

        showMessage({
            message: "Thông báo",
            description: `Vui lòng nhập đầy đủ thông tin sau: ${missingFields.join(', ')}`,
            type: "danger",
        });
    }

    setIsLoading(false);
};


  const handleLocation = (val) => {
    const items = { ...eventData };
    items.locationAddress = val.address;
    items.position = val.position;
    setEventData(items);
  };

  const handleImageSelected = (val) => {
    // mục tiêu cuối củng là cho ảnh thành 1 url và load nó thoi
    changeValue('imageUrl', val.path)
    setImageSeleted(val)
    console.log('đây là file hình: lấy dc ', val)
  }

  const handlePushEvent = async (event) => {
    console.log(event)
    const api = `/add-event`
    try {
      const res = await eventAPI.handleEvent(api, event, 'post')
      console.log(res)
    }
    catch (e) {
      console.log(e)
    }
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
          value={eventData.locationTitle}
          onChangeText={(val) => { changeValue('locationTitle', val) }}
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
        <ChoiceLocationComponent onSelect={val => handleLocation(val)} />
      </SectionComponent>

      <SectionComponent>
        <ButtonComponent text='Add new' onPress={handleAddEvent} />
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  )
}

export default AddNewScreen