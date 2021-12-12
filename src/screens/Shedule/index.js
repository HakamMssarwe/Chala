import AnimatedLottieView from 'lottie-react-native'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppText from '../../components/AppText';
import Container from '../../components/Container'
import { ADD_EVENT,  EVENTS, ROUTINES, SCHEDULE, UPDATE_EVENT, UPDATE_ROUTINE } from '../../constants/routeNames';
import { COLORS, Images, windowHeight, windowWidth } from '../../constants/themes'
import { setApp } from '../../redux/slices/AppSlice';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {Categories} from '../../utils/Arrays'
import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpRequest from '../../utils/functions/HttpRequest';
import { StatusBar } from 'native-base';
import Splash from '../../components/Splash';
import ButtonFill from '../../components/ButtonFill';


export default function Schedule({navigation}) {


    const [currentDate,setCurrentDate] = useState(Date());
    const [userId,setUserId] = useState("");
    const [data,setData] = useState([])
    const [message,setMessage] = useState("It looks like you're free today, hooray!");
    
    const dispatch = useDispatch();
    let {isLoading} = useSelector((state) => state.app)
    const components = [{name:SCHEDULE},{name:SCHEDULE + "List"}]
    let flatListRef = useRef(null)
    let scrollViewRef = useRef(null)


    // const data = [
    //     {id:1,type:0,tagId:1,title:"Work",startHour:"9:00"},
    //     {id:2,type:1,tagId:2,title:"Shopping",startHour:"14:00"},
    //     {id:3,type:1,tagId:2,title:"Shopping",startHour:"14:00"},
    //     {id:4,type:1,tagId:2,title:"Shopping",startHour:"14:00"},
    //     {id:5,type:1,tagId:2,title:"Shopping",startHour:"14:00"},
    // ]


    useEffect(() => {
        handleData();
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    

    
    let handleData = async()=>{
        dispatch(setApp({isLoading:true}))
        
        let jsonValue = await AsyncStorage.getItem('@chala');
        let storageData = jsonValue != null ? await JSON.parse(jsonValue) : null;
        setUserId(storageData?.id);


        var response = await HttpRequest(`/Schedules/GetByDate`,"post",{UserId:storageData?.id,Date:new Date().toJSON()});


        if (response.status != 200)
        {
            setMessage("Something went wrong!");
            dispatch(setApp({isLoading:false}))
            return;
        }
        

        setData(response.data);
        dispatch(setApp({isLoading:false}))
    }

    
    
        let changeDate = async(data) => {
            dispatch(setApp({isLoading:true}))
            
            let date = data.dateString;
            setCurrentDate(date)
            
            
            var response = await HttpRequest(`/Schedules/GetByDate`,"post",{UserId:userId,Date:new Date(date).toJSON()});
            
            
            if (response.status != 200)
            {
                setMessage("Something went wrong!");
                dispatch(setApp({isLoading:false}))
                return;
            }
            
            
            //Scroll down to view the events & routines for the current date
            setData(response.data);
            dispatch(setApp({isLoading:false}))
            setTimeout(() => {
                flatListRef.current.scrollToIndex({animated:true,index:1})
            }, 300);
    
        }




    return isLoading? <Splash/> :
    <Container style={{flex:1,backgroundColor:"white",showStatusBar:false}}>
    <View style={{width:"100%",height:windowHeight *0.15,padding:30,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}> 
        <View style={{flexDirection:"row",alignItems:"center"}}>
        <TouchableOpacity onPress={navigation.goBack}>
        <AppText style={{color:COLORS.primary,fontSize:25}}>{"<"} Chala</AppText>
        </TouchableOpacity>
        </View>
    </View>
        <FlatList 
        style={{width:"100%"}} 
        keyExtractor={item => item.name}
        pagingEnabled
        nestedScrollEnabled
        ref={flatListRef}
        data={components}
        renderItem={({item,index}) => {
            return item.name == SCHEDULE? 
            <View style={{width:"100%",height:windowHeight * 0.85,backgroundColor:"white"}}>
                <Image source={Images.schedule} alt="Banner" style={{width:"50%",height:windowHeight * 0.3,alignSelf:"center"}}/>
                <CalendarList
                current={currentDate}
                onDayPress={changeDate}
                horizontal={true}
                pagingEnabled={true}
                theme={{
                todayTextColor:"white",
                todayBackgroundColor:COLORS.primary,
                selectedDayTextColor: 'white',
                selectedDayBackgroundColor: COLORS.orange
                }}
                />
            </View>:
            data.length == 0?  
            <>
            <ButtonFill onPress={e => navigation.replace(ADD_EVENT,{userId:userId,route:SCHEDULE})} style={{width:"75%",marginBottom:10,borderRadius:15,height:windowHeight * 0.08,alignSelf:"center",borderColor:COLORS.orange,backgroundColor:COLORS.orange,marginTop:"2%",buttonTextColor:"white"}}>Add Event</ButtonFill>
            <AppText style={{color:COLORS.gray,textAlign:"center"}}>{message}</AppText>
            </>
             :
            <>
            <ButtonFill onPress={e => navigation.replace(ADD_EVENT,{userId:userId,route:SCHEDULE})} style={{width:"75%",marginBottom:10,borderRadius:15,height:windowHeight * 0.08,alignSelf:"center",borderColor:COLORS.orange,backgroundColor:COLORS.orange,marginTop:"2%",buttonTextColor:"white"}}>Add Event</ButtonFill>
            <ScrollView style={{width:"100%",height:windowHeight * 0.75 ,borderTopRightRadius:35,borderTopLeftRadius:35}} 
            nestedScrollEnabled
            ref={scrollViewRef}
            >
                {data.sort((a,b) => a.timeInMinutes - b.timeInMinutes).map(item => {

                    let time = new Date(parseFloat(item.startHour))
                    let hours = time.getHours();
                    let minutes = time.getMinutes();
                    let ampm = hours >= 12 ? 'pm' : 'am';
                    hours = hours % 12;
                    hours = hours ? hours : 12; 
                    minutes = minutes < 10 ? '0'+minutes : minutes;
                    let strTime = hours + ':' + minutes + ' ' + ampm;

                    return <TouchableOpacity onLongPress={e => navigation.replace(item.type === 0? UPDATE_ROUTINE : UPDATE_EVENT ,{...item,route:SCHEDULE})} style={{flexDirection:"row",alignItems:"center",justifyContent:"center",backgroundColor:"white",width:windowWidth*0.95,height:windowHeight * 0.2,alignSelf:"center",borderRadius:30,margin:10,borderWidth:1,borderColor:COLORS.primary,padding:5}} key={item.id}>
                    <Image source={Categories[item.tagId].imageSource} alt="banner" style={{width:"50%",height:110,borderRadius:25}} />
                    <View style={{width:"50%",justifyContent:"center",alignItems:"center",padding:10}}>
                    <AppText style={{color:COLORS.primary,fontSize:25,textAlign:"center"}}>{item.title}</AppText>
                    <AppText style={{textAlign:"center",fontSize:22,color:COLORS.orange,textAlign:"center"}}>{strTime}</AppText>
                    </View>
                </TouchableOpacity>
                })}
            </ScrollView>
            </>
        }}
        />

    </Container>
}
