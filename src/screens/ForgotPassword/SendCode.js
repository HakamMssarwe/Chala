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
import { AUTH, LOGIN, SIGNUP, VERIFY_CODE } from '../../constants/routeNames'
import AppText from '../../components/AppText'
import ErrorMessage from '../../components/ErrorMessage'


export default function SendCode({navigation}) {

    const [errorMessage,setErrorMessage] = useState("Something went wrong.");


    const handleSendingCode = () =>{
        navigation.navigate(VERIFY_CODE)
    }



    return (
        <Container>
        <ScrollView style={{width:"100%",height:"100%"}} contentContainerStyle={{justifyContent:"center",alignItems:"center",flexGrow:1}}>
        <Banner/>
        <Animated.View style={{width:"100%",height:"30%"}}>
            <TouchableOpacity onPress={e => navigation.navigate(AUTH)}>
            <WhiteLogo/>
            </TouchableOpacity>
        </Animated.View>

        <AppText style={{color:COLORS.secondary,width:"80%",textAlign:"center",fontSize:16}}>Enter the email address associated with your account.</AppText>
        <TextInput style={style.input} placeholder="Email" placeholderTextColor={COLORS.secondary}/>
        <ButtonFill onPress={handleSendingCode} style={{width:"75%",borderColor:COLORS.primary,marginTop:"2%"}}>Next</ButtonFill>
        </ScrollView>
        </Container>
    )
}
