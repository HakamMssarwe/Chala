/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { ScrollView, TextInput, TouchableOpacity, Animated, Easing, View, Text, Image } from 'react-native'
import Banner from '../../components/Banner'
import ButtonFill from '../../components/ButtonFill'
import ButtonOutline from '../../components/ButtonOutline'
import Container from '../../components/Container'
import WhiteLogo from '../../components/WhiteLogo'
import PrimaryLogo from '../../components/PrimaryLogo'
import { COLORS, FONTS, Images, windowHeight } from '../../constants/themes'
import style from './style'
import { AUTH, EDIT_PROFILE, LOGIN, SIGNUP, UPDATE_PASSWORD, UPDATE_PASSWORD_SETTINGS_SCREEN } from '../../constants/routeNames'
import { useIsFocused } from '@react-navigation/core'
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpRequest from '../../utils/functions/HttpRequest'
import { useDispatch } from 'react-redux'
import { setApp } from '../../redux/slices/AppSlice'
import AppText from '../../components/AppText'


export default function Account({ navigation }) {
    const dispatch = useDispatch();
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [user, setUser] = useState("")
    useEffect(() => {
        async function getUserNameFromLocalStorage() {
            let jsonValue = await AsyncStorage.getItem('@chala');
            let storageData = jsonValue != null ? await JSON.parse(jsonValue) : null;
            console.log(storageData);
            if (storageData != null) {
                dispatch(setApp({ isLoading: true }))
                let response = await HttpRequest(`Users/GetUserById/${storageData.id}`);
                switch (response.status) {
                    case 200:
                        await setUser(response.data)
                        console.log(user);
                        break;
                    default:

                        break;
                }
                dispatch(setApp({ isLoading: false }))
            }
        }

        getUserNameFromLocalStorage()
        dispatch(setApp({ isLoading: false }))

    }, [])


    const handleSignout = () => {
        AsyncStorage.clear();
        navigation.navigate(AUTH);
    }




    return (
        <Container>
            <ScrollView style={{ width: "100%", height: windowHeight }} contentContainerStyle={{ flex: 1, justifyContent: "center" }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>


                    <Image source={Images.settings} style={{ width: windowWidth, height: windowHeight * 0.40 }} />


                    <View style={{ width: windowWidth, height: windowHeight / 3, display: "flex", flex: 1, backgroundColor: COLORS.secondary }}>



                        {/* ACCOUNT SECTION */}
                        <Text style={{ fontSize: 18, marginLeft: 12, width: windowWidth }}> <Image style={{ width: 30, height: 30, marginRight: 20 }}
                            source={require('../../assets/images/Settings/account.png')} /><Text style={{ fontSize: 25, marginLeft: 12, padding: 20, fontFamily: FONTS.normal }}> Account</Text></Text>

                        {/* Black bar */}
                        <View style={{ display: "flex", alignItems: "center", margin: 15 }}>
                            <Text style={{ backgroundColor: "gray", height: 1, width: windowWidth * 0.91 }}></Text>
                        </View>

                        <View style={{ height: windowHeight * 0.1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <TouchableOpacity onPress={() => navigation.navigate(EDIT_PROFILE)} style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", width: windowWidth, marginLeft: 9 }}>
                                <AppText style={{ fontSize: 16, color: COLORS.primary, marginLeft: 10, fontFamily: FONTS.normal }}>Edit Profile</AppText>
                                <AppText style={{ fontSize: 16, color: COLORS.primary, paddingRight: 28, fontFamily: FONTS.normal }}>{">"}</AppText>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate(UPDATE_PASSWORD_SETTINGS_SCREEN, { Email: user?.email })} style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", width: windowWidth, marginLeft: 9 }}>
                                <AppText style={{ fontSize: 16, color: COLORS.primary, marginLeft: 10, fontFamily: FONTS.normal }}>Change Password</AppText>
                                <AppText style={{ fontSize: 16, color: COLORS.primary, paddingRight: 28, fontFamily: FONTS.normal }}>{">"}</AppText>
                            </TouchableOpacity>

                        </View>

                        <TouchableOpacity onPress={handleSignout} style={{ position: "absolute", alignItems: "center", justifyContent: "center", bottom: 15, borderColor: COLORS.primary, borderWidth: 1, borderRadius:5, padding:10, alignSelf:"center" }}>
                            <AppText style={{color: COLORS.danger}}>LOGOUT <Image style={{ width: 20, height: 20, marginRight: 20 }}
                                source={require('../../assets/images/Settings/logout.png')} />
                            </AppText>
                        </TouchableOpacity>
                    </View>









                    {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <ButtonFill onPress={() => { }} style={{ width: windowWidth / 2, borderColor: COLORS.primary, marginTop: "2%" }}>Update</ButtonFill>
                            </View>
                            <ButtonOutline>bye</ButtonOutline> */}
                </View>
            </ScrollView>
        </Container>
    )
}


