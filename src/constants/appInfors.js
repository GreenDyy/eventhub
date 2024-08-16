import { Dimensions } from "react-native";

export const appInfors = {
    sizes: {
        WIDTH: Dimensions.get('window').width,
        HEIGHT: Dimensions.get('window').height,
    },
    BASE_URL: process.env.BASE_URL,
    GOOGLE_MAPS_API_KEY: process.env.MAPS_API_KEY,

}   