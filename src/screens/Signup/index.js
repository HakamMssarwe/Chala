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


export default function Signup({navigation}) {

    const [errorMessage,setErrorMessage] = useState("Something went wrong.");


    return (
        <Container>
        <Banner/>
        <ScrollView style={{width:"100%",height:"100%"}} contentContainerStyle={{justifyContent:"center",alignItems:"center",flexGrow:1}}>
        <Animated.View style={{width:"100%",height:"30%"}}>
            <TouchableOpacity onPress={e => navigation.navigate(AUTH)}>
            <WhiteLogo/>
            </TouchableOpacity>
        </Animated.View>
        <TextInput style={style.input} placeholder="First Name" placeholderTextColor={COLORS.secondary}/>
        <TextInput style={style.input} placeholder="Last Name" placeholderTextColor={COLORS.secondary} secureTextEntry/>
        <TextInput style={style.input} placeholder="Email" placeholderTextColor={COLORS.secondary} secureTextEntry/>
        <TextInput style={style.input} placeholder="Password" placeholderTextColor={COLORS.secondary} secureTextEntry/>
        <TextInput style={style.input} placeholder="Confirm Password" placeholderTextColor={COLORS.secondary} secureTextEntry/>
        <ErrorMessage style={{color:COLORS.secondary,fontSize:18}}>{errorMessage}</ErrorMessage>
        <ButtonFill  style={{width:"75%",borderColor:COLORS.primary,marginTop:"2%"}}>Join us</ButtonFill>
        <TouchableOpacity onPress={e => navigation.navigate(LOGIN)} style={{marginTop:10}}>
        </TouchableOpacity>
        </ScrollView>
        </Container>
    )
}