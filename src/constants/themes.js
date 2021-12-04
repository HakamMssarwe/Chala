import { Dimensions } from "react-native"
let LogoSecondary = require("../assets/images/logo_secondary.png")
let backgroundBanner = require("../assets/images/backgroundBanner.jpg")
let schedule = require("../assets/images/HomeBanners/Schedule.png")
let routine = require("../assets/images/HomeBanners/Routine.png")
let event = require("../assets/images/HomeBanners/Events.png")
let task = require("../assets/images/HomeBanners/Tasks.png")
let account = require("../assets/images/HomeBanners/Account.png")

export const COLORS = {
    primary:"#4169E1",
    strongPrimary:"#214ED3", 
    secondary:"#FAFAFA",
    warning:"#FCC107",
    danger:"#DC3545",
    success:"#28A745",
    gray:"#6C757D",
    orange:"#ff7f2d"
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
    LogoSecondary,
    backgroundBanner,
    schedule,
    routine,
    event,
    task,
    account
}



export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;