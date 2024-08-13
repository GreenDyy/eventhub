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
        minHeight: 56,
        flexDirection: 'row'
    },

    shadow: {
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8
    },

    section: {
        paddingHorizontal: 16,
        paddingBottom: 20
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    iconContainer: {
        borderRadius: 999,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appColors.green1
    },

    tag: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 999,
        backgroundColor: appColors.white
    },

    card: {
        padding: 12,
        borderRadius: 12,
        backgroundColor: appColors.white,
        margin: 12,
      },

})