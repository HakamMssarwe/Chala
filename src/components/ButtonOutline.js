import React from 'react'
import { Button } from 'native-base'
import { COLORS, SIZES, windowHeight } from '../constants/themes'
import AppText from './AppText'

export default function ButtonOutline({isLoading,onPress,children,style}) {
    return (
        <Button isLoading={isLoading} style={{...style,backgroundColor:"transparent",borderWidth:1.5,borderColor:COLORS.secondary,justifyContent:"center",alignItems:"center"}} onPress={() => onPress?.()}>
        <AppText style={{color:COLORS.secondary, fontSize:SIZES.paragraph,fontWeight:"bold"}}>{children.toUpperCase()}</AppText>
      </Button>
    )
}
