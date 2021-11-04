import { COLORS, FONTS, SIZES, windowHeight } from "../../constants/themes";

export default {
    input:{
        width:"80%",
        borderBottomWidth:1.5,
        borderColor:COLORS.secondary,
        marginBottom:"5%",
        fontSize:SIZES.paragraph,
        color:COLORS.secondary,
        fontFamily:FONTS.normal,
        fontWeight:"bold"
    },
    containerButtons:{
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        bottom:windowHeight * 0.1,
    }
}