
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import HttpRequest from '../utils/functions/HttpRequest';
import AuthNavigator from './AuthNavigator';
import {setApp} from '../redux/slices/AppSlice'
import { Text } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import { View } from 'native-base';
import { COLORS } from '../constants/themes';


export default function AppNavContainer() {
    
    let {isLoggedIn} = useSelector((state) => state.app);
    let dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
       handleToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    const handleToken = async() => {

        setTimeout(() => {
            setLoading(false);
        }, 3000);
        
        let response = await HttpRequest("/users/IsLoggedIn","GET")
        switch (response.status)
        {
            case 200:
                dispatch(setApp({isLoggedIn:true}))
                break;

        }
    }
    return <NavigationContainer>{loading? <AnimatedLottieView source={require('../assets/splash/loading.json')} autoPlay loop /> : isLoggedIn? <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:COLORS.primary}}><Text style={{color:COLORS.secondary}}>To be continued...</Text></View> : <AuthNavigator/>}</NavigationContainer>
}
