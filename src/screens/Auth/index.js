/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { ScrollView,TextInput, TouchableOpacity,Animated, Easing } from 'react-native'
import Banner from '../../components/Banner'
import ButtonFill from '../../components/ButtonFill'
import ButtonOutline from '../../components/ButtonOutline'
import Container from '../../components/Container'
import WhiteLogo from '../../components/WhiteLogo'
import PrimaryLogo from '../../components/PrimaryLogo'
import { COLORS, windowHeight } from '../../constants/themes'
import style from './style'
import { LOGIN, SIGNUP } from '../../constants/routeNames'
import { useIsFocused } from '@react-navigation/core'

export default function Auth({navigation}) {
    const containerButtonY = useState(new Animated.Value(windowHeight * 0.4))[0]
    const isFocused = useIsFocused();

   useEffect(() => {
        Animated.sequence([
            Animated.timing(containerButtonY,{
            toValue:0,
            duration:1000,
            useNativeDriver:true,
            })
    ]).start();
   }, [isFocused])

    const handleNavigation = (PAGE) => {
    Animated.sequence([
        Animated.timing(containerButtonY,{
            toValue:windowHeight * 0.4,
            duration:1000,
            useNativeDriver:true,
            })
    ]).start(() => {navigation.navigate(PAGE)});
    }

    return (
        <Container>
        <ScrollView style={{width:"100%",height:windowHeight}} contentContainerStyle={{flex:1,justifyContent:"center"}}>
        <Banner/>
        <Animated.View style={{width:"100%",height:"30%",marginTop:-200}}>
            <TouchableOpacity>
            <WhiteLogo/>
            </TouchableOpacity>
            </Animated.View>
        <Animated.View style={{...style.containerButtons,transform:[{translateY:containerButtonY}]}}>
        <ButtonOutline onPress={e => handleNavigation(SIGNUP)} style={{width:"75%",marginBottom:"5%"}}>Sign up</ButtonOutline>
        <ButtonFill onPress={e => handleNavigation(LOGIN)} style={{width:"75%"}}>Login</ButtonFill>
        </Animated.View>
        </ScrollView>
        </Container>
    )
}
