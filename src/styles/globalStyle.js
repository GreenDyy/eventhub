import { StyleSheet } from "react-native";
import { appColors } from "../constants/appColors";
import { appFonts } from "../constants/appFonts";

export const globalStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.white,
    },

    text: {
        fontFamily: appFonts.airBnBRegular,
        fontSize: 14,
        color: appColors.text
    },

    button: {
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appColors.white,
        paddingHorizontal: 16,
        paddingVertical: 16,
        minHeight: 56
    }
})