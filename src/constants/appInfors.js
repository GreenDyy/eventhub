import { Dimensions } from "react-native";

export const appInfors = {
    sizes: {
        WIDTH: Dimensions.get('window').width,
        HEIGHT: Dimensions.get('window').height,
    },
    // BASE_URL: 'http://192.168.1.20:3001'
    BASE_URL: process.env.BASE_URL

    //tuỳ máy sẽ phải thay đổi
}   