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
import { AUTH, FIRST_TIME_LOGIN, FORGOT_PASSWORD, LOGIN, SEND_CODE, SIGNUP, SIGNUP_CODE_VERIFY } from '../../constants/routeNames'
import AppText from '../../components/AppText'
import ErrorMessage from '../../components/ErrorMessage'
import { ValidateEmail } from '../../utils/functions/StaticFunctions'
import HttpRequest from '../../utils/functions/HttpRequest'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux'
import { setApp } from '../../redux/slices/AppSlice'

export default function Login({navigation}) {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const dispatch = useDispatch();

    const handleLogin = async() => {

     let emailValidationResult = ValidateEmail(email);
     
     if (!emailValidationResult.isValid)
     {
         setErrorMessage(emailValidationResult.errorMessage)
         return;
     }

     //Call API

     let response = await HttpRequest("/users/authorize","POST",{Email:email,Password:password});


     //If BadRequest then display an error message
     if (response.status === 400)
     {
         setErrorMessage("Incorrect email or password.");
         return;
     }
     //If it's an Ok response then direct to the app main screen
     else if (response.status === 200)
     {
         try {
             //Store user Id & token in async storage
            await AsyncStorage.setItem('@chala', JSON.stringify(response.data))

            if (response.data.isVerified == 'False')
            {
                navigation.navigate(SIGNUP_CODE_VERIFY);
                return;
            }

            //navigate to the app's main screen by updating the isloggedIn redux state
            dispatch(setApp({isLoggedIn:true}));

          } catch (e) {
            setErrorMessage("Something went wrong.")
            return;
          }
    
     }
     else
     {
         setErrorMessage("Something went wrong.")
         return;
     }
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
        <TextInput  onChangeText={setEmail}  value={email} style={style.input} placeholder="Email" placeholderTextColor={COLORS.secondary}/>
        <TextInput onChangeText={setPassword} value={password} style={style.input} placeholder="Password" placeholderTextColor={COLORS.secondary} secureTextEntry/>
        <ErrorMessage style={{color:COLORS.secondary,fontSize:18}}>{errorMessage}</ErrorMessage>
        <ButtonFill onPress={handleLogin} style={{width:"75%",borderColor:COLORS.primary,marginTop:"2%"}}>Login</ButtonFill>
        <TouchableOpacity onPress={e => navigation.navigate(SEND_CODE)} style={{marginTop:10}}>
        <AppText style={{color:COLORS.secondary}}>Forgot Password?</AppText>
        </TouchableOpacity>
        </ScrollView>
        </Container>
    )
}
