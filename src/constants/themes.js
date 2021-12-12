import { Dimensions } from "react-native"
let LogoPrimary = require("../assets/images/logo.png")
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
let read = require("../assets/images/Banners/read.png");
let collect = require("../assets/images/Banners/collect.png");
let settings = require("../assets/images/Banners/settings.png");




let family = require("../assets/images/tags/family.png")
let friends = require("../assets/images/tags/friends.png")
let home = require("../assets/images/tags/home.png")
let meditation = require("../assets/images/tags/meditation.png")
let meeting = require("../assets/images/tags/meeting.png")
let trip = require("../assets/images/tags/trip.png")
let work = require("../assets/images/tags/work.png")
let workout = require("../assets/images/tags/workout.png")
let yoga = require("../assets/images/tags/yoga.png")








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
    LogoPrimary,
    backgroundBanner,
    schedule,
    routine,
    event,
    task,
    account,
    office,
    tv,
    edit,
    creative,
    read,
    collect,
    settings
}


export const Tags = {
family,
friends,
home,
meditation,
meeting,
trip,
work,
workout,
yoga
}

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;