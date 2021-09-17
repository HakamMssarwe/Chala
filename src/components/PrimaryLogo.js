import { View } from 'native-base';
import React from 'react';
import {Image} from 'react-native';
import {COLORS, FONTS, Images, SIZES, windowHeight} from '../constants/themes';
import AppText from './AppText';

export default function PrimaryLogo({style}) {
  return (
      <View style={{...style,width:"100%",height:windowHeight * 0.3, justifyContent:"center",alignItems:"center"}}>
    <Image source={Images.LogoPrimary} style={{width: 90, height: 70}} resizeMode="contain"/>
    <AppText style={{color:COLORS.primary,fontSize:SIZES.title}}>Chala</AppText>
  </View>
  );
}
