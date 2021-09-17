import { COLORS, FONTS, SIZES, windowHeight } from "../../constants/themes";

export default {

    loginMenuContainer:{
        width:"100%",
        height:windowHeight * 0.2,
        justifyContent:"center",
        alignItems:"center",
        marginTop:"10%"

    },
    signupMenuContainer:{
        width:"100%",
        height:windowHeight * 0.2,
        justifyContent:"center",
        alignItems:"center",
        marginTop:"30%"
    },

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