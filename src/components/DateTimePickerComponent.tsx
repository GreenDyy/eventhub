import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-native-date-picker'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
import { ArrowDown2, Calendar, Clock } from 'iconsax-react-native'
import { appColors } from '../constants/appColors'
import { globalStyle } from '../styles/globalStyle'
import { appFonts } from '../constants/appFonts'
import { getDate, getTime } from '../utils/utils'

interface Props {
    label?: string
    selected: Date
    type: 'date' | 'time' | 'datetime'
    onSelect: (val: Date) => void
}

const DateTimePickerComponent = (props: Props) => {
    const { label, selected, type, onSelect } = props
    const [isShowDatePicker, setIsShowDatePicker] = useState(false)
    const [date, setDate] = useState(new Date())

    return (
        <View style={{ flex: 1 }}>
            {label && (
                <TextComponent text={label} style={{ marginBottom: 8 }} />
            )}
            <RowComponent
                style={{
                    flexDirection: 'row',
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: appColors.gray2,
                    width: '100%',
                    minHeight: 56,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: appColors.white,
                    padding: 8,
                    // marginBottom: 20,
                }}
                onPress={() => { setIsShowDatePicker(true) }}>
                <TextComponent
                    text={selected ? (type === 'time' ? getTime(selected) : getDate(selected)) : 'Chọn ngày'}
                    style={{ textAlign: 'center' }}
                    flex={1}
                    fontFamily={appFonts.airBnBMedium} />
                {type === 'time' ?
                    <Clock size={22} color={appColors.gray} /> :
                    <Calendar size={22} color={appColors.gray} />}
            </RowComponent>

            {/* này như modal z */}
            <DatePicker
                modal
                mode={type}
                open={isShowDatePicker}
                date={date}
                onConfirm={(curDate) => {
                    setIsShowDatePicker(false)
                    setDate(curDate)
                    onSelect(curDate)
                }}
                onCancel={() => {
                    setIsShowDatePicker(false)
                }}
            />
        </View>
    )
}

export default DateTimePickerComponent