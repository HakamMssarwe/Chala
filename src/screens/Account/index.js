/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { ScrollView, TextInput, TouchableOpacity, Animated, Easing, View, Text, Image } from 'react-native'
import Container from '../../components/Container'
import { COLORS, FONTS, Images, windowHeight,windowWidth } from '../../constants/themes'
import style from './style'
import { AUTH, EDIT_PROFILE, HOME, LOGIN, SIGNUP, UPDATE_PASSWORD, UPDATE_PASSWORD_SETTINGS_SCREEN } from '../../constants/routeNames'
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpRequest from '../../utils/functions/HttpRequest'
import { useDispatch } from 'react-redux'
import { setApp } from '../../redux/slices/AppSlice'
import AppText from '../../components/AppText'
 

export default function Account({ navigation }) {
    const dispatch = useDispatch();
    const [user, setUser] = useState("")

    useEffect(() => {
        async function getUserNameFromLocalStorage() {
            let jsonValue = await AsyncStorage.getItem('@chala');
            let storageData = jsonValue != null ? await JSON.parse(jsonValue) : null;
            if (storageData != null) {
                dispatch(setApp({ isLoading: true }))
                let response = await HttpRequest(`Users/GetUserById/${storageData.id}`);
                switch (response.status) {
                    case 200:
                        await setUser(response.data)
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


    const handleSignout = async() => {
        await AsyncStorage.clear();
        dispatch(setApp({isLoggedIn:false}))
        
    }

    let handleGoBack = () => {
        dispatch(setApp({isLoading:true}));
        navigation.replace(HOME)
       }





    return (
        <Container style={{backgroundColor:"white"}}>
        <View style={{width:"100%",height:windowHeight *0.15,padding:30,flexDirection:"row",justifyContent:"space-between",alignItems:"center",backgroundColor:COLORS.primary}}> 
            <View style={{flexDirection:"row",alignItems:"center"}}>
            <TouchableOpacity onPress={e => navigation.navigate(HOME)}>
            <AppText style={{color:"white",fontSize:25}}>{"<"} Chala</AppText>
            </TouchableOpacity>
            </View>
        </View>
            <ScrollView style={{ width: "100%", height: windowHeight * 0.85,backgroundColor:COLORS.primary }} contentContainerStyle={{ flex: 1, justifyContent: "center" }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:"white",borderTopRightRadius:35,borderTopLeftRadius:35 }}>
                    <Image source={Images.settings} style={{ width: "80%", height: 300,borderTopRightRadius:35,borderTopLeftRadius:35}} resizeMode='contain' />
                    <View style={{ width: windowWidth, height: windowHeight / 3, display: "flex", flex: 1, backgroundColor: "white",alignItems:"center" }}>
                        <View style={{ width:"80%",height: windowHeight * 0.1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <TouchableOpacity onPress={() => navigation.navigate(EDIT_PROFILE)} style={{ display: "flex",backgroundColor:COLORS.secondary,width:"100%",height:windowHeight * 0.1,alignItems:"center", justifyContent: "space-between", flexDirection: "row", width: windowWidth,marginBottom:10,alignSelf:"center" }}>
                                <AppText style={{ fontSize: 16, color: COLORS.primary, marginLeft: 10, fontFamily: FONTS.normal }}>Edit Profile</AppText>
                                <AppText style={{ fontSize: 16, color: COLORS.primary, paddingRight: 28, fontFamily: FONTS.normal }}>{">"}</AppText>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate(UPDATE_PASSWORD_SETTINGS_SCREEN, { Email: user?.email })} style={{ display: "flex",backgroundColor:COLORS.secondary,width:"100%",height:windowHeight * 0.1,alignItems:"center", justifyContent: "space-between", flexDirection: "row", width: windowWidth,alignSelf:"center" }}>
                                <AppText style={{ fontSize: 16, color: COLORS.primary, marginLeft: 10, fontFamily: FONTS.normal }}>Change Password</AppText>
                                <AppText style={{ fontSize: 16, color: COLORS.primary, paddingRight: 28, fontFamily: FONTS.normal }}>{">"}</AppText>
                            </TouchableOpacity>

                        </View>

                        <TouchableOpacity onPress={handleSignout} style={{ position: "absolute", alignItems: "center", justifyContent: "center", bottom: 15, borderColor: COLORS.danger,backgroundColor:COLORS.danger, borderWidth: 1, borderRadius:5, padding:10, alignSelf:"center" }}>
                            <AppText style={{color: "white",fontSize:16}}>Sign out</AppText>
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


