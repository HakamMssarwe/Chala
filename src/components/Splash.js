import AnimatedLottieView from 'lottie-react-native'

import React from 'react'
import { StatusBar } from 'react-native'

export default function Splash() {
    return <><StatusBar hidden/><AnimatedLottieView source={require('../assets/splash/loading.json')} autoPlay loop /></>
    
}
