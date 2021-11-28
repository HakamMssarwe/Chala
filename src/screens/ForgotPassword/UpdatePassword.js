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
import { ValidatePassword} from '../../utils/functions/StaticFunctions'

export default function UpdatePassword({navigation}) {

    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState("Something went wrong.");


    const handleUpdatingPassword = () =>{
         //Password Validation
        if (newPassword === "" || confirmPassword === "")
        {
            setErrorMessage("Please do not leave any empty fields.")
            return;     
        }

        if (newPassword !== confirmPassword)
        {
           setErrorMessage("Passwords do not match.")
           return;
        }

        var passwordValidationResult = ValidatePassword(newPassword)

        if (!passwordValidationResult.isValid)
        {
            setErrorMessage(passwordValidationResult.errorMessage)
            return;
        }

        navigation.navigate(LOGIN);
    }


    


    return (
        <Container>
        <ScrollView style={{width:"100%",height:"100%"}} contentContainerStyle={{justifyContent:"center",alignItems:"center",flexGrow:1}}>
        <Banner/>
        <Animated.View style={{width:"100%",height:"30%"}}>
            <TouchableOpacity>
            <WhiteLogo/>
            </TouchableOpacity>
        </Animated.View>

        <AppText style={{color:COLORS.secondary,width:"80%",textAlign:"center",fontSize:16}}>Please enter a new password.</AppText>
        <TextInput onChangeText={setNewPassword} value={newPassword} style={style.input} placeholder="New Password" placeholderTextColor={COLORS.secondary}/>
        <TextInput onChangeText={setConfirmPassword} value={confirmPassword} style={style.input} placeholder="Confirm Password" placeholderTextColor={COLORS.secondary}/>

        <ButtonFill onPress={handleUpdatingPassword} style={{width:"75%",borderColor:COLORS.primary,marginTop:"2%"}}>Update</ButtonFill>
        <ErrorMessage style={{ color: COLORS.secondary, fontSize: 18,textAlign:"center",marginTop:10 }}>{errorMessage}</ErrorMessage>
        </ScrollView>
        </Container>
    )
}
