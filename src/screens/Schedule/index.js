import React, { useEffect, useState } from 'react'
import { TextInput, TouchableOpacity, Animated, Easing, ScrollView } from 'react-native'
import Banner from '../../components/Banner'
import ButtonFill from '../../components/ButtonFill'
import ButtonOutline from '../../components/ButtonOutline'
import Container from '../../components/Container'
import WhiteLogo from '../../components/WhiteLogo'
import PrimaryLogo from '../../components/PrimaryLogo'
import { COLORS, windowHeight } from '../../constants/themes'
import style from './style'
import { AUTH, LOGIN, SETTINGS, SIGNUP, SIGNUP_CODE_SENT } from '../../constants/routeNames'
import AppText from '../../components/AppText'
import ErrorMessage from '../../components/ErrorMessage'
import { StringIsAlphabetic, ValidateEmail, ValidatePassword } from '../../utils/functions/StaticFunctions'
import HttpRequest from '../../utils/functions/HttpRequest'
import AnimatedLottieView from 'lottie-react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setApp } from '../../redux/slices/AppSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-modern-datepicker';


export default function Schedule({ navigation }) {

    const [errorMessage, setErrorMessage] = useState("");
    const [selectedDate, setSelectedDate] = useState('');
    const date = new Date().toISOString().split('T')[0]
    
    const dispatch = useDispatch();
    let { isLoading } = useSelector((state) => state.app)

    useEffect(() => {
        dispatch(setApp({ isLoading: false }))
    }, [])

    useEffect(() => {
        console.log(selectedDate);
     }, [selectedDate])
  

    return isLoading ? <AnimatedLottieView source={require('../../assets/splash/loading.json')} autoPlay loop /> :
        <Container>
            <DatePicker
                options={{
                    backgroundColor: '#090C08',
                    textHeaderColor: '#FFA25B',
                    textDefaultColor: '#F6E7C1',
                    selectedTextColor: '#fff',
                    mainColor: '#F4722B',
                    textSecondaryColor: '#D6C7A1',
                    borderColor: 'rgba(122, 146, 165, 0.1)',
                }}
                onSelectedChange={date => setSelectedDate(date)}
                current = {date}
                selected={date}
                mode="calendar"
                minuteInterval={30}
                style={{ borderRadius: 10 }}
            />
            
            
        </Container>
}





