import { Dimensions } from "react-native"
let LogoPrimary = require("../assets/images/logo_primary.png")
let LogoSecondary = require("../assets/images/logo_secondary.png")
let backgroundBanner = require("../assets/images/backgroundBanner.jpg")

export const COLORS = {
    primary:"royalblue",
    strongPrimary:"#C7444B", //Change this to a darker royal blue version
    secondary:"#FAFAFA",
    warning:"#FCC107",
    danger:"#DC3545",
    success:"#28A745",
    gray:"#6C757D",
}

export const FONTS = {
    normal: "Poppins",
    light:"Poppins-Light",
    bold:"Poppins-Bold"
}

export const SIZES = {
    title:30,
    h1:25,
    h2:20,
    paragraph:18
}



export const Images = {
    LogoPrimary,
    LogoSecondary,
    backgroundBanner
}



export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;