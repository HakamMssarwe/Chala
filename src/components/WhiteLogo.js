import { View } from 'native-base';
import React from 'react';
import {Animated, Image} from 'react-native';
import {COLORS, FONTS, Images, SIZES, windowHeight} from '../constants/themes';
import AppText from './AppText';

export default function WhiteLogo({style}) {
  return (
      <Animated.View style={{...style,width:"100%",height:windowHeight * 0.3, justifyContent:"center",alignItems:"center",margin:0,padding:0}}>
    <Image source={Images.LogoSecondary} style={{width: 90, height: 70}} resizeMode="contain"/>
    <AppText style={{color:COLORS.secondary,fontSize:SIZES.title}}>Chala</AppText>
  </Animated.View>
  );
}
