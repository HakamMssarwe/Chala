import { Dimensions } from "react-native"
let LogoSecondary = require("../assets/images/logo_secondary.png")
let backgroundBanner = require("../assets/images/backgroundBanner.jpg")
let schedule = require("../assets/images/HomeBanners/Schedule.png")
let routine = require("../assets/images/HomeBanners/Routine.png")
let event = require("../assets/images/HomeBanners/Events.png")
let task = require("../assets/images/HomeBanners/Tasks.png")
let account = require("../assets/images/HomeBanners/Account.png")


let office = require("../assets/images/Banners/office.png");
let tv = require("../assets/images/Banners/tv.png");
let edit = require("../assets/images/Banners/edit.png");
let creative = require("../assets/images/Banners/creative.png");




let home = require("../assets/images/tags/house.png")
let study = require("../assets/images/tags/book.png")
let phoneCall = require("../assets/images/tags/call.png")
let write = require("../assets/images/tags/edit.png")
let heart = require("../assets/images/tags/like.png")
let todo = require("../assets/images/tags/list.png")
let location = require("../assets/images/tags/location.png")
let star = require("../assets/images/tags/star.png")
let work = require("../assets/images/tags/work.png")








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
    account,
    office,
    tv,
    edit,
    creative
}


export const Tags = {
     home,
     study ,
     phoneCall,
     write ,
     heart,
     todo ,
     location ,
     star ,
     work 
}







export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;