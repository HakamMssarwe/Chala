import React from 'react'
import { View, Text, Image } from 'react-native'
import AppText from '../../components/AppText'
import ButtonFill from '../../components/ButtonFill'
import Container from '../../components/Container'
import { LOGIN } from '../../constants/routeNames'
import { COLORS } from '../../constants/themes'

export default function SignupCodeSent({navigation}) {
    return (
        <Container style={{backgroundColor:COLORS.secondary,justifyContent:"center"}}>
            <Image style={{width:"50%",height:100,marginBottom:20}} source={require("../../assets/banners/paper_aircraft_banner.png")} resizeMode="contain"></Image>
            <AppText style={{textAlign:"center",fontSize:22,marginBottom:20}}>Welcome to the family!</AppText>
            <AppText style={{textAlign:"center",fontSize:16,padding:5,marginBottom:15}}>For security reasons, we've sent you an email that contains a code that will be used for the verification process.</AppText>
            <ButtonFill onPress={e => navigation.navigate(LOGIN)} style={{width:"75%",borderColor:COLORS.primary,backgroundColor:COLORS.primary,marginTop:"2%",buttonTextColor:COLORS.secondary}}>Next</ButtonFill>
        </Container>
    )
}
