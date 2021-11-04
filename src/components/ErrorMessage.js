import React from 'react'
import {Text } from 'react-native'
import { COLORS, FONTS } from '../constants/themes'

export default function ErrorMessage({style,children}) {
    return (
            <Text style={{color:COLORS.danger, fontFamily:FONTS.normal,...style}}>{children}</Text>
    )
}
