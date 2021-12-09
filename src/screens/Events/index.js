import AnimatedLottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppText from '../../components/AppText';
import ButtonFill from '../../components/ButtonFill';
import ButtonOutline from '../../components/ButtonOutline';
import Container from '../../components/Container';
import { ADD_EVENT, HOME, UPDATE_EVENT } from '../../constants/routeNames';
import { COLORS, Images, SIZES, windowHeight } from '../../constants/themes';
import { setApp } from '../../redux/slices/AppSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpRequest from '../../utils/functions/HttpRequest';
import { Categories } from '../../utils/Arrays';


export default function Events({navigation}) {


    const [userId,setUserId] = useState("");
    const [events,setEvents] = useState([]);



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

        var response = await HttpRequest(`/Event/GetAllEvents/${storageData?.id}`);

        if (response.status == 200)
        {
            dispatch(setApp({isLoading:false}));
            setEvents(response.data);
        }
    };



    return isLoading? <AnimatedLottieView source={require('../../assets/splash/loading.json')} autoPlay loop /> :
    <Container style={{flex:1,backgroundColor:COLORS.primary}}>
    <View style={{width:"100%",height:windowHeight *0.15,padding:30,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}> 
        <View style={{flexDirection:"row",alignItems:"center"}}>
        <TouchableOpacity onPress={e => navigation.navigate(HOME)}>
        <AppText style={{color:"white",fontSize:25}}>{"<"} Chala</AppText>
        </TouchableOpacity>
        </View>
        <View><ButtonFill onPress={e => navigation.replace(ADD_EVENT,userId)} style={{width:100,height:50}}>Add</ButtonFill></View>
    </View>
    <View style={{width:"100%",height:windowHeight *0.85,backgroundColor:"white",borderTopRightRadius:35,borderTopLeftRadius:35}}>
    <View style={{width:"100%",height:"30%",alignItems:"center",padding:30}}>
    <AppText style={{fontSize:SIZES.h1,color:COLORS.primary,fontWeight:"bold"}}>My Events</AppText>
    <AppText style={{fontSize:16,color:COLORS.gray,textAlign:"center",marginTop:10}}>Events happen on special days, if today is that day, you will see it on the schedule!</AppText>
    </View>
    <FlatList 
    style={{width:"100%",height:windowHeight * 0.25}}
    contentContainerStyle={{alignItems:"center",justifyContent:"flex-start",flexGrow:1}}
    data={events}
    renderItem={({item,index}) => {
        return <TouchableOpacity onLongPress={e => navigation.replace(UPDATE_EVENT,item)} style={{width:"80%",borderRadius:30,flexDirection:"row",justifyContent:"space-around",alignItems:"center",height:windowHeight * 0.15,backgroundColor:COLORS.primary,marginBottom:10}}>
            <Image style={{width:80,height:80,borderRadius:50}} source={Categories[item.tagId].imageSource}/>
            <AppText style={{color:"white",fontSize:20}}>{item.title}</AppText>
            </TouchableOpacity>
    }}
    />
    </View>
    </Container>
}
