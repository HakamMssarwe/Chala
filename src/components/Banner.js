import React from 'react'
import { View, Image } from 'react-native'
import { COLORS, Images, windowHeight, windowWidth } from '../constants/themes'

export default function Banner({style}) {
    return (
        <>
        <Image source={Images.backgroundBanner} style={{...style,width:windowWidth,height:windowHeight,position:"absolute",top:0}}/>
        <View style={{backgroundColor:COLORS.primary,opacity:0.85 ,width:windowWidth,height:windowHeight,position:"absolute",top:0,...style}}></View>
        </>
    )
}
