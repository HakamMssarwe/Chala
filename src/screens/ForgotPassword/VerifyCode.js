/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { TextInput, TouchableOpacity, Animated, Easing, ScrollView, Keyboard } from 'react-native'
import Banner from '../../components/Banner'
import ButtonFill from '../../components/ButtonFill'
import ButtonOutline from '../../components/ButtonOutline'
import Container from '../../components/Container'
import WhiteLogo from '../../components/WhiteLogo'
import PrimaryLogo from '../../components/PrimaryLogo'
import { COLORS, windowHeight } from '../../constants/themes'
import style from './style'
import { AUTH, LOGIN, SIGNUP, UPDATE_PASSWORD } from '../../constants/routeNames'
import AppText from '../../components/AppText'
import ErrorMessage from '../../components/ErrorMessage'
import { View } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { setApp } from '../../redux/slices/AppSlice'
import { ForceTouchGestureHandler } from 'react-native-gesture-handler'
import HttpRequest from '../../utils/functions/HttpRequest'


export default function VerifyCode({ navigation, route }) {
    const { email } = route.params
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.app)

    const [firstCell, setFirstCell] = useState("");
    const [secondCell, setSecondCell] = useState("");
    const [thirdCell, setThirdCell] = useState("");
    const [fourthCell, setFourthCell] = useState("");
    const [fifthCell, setFifthCell] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const firstCellRef = useRef(null);
    const secondCellRef = useRef(null);
    const thirdCellRef = useRef(null);
    const fourthCellRef = useRef(null);
    const fifthCellRef = useRef(null);

    const [selectedCell, setSelectedCell] = useState("ONE");

    useEffect(() => {
        setErrorMessage("");
        dispatch(setApp({ isLoading: false }))
    }, [])

    useEffect(() => {
        switch (selectedCell) {
            case "ONE":
                firstCellRef.current.focus();
                break;
            case "TWO":
                secondCellRef.current.focus();
                break;
            case "THREE":
                thirdCellRef.current.focus();
                break;
            case "FOUR":
                fourthCellRef.current.focus();
                break;
            case "FIVE":
                fifthCellRef.current.focus();
                break;
            default:
                Keyboard.dismiss();
                break;
        }
    }, [selectedCell])

    const handleCellsInput = (e, cellNumber) => {

        switch (cellNumber) {
            case "ONE":
                setFirstCell(e);
                setSelectedCell("TWO");
                break;
            case "TWO":
                setSecondCell(e);
                setSelectedCell("THREE");
                break;
            case "THREE":
                setThirdCell(e);
                setSelectedCell("FOUR");
                break;
            case "FOUR":
                setFourthCell(e);
                setSelectedCell("FIVE");
                break;
            case "FIVE":
                setFifthCell(e);
                setSelectedCell(null);
                break;
        }
    }



const handleVerification = async () => {
    if (firstCell == "" && secondCell == "" && thirdCell == "" && fourthCell == "" && fifthCell == "") {
        setErrorMessage("Please fill all the cells");
        return;
    }

    let response = await HttpRequest('/ForgotPassword/CheckForgotPasswordCode','POST', { Email: email, Code: firstCell + secondCell + thirdCell + fourthCell + fifthCell })
    console.log(response);
    switch (response.status) {
        case 200:
            dispatch(setApp({ isLoading: true }))
            navigation.navigate(UPDATE_PASSWORD, {Email:email})
            return;
        case 400:
            setErrorMessage("Invalid Password.")
        default:
            setErrorMessage("Something went wrong...")
            break;
    }
}



    return (
        <Container>
            <ScrollView style={{ width: "100%", height: "100%" }} contentContainerStyle={{ justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
                <Banner />
                <Animated.View style={{ width: "100%", height: "30%" }}>
                    <TouchableOpacity>
                        <WhiteLogo />
                    </TouchableOpacity>
                </Animated.View>
                <AppText style={{ color: COLORS.secondary, width: "80%", textAlign: "center", fontSize: 16 }}>Enter the verification code we just sent you on your email address.</AppText>
                <View style={style.inputCellsContainer}>
                    <TextInput onChangeText={e => handleCellsInput(e, "ONE")} style={style.inputCell} autoFocus value={firstCell} ref={firstCellRef} />
                    <TextInput onChangeText={e => handleCellsInput(e, "TWO")} style={style.inputCell} value={secondCell} ref={secondCellRef} />
                    <TextInput onChangeText={e => handleCellsInput(e, "THREE")} style={style.inputCell} value={thirdCell} ref={thirdCellRef} />
                    <TextInput onChangeText={e => handleCellsInput(e, "FOUR")} style={style.inputCell} value={fourthCell} ref={fourthCellRef} />
                    <TextInput onChangeText={e => handleCellsInput(e, "FIVE")} style={style.inputCell} value={fifthCell} ref={fifthCellRef} />
                </View>
                <ErrorMessage style={{ color: COLORS.secondary, fontSize: 18 }}>{errorMessage}</ErrorMessage>
                <ButtonFill onPress={handleVerification} style={{ width: "75%", borderColor: COLORS.primary, marginTop: "2%" }}>Verify</ButtonFill>
            </ScrollView>
        </Container>
    )
}
