import React from 'react'
import {Text } from 'react-native'

export default function AppText({style,children}) {
    return (
            <Text style={{...style, fontFamily:"Poppins"}}>{children}</Text>
    )
}
