import AnimatedLottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppText from '../../components/AppText';
import ButtonFill from '../../components/ButtonFill';
import ButtonOutline from '../../components/ButtonOutline';
import Container from '../../components/Container';
import { ADD_ROUTINE, HOME, ROUTINES, UPDATE_ROUTINE } from '../../constants/routeNames';
import { COLORS, Images, SIZES, windowHeight, windowWidth } from '../../constants/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpRequest from '../../utils/functions/HttpRequest';
import { setApp } from '../../redux/slices/AppSlice';
import { Categories } from '../../utils/Arrays';
import Splash from '../../components/Splash';


export default function Routines({navigation}) {


    const [userId,setUserId] = useState("");
    const [routines,setRoutines] = useState([]);


    const dispatch = useDispatch();
    let {isLoading} = useSelector((state) => state.app)


    useEffect(() => {

        handleData();
       // eslint-disable-next-line react-hooks/exhaustive-deps
       },[])


       let handleData = async() => {

        let jsonValue = await AsyncStorage.getItem('@chala');
        let storageData = jsonValue != null ? await JSON.parse(jsonValue) : null;
        setUserId(storageData?.id);

        var response = await HttpRequest(`/Routines/GetAllRoutines/${storageData?.id}`);

        if (response.status == 200)
        {
            dispatch(setApp({isLoading:false}));
            setRoutines(response.data);
        }
    };




    return isLoading? <Splash/> :
    <Container style={{flex:1,backgroundColor:COLORS.primary}}>
    <View style={{width:"100%",height:windowHeight *0.15,padding:30,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}> 
        <View style={{flexDirection:"row",alignItems:"center"}}>
        <TouchableOpacity onPress={e => navigation.navigate(HOME)}>
        <AppText style={{color:"white",fontSize:25}}>{"<"} Chala</AppText>
        </TouchableOpacity>
        </View>
        <View><ButtonFill onPress={e => navigation.replace(ADD_ROUTINE,{userId:userId,route:ROUTINES})} style={{width:100,height:50}}>Add</ButtonFill></View>
    </View>
    <View style={{width:"100%",height:windowHeight *0.85,backgroundColor:"white",borderTopRightRadius:35,borderTopLeftRadius:35}}>
    <View style={{width:"100%",height:"30%",alignItems:"center",padding:30}}>
    <AppText style={{fontSize:SIZES.h1,color:COLORS.primary,fontWeight:"bold"}}>My Routines</AppText>
    <AppText style={{fontSize:16,color:COLORS.gray,textAlign:"center",marginTop:10}}>By setting up a Routine it will automatically be added to the schedule based on the date and time selected.</AppText>
    </View>
    <FlatList 
    style={{width:"100%",height:windowHeight * 0.25}}
    numColumns={2}
    contentContainerStyle={{alignItems:"center",justifyContent:"flex-start",flexGrow:1}}
    data={routines}
    renderItem={({item,index}) => {
        return <TouchableOpacity onLongPress={e => navigation.replace(UPDATE_ROUTINE,{...item,route:ROUTINES})} style={{width:windowWidth * 0.45,borderRadius:30,height:windowHeight * 0.2,backgroundColor:item.isActive?COLORS.primary:COLORS.gray,margin:10,marginBottom:10,justifyContent:"flex-start",alignItems:"center",borderWidth:2,borderColor:item.isActive?COLORS.primary:COLORS.gray}}>
            <Image style={{width:80,height:80,width:"100%",borderTopRightRadius:30,borderTopLeftRadius:30}} source={Categories[item.tagId].imageSource}/>
            <AppText style={{color:"white",fontSize:20,textAlign:"center",paddingTop:10}}>{item.title}</AppText>
            </TouchableOpacity>
    }}
    />
    </View>
    </Container>
}
