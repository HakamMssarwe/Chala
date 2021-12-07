
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeNavigator from './HomeNavigator';



export default function AppNavContainer() {
    
    let {isLoggedIn} = useSelector((state) => state.app);
    const [isLoading,setIsLoading] = useState(true)
    let dispatch = useDispatch();

    useEffect(() => {
       handleToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    const handleToken = async() => {

        let response = await HttpRequest("/users/IsLoggedIn","get")
        switch (response.status)
        {
            case 200:

                let jsonValue = await AsyncStorage.getItem('@chala');
                let storageData = jsonValue != null ? await JSON.parse(jsonValue) : null;

                if (storageData.isVerified != "False")
                    dispatch(setApp({isLoggedIn:true}))

                    setIsLoading(false)
                break;
            case 401:
                setIsLoading(false)
                break;
        }
    }
    return <NavigationContainer>{isLoading?<AnimatedLottieView source={require('../assets/splash/loading.json')} autoPlay loop />  : isLoggedIn? <HomeNavigator/>: <AuthNavigator/>}</NavigationContainer>
    // return <NavigationContainer><AuthNavigator/></NavigationContainer>
}
