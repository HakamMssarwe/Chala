/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { TextInput, TouchableOpacity, Animated, Easing, ScrollView, View } from 'react-native'
import Banner from '../../components/Banner'
import ButtonFill from '../../components/ButtonFill'
import ButtonOutline from '../../components/ButtonOutline'
import Container from '../../components/Container'
import WhiteLogo from '../../components/WhiteLogo'
import PrimaryLogo from '../../components/PrimaryLogo'
import { COLORS, windowHeight } from '../../constants/themes'
import style from './style'
import { ACCOUNT, AUTH, LOGIN, SETTINGS, SIGNUP, VERIFY_CODE } from '../../constants/routeNames'
import AppText from '../../components/AppText'
import ErrorMessage from '../../components/ErrorMessage'
import { ValidatePassword } from '../../utils/functions/StaticFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { setApp } from '../../redux/slices/AppSlice'
import HttpRequest from '../../utils/functions/HttpRequest'
import AnimatedLottieView from 'lottie-react-native'

export default function UpdatePasswordSettingsScreen({ navigation, route }) {

    const email = route.params.Email
    const dispatch = useDispatch();
    let {isLoading} = useSelector(state => state.app)


    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {
        dispatch(setApp({ isLoading: false }))

    }, [])






    const handleUpdatingPassword = async () => {
        //Password Validation
        if (newPassword === "" || confirmPassword === "") {
            setErrorMessage("Please do not leave any empty fields.")
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match.")
            return;
        }

        var passwordValidationResult = ValidatePassword(newPassword)

        if (!passwordValidationResult.isValid) {
            setErrorMessage(passwordValidationResult.errorMessage)
            return;
        }
        console.log(email);
        let response = await HttpRequest('Users/ResetPassword', 'POST', { Email: email, Password: newPassword })
        switch (response.status) {
            case 200:
                dispatch(setApp({ isLoading: true }))
                navigation.navigate(SETTINGS)
                break;
            default:
                setErrorMessage("Something went wrong...")
                break;
        }
    }





     return isLoading ? <AnimatedLottieView source={require('../../assets/splash/loading.json')} autoPlay loop /> :
      <Container style={{backgroundColor:"white"}}>
        <View style={{width:"100%",height:windowHeight *0.15,padding:30,flexDirection:"row",justifyContent:"space-between",alignItems:"center",backgroundColor:"white"}}> 
            <View style={{flexDirection:"row",alignItems:"center"}}>
                <TouchableOpacity onPress={e => navigation.navigate(ACCOUNT)}>
                    <AppText style={{color:"white",fontSize:25,color:COLORS.primary}}>{"<"} Chala</AppText>
                </TouchableOpacity>
            </View>
        </View>
        <ScrollView style={{ width: "100%", height: windowHeight * 0.85,backgroundColor:COLORS.primary,borderTopLeftRadius:35,borderTopRightRadius:35 }} contentContainerStyle={{ justifyContent: "flex-start", alignItems: "center", flexGrow: 1 }}>
                <Animated.View style={{ width: "100%", height: "30%",marginBottom:50 }}>
                        <WhiteLogo />
                </Animated.View>
                <TextInput onChangeText={setNewPassword} value={newPassword} style={style.input} placeholder="New Password" placeholderTextColor={"white"} />
                <TextInput onChangeText={setConfirmPassword} value={confirmPassword} style={style.input} placeholder="Confirm Password" placeholderTextColor={"white"} />

                <ErrorMessage style={{ color: COLORS.secondary, fontSize: 18, textAlign: "center", marginTop: 10 }}>{errorMessage}</ErrorMessage>
                <ButtonFill onPress={handleUpdatingPassword} style={{ width: "75%", borderColor: "white",backgroundColor:"white", marginTop: "2%",buttonTextColor:COLORS.primary,borderRadius:5}}>Update</ButtonFill>
            </ScrollView>
        </Container>
    
}

