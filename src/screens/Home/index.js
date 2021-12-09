/* eslint-disable react-hooks/exhaustive-deps */
import AnimatedLottieView from 'lottie-react-native'
import React, { useEffect } from 'react'
import { View, Text, ScrollView,TouchableOpacity, Image, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import AppText from '../../components/AppText';
import Container from '../../components/Container'
import { ACCOUNT, EVENTS, ROUTINES, SCHEDULE, TASKS } from '../../constants/routeNames';
import { COLORS, SIZES, windowHeight, windowWidth } from '../../constants/themes';
import { Images } from '../../constants/themes';
import { setApp } from '../../redux/slices/AppSlice';

export default function Home({navigation}) {
    const dispatch = useDispatch();
    let {isLoading} = useSelector((state) => state.app)


    useEffect(() => {
        dispatch(setApp({isLoading:false}))
    },[])


    const data = [
        {image:Images.schedule,title:"My Schedule",descreption:"Being on time and having an organized schedule is one of the keys for a happy healthy life.",button:{text:"Start Planning",destination:SCHEDULE}},
        {image:Images.routine,title:"My Routines",descreption:"There are things in life we cannot skip, like work.",button:{text:"Setup",destination:ROUTINES}},
        {image:Images.event,title:"My Events",descreption:"Who doesn't love special days?",button:{text:"Add",destination:EVENTS}},
        {image:Images.task,title:"My Tasks",descreption:"Things one's must complete.",button:{text:"Update",destination:TASKS}},
        {image:Images.account,title:"My Account",descreption:"A Little-bit of freedom.",button:{text:"Manage",destination:ACCOUNT}},
    
    ]


    let handleNavigation = async(destination) =>{
        await dispatch(setApp({isLoading:true}));
        navigation.navigate(destination);

    }



    return  isLoading? <AnimatedLottieView source={require('../../assets/splash/loading.json')} autoPlay loop /> :
        <Container style={{backgroundColor:"white"}}>
        <FlatList 
        style={{flex:1,height:windowHeight,width:windowWidth}}
        contentContainerStyle={{justifyContent:"center"}} 
        horizontal
        pagingEnabled
        data={data}
        
        renderItem={({item}) => (
        <View style={{flex:1,width:windowWidth,backgroundColor:COLORS.primary,alignItems:"center",justifyContent:"space-evenly"}}>
        <View style={{width:"80%",height:windowHeight/1.5,position:"relative",justifyContent:"center",alignItems:"center",borderRadius:30,backgroundColor:"white"}}>
        <Image source={item.image} style={{width:"100%",height:"50%"}} resizeMode="contain"/>
        <AppText style={{fontSize:22}}>{item.title}</AppText>
        <AppText style={{fontSize:16,textAlign:"center",padding:10,color:COLORS.gray}}>{item.descreption}</AppText>
        <TouchableOpacity onPress={e => handleNavigation(item.button.destination)} style={{width:"50%",height:50,position:"absolute",bottom:-20,borderRadius:30,justifyContent:"center",backgroundColor:COLORS.orange}}>
        <AppText style={{color:COLORS.secondary,textAlign:"center",fontSize:16}}>{item.button.text}</AppText>
        </TouchableOpacity>
        </View>
        </View>
        )}/>
        
        </Container>
    
}


