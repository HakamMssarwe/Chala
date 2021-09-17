import React from 'react'
import {Text } from 'react-native'
import { FONTS } from '../constants/themes'

export default function AppText({style,children}) {
    return (
            <Text style={{...style, fontFamily:FONTS.normal}}>{children}</Text>
    )
}
