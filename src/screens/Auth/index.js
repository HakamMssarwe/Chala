/* eslint-disable react-hooks/exhaustive-deps */
import { View } from 'native-base'
import React, { useEffect, useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Banner from '../../components/Banner'
import ButtonFill from '../../components/ButtonFill'
import ButtonOutline from '../../components/ButtonOutline'
import Container from '../../components/Container'
import WhiteLogo from '../../components/WhiteLogo'
import PrimaryLogo from '../../components/PrimaryLogo'
import { COLORS, windowHeight } from '../../constants/themes'
import style from './style'
import { Animated, Easing } from 'react-native'

export default function Auth() {
    
    const logoOpacity = useState(new Animated.Value(0))[0]
    const containerButtonY = useState(new Animated.Value(windowHeight * 0.4))[0]

    //Login Menu
    const [loginMenuIsOpen,setLoginMenuIsOpen] = useState(false);
    const loginMenuOpacity = useState(new Animated.Value(0))[0];
    const [isLoggingIn,setIsLoggingIn] = useState(false);
    const [isSigningUp,setIsSigningUp] = useState(false);


    //Signup Menu
    const [signupMenuIsOpen,setSignupMenuIsOpen] = useState(false);
    const signupMenuOpacity = useState(new Animated.Value(0))[0]



    //After mount
    useEffect(() => {
        Animated.timing(logoOpacity,{
            toValue:1,
            duration:1000,
            useNativeDriver:true
        }).start()
    }, [])


    //LOGIN MENU
    useEffect(() => {

        if (loginMenuIsOpen == false)
        {
            Animated.sequence([
                Animated.timing(loginMenuOpacity,{
                    toValue:0,
                    duration:1000,
                    useNativeDriver:true,
                })
                ,
                Animated.timing(containerButtonY,{
                    toValue:0,
                    duration:2500,
                    delay:0,
                    useNativeDriver:true,
                    easing:Easing.bounce
                })
            ]).start();

     
        }

        else
        {
            Animated.sequence([
                Animated.timing(containerButtonY,{
                    toValue:windowHeight * 0.4,
                    duration:500,
                    useNativeDriver:true,
                    easing:Easing.ease
                    }),
                    Animated.timing(loginMenuOpacity,{
                        toValue:1,
                        duration:1000,
                        useNativeDriver:true
                    })
            ]).start();
        
        }
    },[loginMenuIsOpen])

    //SIGNUP MENU
    useEffect(() => {

        if (signupMenuIsOpen == false)
        {
            Animated.sequence([
                Animated.timing(signupMenuOpacity,{
                    toValue:0,
                    duration:1000,
                    useNativeDriver:true,
                })
                ,
                Animated.timing(containerButtonY,{
                    toValue:0,
                    duration:2500,
                    delay:0,
                    useNativeDriver:true,
                    easing:Easing.bounce
                })
            ]).start();

     
        }

        else
        {
            Animated.sequence([
                Animated.timing(containerButtonY,{
                    toValue:windowHeight * 0.4,
                    duration:500,
                    useNativeDriver:true,
                    easing:Easing.ease
                    }),
                    Animated.timing(signupMenuOpacity,{
                        toValue:1,
                        duration:1000,
                        useNativeDriver:true
                    })
            ]).start();
        
        }
    },[signupMenuIsOpen])



    useEffect(() => {
       console.log("signing up")
    }, [isSigningUp])


    return (
        <Container style={{justifyContent:signupMenuIsOpen?"flex-start" : "center"}}>
        <Banner/>
        <Animated.View style={{width:"100%",height:"30%",opacity:logoOpacity}}>
            <TouchableOpacity onPress={e => loginMenuIsOpen? isLoggingIn? null : setLoginMenuIsOpen(false) : isSigningUp? null :setSignupMenuIsOpen(false)}>
            <WhiteLogo/>
            </TouchableOpacity>
            </Animated.View>
        <Animated.View style={{...style.loginMenuContainer,opacity:loginMenuOpacity,display:loginMenuIsOpen? "flex" : "none"}}>
             <TextInput style={style.input} placeholder="Email" placeholderTextColor={COLORS.secondary}/>
             <TextInput style={style.input} placeholder="Password" placeholderTextColor={COLORS.secondary}/>
            <ButtonOutline isloading={isLoggingIn} onPress={e => setIsLoggingIn(true)} style={{width:"75%",borderColor:COLORS.secondary,backgroundColor:"transparent",marginTop:"2%"}}>Login</ButtonOutline>
        </Animated.View>

        <Animated.View style={{...style.signupMenuContainer,opacity:signupMenuOpacity,display:signupMenuIsOpen? "flex" : "none"}}>
        <TextInput style={style.input} placeholder="First Name" placeholderTextColor={COLORS.secondary}/>
             <TextInput style={style.input} placeholder="Last Name" placeholderTextColor={COLORS.secondary}/>
             <TextInput style={style.input} placeholder="Email" placeholderTextColor={COLORS.secondary}/>
             <TextInput style={style.input} placeholder="Password" placeholderTextColor={COLORS.secondary}/>
             <TextInput style={style.input} placeholder="Confirm Password" placeholderTextColor={COLORS.secondary}/>
            <ButtonOutline isLoading={isSigningUp} onPress={e => setIsSigningUp(true)} style={{width:"75%",borderColor:COLORS.secondary,backgroundColor:"transparent",marginTop:"2%"}}>Join us</ButtonOutline>
        </Animated.View>

        <Animated.View style={{...style.containerButtons,transform:[{translateY:containerButtonY}]}}>
        <ButtonOutline onPress={e => setSignupMenuIsOpen(true)}  style={{width:"75%",marginBottom:"5%"}}>Sign up</ButtonOutline>
        <ButtonFill onPress={e => setLoginMenuIsOpen(true)} style={{width:"75%"}}>Login</ButtonFill>
        </Animated.View>
        </Container>
    )
}
