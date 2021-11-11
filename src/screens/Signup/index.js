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
import { AUTH, LOGIN, SIGNUP, SIGNUP_CODE_SENT } from '../../constants/routeNames'
import AppText from '../../components/AppText'
import ErrorMessage from '../../components/ErrorMessage'
import { StringIsAlphabetic, ValidateEmail, ValidatePassword } from '../../utils/functions/StaticFunctions'


export default function Signup({navigation}) {

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState("Something went wrong.");

    const handleSignup = () =>{

    //Validation
    if (firstName == "" || lastName == "" || email == "" || password == "" || confirmPassword == "")
    {
        setErrorMessage("Please do not leave any empty fields.");
        return;
    }

    //Validate the firstname & lastname
    var validateFirstName = StringIsAlphabetic(firstName);
    var validateLastName = StringIsAlphabetic(lastName);

    if (!(validateFirstName.isValid && validateLastName.isValid))
    {
        setErrorMessage("Names should not contain any numbers or symbols.")
        return;
    }


    //Validate Email

    let emailValidationResult = ValidateEmail(email);
     
    if (!emailValidationResult.isValid)
    {
        setErrorMessage(emailValidationResult.errorMessage)
        return;
    }

    //Call API & Check if email is already in use

    if (!false)
    {
        setErrorMessage("This email is already in use by another member.")
        return;
    }


    //Validate Password
    if (password !== confirmPassword)
    {
       setErrorMessage("Passwords do not match.")
       return;
    }

    var passwordValidationResult = ValidatePassword(password)

    if (!passwordValidationResult.isValid)
    {
        setErrorMessage(passwordValidationResult.errorMessage)
        return;
    }

    //Make the API call and sign-up the user
    if (400)
    {
        setErrorMessage("Error Message.");
        return;
    }
    else if (200)
    {
        navigation.navigate(SIGNUP_CODE_SENT);
        return;
    }
    else
    {
        setErrorMessage("Something went wrong.");
        return;
    }
        
    }

    return (
        <Container>
        <Banner/>
        <ScrollView style={{width:"100%",height:"100%"}} contentContainerStyle={{justifyContent:"center",alignItems:"center",flexGrow:1}}>
        <Animated.View style={{width:"100%",height:"30%"}}>
            <TouchableOpacity onPress={e => navigation.navigate(AUTH)}>
            <WhiteLogo/>
            </TouchableOpacity>
        </Animated.View>
        <TextInput onChangeText={setFirstName} value={firstName} style={style.input} placeholder="First Name" placeholderTextColor={COLORS.secondary}/>
        <TextInput onChangeText={setLastName} value={lastName} style={style.input} placeholder="Last Name" placeholderTextColor={COLORS.secondary} />
        <TextInput onChangeText={setEmail} value={email} style={style.input} placeholder="Email" placeholderTextColor={COLORS.secondary} />
        <TextInput onChangeText={setPassword} value={password} style={style.input} placeholder="Password" placeholderTextColor={COLORS.secondary} />
        <TextInput onChangeText={setConfirmPassword} value={confirmPassword} style={style.input} placeholder="Confirm Password" placeholderTextColor={COLORS.secondary} />
        <ErrorMessage style={{color:COLORS.secondary,fontSize:18,textAlign:"center"}}>{errorMessage}</ErrorMessage>
        <ButtonFill onPress={handleSignup} style={{width:"75%",borderColor:COLORS.primary,marginTop:"2%"}}>Join us</ButtonFill>
        </ScrollView>
        </Container>
    )
}
