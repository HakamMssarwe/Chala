import { View } from 'native-base';
import React from 'react';
import {Animated, Image} from 'react-native';
import {COLORS, FONTS, Images, SIZES, windowHeight} from '../constants/themes';
import AppText from './AppText';

export default function WhiteLogo({style}) {
  return (
      <Animated.View style={{...style,width:"100%",height:windowHeight * 0.3, justifyContent:"center",alignItems:"center",margin:0,marginBottom:150,padding:0}}>
    <Image source={Images.LogoPrimary} style={{width: 200, height: 200}} resizeMode="contain"/>
    <AppText style={{color:COLORS.secondary,fontSize:SIZES.title,marginTop:-50}}>Chala</AppText>
  </Animated.View>
  );
}
