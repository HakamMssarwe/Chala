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
import { ACCOUNT, AUTH, LOGIN, SETTINGS, SIGNUP, SIGNUP_CODE_SENT } from '../../constants/routeNames'
import AppText from '../../components/AppText'
import ErrorMessage from '../../components/ErrorMessage'
import { StringIsAlphabetic, ValidateEmail, ValidatePassword } from '../../utils/functions/StaticFunctions'
import HttpRequest from '../../utils/functions/HttpRequest'
import AnimatedLottieView from 'lottie-react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setApp } from '../../redux/slices/AppSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function EditProfile({ navigation }) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    let { isLoading } = useSelector((state) => state.app)

    useEffect(() => {
        const t = async () => {
            let jsonValue = await AsyncStorage.getItem('@chala');
            let storageData = jsonValue != null ? await JSON.parse(jsonValue) : null;
            console.log(storageData);
        }
        t()
    }, [])

    const handleEditProfile = async () => {
        //Validation
        if (firstName == "" || lastName == "") {
            setErrorMessage("Please do not leave any empty fields.");
            return;
        }

        //Validate the firstname & lastname
        var validateFirstName = StringIsAlphabetic(firstName);
        var validateLastName = StringIsAlphabetic(lastName);

        if (!(validateFirstName.isValid && validateLastName.isValid)) {
            setErrorMessage("Names should not contain any numbers or symbols.")
            return;
        }

        let jsonValue = await AsyncStorage.getItem('@chala');
        let storageData = jsonValue != null ? await JSON.parse(jsonValue) : null;

        dispatch(setApp({ isLoading: true }))
        let response = await HttpRequest("/users/EditUserById", "POST", { Id: storageData.id, FirstName: firstName, LastName: lastName })

        if (response.status === 200) {
            navigation.navigate(ACCOUNT);
            return;
        }
        else {
            dispatch(setApp({ isLoading: false }))
            setErrorMessage("Something went wrong.");
            return;
        }
    };

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
                <TextInput onChangeText={setFirstName} value={firstName} style={style.input} placeholder="First Name" placeholderTextColor={"white"} />
                <TextInput onChangeText={setLastName} value={lastName} style={style.input} placeholder="Last Name" placeholderTextColor={"white"} />
                <ErrorMessage style={{ color: COLORS.primary, fontSize: 18, textAlign: "center" }}>{errorMessage}</ErrorMessage>
                <ButtonFill onPress={handleEditProfile} style={{ width: "75%", borderColor: "white",backgroundColor:"white", marginTop: "2%",buttonTextColor:COLORS.primary,borderRadius:5}}>Update</ButtonFill>
            </ScrollView>
        </Container>
}





