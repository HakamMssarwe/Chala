import AnimatedLottieView from 'lottie-react-native';
import { ScrollView } from 'native-base';
import React, { useState } from 'react'
import { View, Text, Image, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import AppText from '../../components/AppText';
import ButtonFill from '../../components/ButtonFill';
import ButtonOutline from '../../components/ButtonOutline';
import Container from '../../components/Container'
import ErrorMessage from '../../components/ErrorMessage';
import { TASKS } from '../../constants/routeNames';
import { COLORS, FONTS, Images, SIZES, windowHeight, windowWidth } from '../../constants/themes'
import { setApp } from '../../redux/slices/AppSlice';
import HttpRequest from '../../utils/functions/HttpRequest';

export default function UpdateTask({navigation,route:{params}}) {


    const [title, setTitle] = useState(params.title);
    const [errorMessage, setErrorMessage] = useState("");



    const dispatch = useDispatch();
    let {isLoading} = useSelector((state) => state.app)


    let handleUpdate = async() =>{
        dispatch(setApp({isLoading:true}));

        if (title == "")
        {
            setErrorMessage("Please do not leave the field empty.")
            dispatch(setApp({isLoading:false}));
            return;
        }

        if (title == params.title)
        {
            setErrorMessage("You must change the title in order to update.")
            dispatch(setApp({isLoading:false}));
            return;
        }
        var response = await HttpRequest("/TodoTasks/EditTodoTask","post",{Id:params.id,Title:title,IsFinished:params.isFinished});

        if (response.status != 200)
        {
            setErrorMessage("Something went wrong.")
            dispatch(setApp({isLoading:false}));
            return;
        }

        navigation.replace(TASKS);
    }

    let handleDelete = async() =>{

     dispatch(setApp({isLoading:true}));
     var response = await HttpRequest(`/TodoTasks/DeleteTodoTask/${params.id}`,"post");

     if (response.status != 200)
     {
         setErrorMessage("Something went wrong.")
         dispatch(setApp({isLoading:false}));
         return;
     }

     navigation.replace(TASKS);
    }

    let handleGoBack = () => {
        dispatch(setApp({isLoading:true}));
        navigation.replace(TASKS)
    }

    
    return (isLoading? <AnimatedLottieView source={require('../../assets/splash/loading.json')} autoPlay loop /> :
        <Container style={{flex:1,backgroundColor:"white",justifyContent:"center"}}>
            <ScrollView style={{width:"100%",height:"100%"}} contentContainerStyle={{justifyContent:"flex-start",alignItems:"center",flexGrow:1}}>
            <TouchableOpacity onPress={handleGoBack} style={{width:windowWidth,height:windowHeight *0.15,padding:30}} >
            <AppText style={{width:"100%",color:COLORS.primary,fontSize:25}}>{"<"} Chala</AppText>
            </TouchableOpacity>
            <Image source={Images.creative} style={{width:"80%",height:"40%",marginTop:"10%"}} resizeMode="contain"/>
            <TextInput onChangeText={setTitle} value={title} style={{ width:"80%", borderBottomWidth:1.5,borderColor:COLORS.primary,marginBottom:"5%",fontSize:SIZES.paragraph,color:COLORS.secondary,fontFamily:FONTS.normal,color:COLORS.primary}} placeholder="Task" placeholderTextColor={COLORS.gray    }/>
            <View style={{width:"80%",flexDirection:"row",justifyContent:"space-around",marginBottom:15}}>
            <ButtonFill onPress={handleUpdate} style={{width:"45%",backgroundColor:COLORS.primary,buttonTextColor:"white",marginTop:10}}>Update</ButtonFill>
            <ButtonFill onPress={handleDelete} style={{width:"45%",backgroundColor:COLORS.danger,buttonTextColor:"white",marginTop:10}}>Delete</ButtonFill>
            </View>
            <ErrorMessage style={{color:COLORS.danger,fontSize:18,marginTop:15}}>{errorMessage}</ErrorMessage>

            </ScrollView>
        </Container>
    )
}
