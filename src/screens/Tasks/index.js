import AnimatedLottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppText from '../../components/AppText';
import ButtonFill from '../../components/ButtonFill';
import ButtonOutline from '../../components/ButtonOutline';
import Container from '../../components/Container';
import { ADD_TASK, HOME, UPDATE_TASK } from '../../constants/routeNames';
import { COLORS, Images, SIZES, windowHeight } from '../../constants/themes';
import HttpRequest from '../../utils/functions/HttpRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setApp } from '../../redux/slices/AppSlice';


export default function Tasks({navigation}) {

    const dispatch = useDispatch();
    let {isLoading} = useSelector((state) => state.app)
    const [tasks,setTasks] = useState([]);
    const [userId,setUserId] = useState("")

    useEffect(() => {
     handleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    let handleData = async() => {

        let jsonValue = await AsyncStorage.getItem('@chala');
        let storageData = jsonValue != null ? await JSON.parse(jsonValue) : null;
        setUserId(storageData?.id);

        var response = await HttpRequest(`/TodoTasks/GetAllTodoTasks/${storageData?.id}`);

        if (response.status == 200)
        {
            dispatch(setApp({isLoading:false}));
            setTasks(response.data);
        }
    };


    let handleIsFinished = async(task) => {
        let tempTasks = tasks;

         for(let i = 0; i < tempTasks.length;i++)
             if (tempTasks[i].id == task.id)
                 tempTasks[i].isFinished = !tempTasks[i].isFinished;
            
         
        let updatedTask = tempTasks.find(x => x.id == task.id);
         var response = await HttpRequest("/TodoTasks/EditTodoTask","post",{Id:updatedTask.id,Title:updatedTask.title,IsFinished:updatedTask.isFinished});

         if (response.status == 200)
             setTasks(prevState => [...tempTasks]);
        

    }



    return isLoading? <AnimatedLottieView source={require('../../assets/splash/loading.json')} autoPlay loop /> :
    <Container style={{flex:1,backgroundColor:COLORS.primary}}>
    <View style={{width:"100%",height:windowHeight *0.15,padding:30,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}> 
        <View style={{flexDirection:"row",alignItems:"center"}}>
        <TouchableOpacity onPress={e => navigation.navigate(HOME)}>
        <AppText style={{color:"white",fontSize:25}}>{"<"} Chala</AppText>
        </TouchableOpacity>
        </View>
        <View><ButtonFill onPress={e => navigation.replace(ADD_TASK,userId)} style={{width:100,height:50}}>Add</ButtonFill></View>
    </View>
    <View style={{width:"100%",height:windowHeight *0.85,backgroundColor:"white",borderTopRightRadius:35,borderTopLeftRadius:35}}>
    <View style={{width:"100%",height:"25%",alignItems:"center",padding:30}}>
    <AppText style={{fontSize:SIZES.h1,color:COLORS.primary,fontWeight:"bold"}}>My Tasks</AppText>
    <AppText style={{fontSize:16,color:COLORS.gray,textAlign:"center",marginTop:10}}>Track your Tasks like an Entrepreneur.</AppText>
    </View>
    <FlatList 
    style={{width:"100%",height:windowHeight * 0.25}}
    contentContainerStyle={{alignItems:"center",justifyContent:"flex-start",flexGrow:1}}
    data={tasks}
    renderItem={({item,index}) => {
        return <TouchableOpacity onPress={e => handleIsFinished(item)} onLongPress={e => navigation.replace(UPDATE_TASK,item)} style={{width:"85%",height:windowHeight * 0.1,borderRadius:10,flexDirection:"row",justifyContent:"flex-start",alignItems:"center",backgroundColor:COLORS.primary,marginBottom:10}}>
            <AppText style={{color:"white",width:"100%",fontSize:20,padding:5,paddingLeft:15,textDecorationLine:item.isFinished? 'line-through' : "none", textDecorationStyle: 'solid',textAlign:"left"}}>{item.title}</AppText>
            </TouchableOpacity>
    }}
    />
    </View>
    </Container>
}
