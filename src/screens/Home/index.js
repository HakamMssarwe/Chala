import AnimatedLottieView from 'lottie-react-native'
import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import AppText from '../../components/AppText';
import Container from '../../components/Container'

export default function Home() {
    const dispatch = useDispatch();
    let {isLoading} = useSelector((state) => state.app)


    return  isLoading? <AnimatedLottieView source={require('../../assets/splash/loading.json')} autoPlay loop /> :
        <Container>
        <ScrollView style={{width:"100%",height:"100%"}} contentContainerStyle={{justifyContent:"center",alignItems:"center",flexGrow:1}}>
        <AppText>Hello from home...</AppText>
        </ScrollView>
        </Container>
    
}
