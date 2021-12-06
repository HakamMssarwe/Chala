import AnimatedLottieView from 'lottie-react-native';
import { ScrollView } from 'native-base';
import React from 'react'
import { View, Text, Image, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import AppText from '../../components/AppText';
import ButtonFill from '../../components/ButtonFill';
import ButtonOutline from '../../components/ButtonOutline';
import Container from '../../components/Container'
import { COLORS, FONTS, Images, SIZES, windowHeight, windowWidth } from '../../constants/themes'

export default function UpdateTask({navigation}) {

    const dispatch = useDispatch();
    let {isLoading} = useSelector((state) => state.app)


    return (isLoading? <AnimatedLottieView source={require('../../assets/splash/loading.json')} autoPlay loop /> :
        <Container style={{flex:1,backgroundColor:"white",justifyContent:"center"}}>
            <ScrollView style={{width:"100%",height:"100%"}} contentContainerStyle={{justifyContent:"flex-start",alignItems:"center",flexGrow:1}}>
            <TouchableOpacity style={{width:windowWidth,height:windowHeight *0.15,padding:30}} onPress={e => navigation.goBack()}>
            <AppText style={{width:"100%",color:COLORS.primary,fontSize:25}}>{"<"} Chala</AppText>
            </TouchableOpacity>
            <Image source={Images.creative} style={{width:"80%",height:"40%",marginTop:"10%"}} resizeMode="contain"/>
            <TextInput style={{ width:"80%", borderBottomWidth:1.5,borderColor:COLORS.primary,marginBottom:"5%",fontSize:SIZES.paragraph,color:COLORS.secondary,fontFamily:FONTS.normal,color:COLORS.primary}} placeholder="Task" placeholderTextColor={COLORS.gray    }/>
            <View style={{width:"80%",flexDirection:"row",justifyContent:"space-around"}}>
            <ButtonFill style={{width:"45%",backgroundColor:COLORS.primary,buttonTextColor:"white",marginTop:10}}>Update</ButtonFill>
            <ButtonFill style={{width:"45%",backgroundColor:COLORS.danger,buttonTextColor:"white",marginTop:10}}>Delete</ButtonFill>
            </View>
            </ScrollView>
        </Container>
    )
}
