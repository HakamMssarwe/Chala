import { COLORS, FONTS, SIZES, windowHeight } from "../../constants/themes";

export default {

    //Global CSS
    input:{
        width:"80%",
        borderBottomWidth:1.5,
        borderColor:COLORS.secondary,
        marginTop:"5%",
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
    },


    //VerifyCode CSS
    inputCellsContainer:{
    width:"80%",
    height:50,
    marginBottom:10,
    marginTop:20,
    alignSelf:"center",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",

    },
    inputCell:
    {
    width:"15%",
    height:"100%",
    backgroundColor:"white",
    color:COLORS.primary,
    textAlign:"center",
    fontSize:20,
    fontWeight:"bold",
    borderRadius:5
    }




}