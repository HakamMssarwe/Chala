import React from 'react'
import { Button } from 'native-base'
import { COLORS, SIZES } from '../constants/themes'
import AppText from './AppText'

export default function ButtonFill({isLoading,onPress,children,style}) {
    return (
        <Button isLoading={isLoading} style={{backgroundColor:COLORS.secondary,borderWidth:1.5,borderColor:COLORS.secondary,justifyContent:"center",alignItems:"center",...style}} onPress={() => onPress?.()}>
        <AppText style={{color:COLORS.primary, fontSize:SIZES.paragraph,fontWeight:"bold"}}>{children.toUpperCase()}</AppText>
      </Button>
    )
}
