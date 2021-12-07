/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { ScrollView, TextInput, TouchableOpacity, Animated, Easing, View, Text } from 'react-native'
import Banner from '../../components/Banner'
import ButtonFill from '../../components/ButtonFill'
import ButtonOutline from '../../components/ButtonOutline'
import Container from '../../components/Container'
import WhiteLogo from '../../components/WhiteLogo'
import PrimaryLogo from '../../components/PrimaryLogo'
import { COLORS, windowHeight } from '../../constants/themes'
import style from './style'
import { LOGIN, SIGNUP } from '../../constants/routeNames'
import { useIsFocused } from '@react-navigation/core'
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpRequest from '../../utils/functions/HttpRequest'


export default function Settings({ navigation }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [user, setUser] = useState("")
    useEffect(() => {
        async function getUserNameFromLocalStorage() {
            let jsonValue = await AsyncStorage.getItem('@chala');
            let storageData = jsonValue != null ? await JSON.parse(jsonValue) : null;
            console.log(storageData);
            if (storageData != null) {
                let user = await HttpRequest(`Users/GetUserById/${storageData.id}`);
                setUser(user)
                console.log(user);
            }
            else
                return;
        }

        getUserNameFromLocalStorage()
    }, [])

    return (
        <Container>
            <ScrollView style={{ width: "100%", height: windowHeight }} contentContainerStyle={{ flex: 1, justifyContent: "center" }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ImageHeaderScrollView
                        maxHeight={300}
                        width={windowWidth}
                        minHeight={100}
                        headerImage={require("../../assets/images/backgroundBanner.jpg")}
                        renderForeground={() => (
                            <View style={{ height: 150, justifyContent: "center", alignItems: "center" }} >
                                <TouchableOpacity onPress={() => console.log("tap!!")}>
                                    <Text style={{ backgroundColor: "transparent" }}>{user?.firstName}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    >
                        <View style={{ height: windowHeight }}>
                            {/* <TriggeringView onHide={() => console.log("text hidden")}>
                                <Text>Scroll Me!</Text>
                            </TriggeringView> */}
                            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>Update Password:</Text>
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <ButtonFill onPress={() => { }} style={{ width: windowWidth / 2, borderColor: COLORS.primary, marginTop: "2%" }}>hi</ButtonFill>
                            </View>
                            {/* <ButtonOutline>bye</ButtonOutline> */}
                        </View>
                    </ImageHeaderScrollView>
                </View>
            </ScrollView>
        </Container>
    )
}


