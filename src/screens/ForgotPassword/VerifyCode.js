/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {TextInput, TouchableOpacity,Animated, Easing, ScrollView } from 'react-native'
import Banner from '../../components/Banner'
import ButtonFill from '../../components/ButtonFill'
import ButtonOutline from '../../components/ButtonOutline'
import Container from '../../components/Container'
import WhiteLogo from '../../components/WhiteLogo'
import PrimaryLogo from '../../components/PrimaryLogo'
import { COLORS, windowHeight } from '../../constants/themes'
import style from './style'
import { AUTH, LOGIN, SIGNUP } from '../../constants/routeNames'
import AppText from '../../components/AppText'
import ErrorMessage from '../../components/ErrorMessage'
import { View } from 'native-base'


export default function VerifyCode({navigation}) {

    const [errorMessage,setErrorMessage] = useState("Something went wrong.");


    return (
        <Container>
        <ScrollView style={{width:"100%",height:"100%"}} contentContainerStyle={{justifyContent:"center",alignItems:"center",flexGrow:1}}>
        <Banner/>
        <Animated.View style={{width:"100%",height:"30%"}}>
            <TouchableOpacity onPress={e => navigation.navigate(AUTH)}>
            <WhiteLogo/>
            </TouchableOpacity>
        </Animated.View>
        <AppText style={{color:COLORS.secondary,width:"80%",textAlign:"center",fontSize:16}}>Enter the verification code we just sent you on your email address.</AppText>
        <View style={style.inputCellsContainer}>
        <TextInput style={style.inputCell}>5</TextInput> 
        <TextInput style={style.inputCell}>6</TextInput> 
        <TextInput style={style.inputCell}>1</TextInput> 
        <TextInput style={style.inputCell}>3</TextInput> 
        <TextInput style={style.inputCell}>5</TextInput> 
        </View>
        <ErrorMessage style={{color:COLORS.secondary,fontSize:18}}>{errorMessage}</ErrorMessage>
        <ButtonFill  style={{width:"75%",borderColor:COLORS.primary,marginTop:"2%"}}>Verify</ButtonFill>
        </ScrollView>
        </Container>
    )
}
