/* eslint-disable react-hooks/exhaustive-deps */
import AnimatedLottieView from 'lottie-react-native';
import { ScrollView } from 'native-base';
import React, { useEffect, useState } from 'react'
import { View, Text, Image, TextInput, TimePickerAndroid, Platform } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import AppText from '../../components/AppText';
import ButtonFill from '../../components/ButtonFill';
import ButtonOutline from '../../components/ButtonOutline';
import Container from '../../components/Container'
import { COLORS, FONTS, Images, SIZES, Tags, windowHeight, windowWidth } from '../../constants/themes'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Categories } from '../../utils/Arrays';
import { EVENTS } from '../../constants/routeNames';
import { setApp } from '../../redux/slices/AppSlice';
import ErrorMessage from '../../components/ErrorMessage';
import HttpRequest from '../../utils/functions/HttpRequest';

export default function UpdateEvent({navigation,route:{params}}) {

    const dispatch = useDispatch();
    let {isLoading} = useSelector((state) => state.app)
    const [time,setTime] = useState(new Date(parseFloat(params.startHour)))
    const [date,setDate] = useState(new Date(params.date))
    const [showTime,setShowTime] = useState(false);
    const [showDate,setShowDate] = useState(false);
    const [title,setTitle] = useState(params.title);
    const [selectedTag,setSelectedTag] = useState(params.tagId);
    const [errorMessage,setErrorMessage] = useState("");
    
    const handleTime = (event, selectedDate) => {
        const currentTime = selectedDate || time;
        setShowTime(Platform.OS === 'ios');
        setTime(currentTime);
      };


      const handleDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === 'ios');
     setDate(currentDate);
      };


      let handleGoBack = () => {
        dispatch(setApp({isLoading:true}));
        navigation.replace(EVENTS)
       }


      const handleUpdate = async() => {
          dispatch(setApp({isLoading:true}));

          if (title == "")
          {
              setErrorMessage("Please do not leave the title field empty.")
              dispatch(setApp({isLoading:false}))
              return;
          }
 
          if (date == null || time == null )
          {
              setErrorMessage("Please select a valid date and time.")
              dispatch(setApp({isLoading:false}))
              return;
          }

          if (selectedTag == null)
          {
              setErrorMessage("You must select a tag that best describes the activity.")
              dispatch(setApp({isLoading:false}))
              return;
          }


          var response = await HttpRequest(`/Event/EditEventById`,"post",{Id:params.id,Title:title,TagId:selectedTag,StartHour:time.getTime(),Date:date.toJSON()})


          if (response.status != 200)
          {
              setErrorMessage(response.data)
              dispatch(setApp({isLoading:false}))
              return;

          }


          navigation.replace(EVENTS)
      }


      let handleDelete = async() =>{

        dispatch(setApp({isLoading:true}));
        var response = await HttpRequest(`/Event/DeleteEventById/${params.id}`,"post");
   
        if (response.status != 200)
        {
            setErrorMessage("Something went wrong.")
            dispatch(setApp({isLoading:false}));
            return;
        }
   
        navigation.replace(EVENTS);
       }
   


    return (isLoading? <AnimatedLottieView source={require('../../assets/splash/loading.json')} autoPlay loop /> :
        <Container style={{flex:1,backgroundColor:COLORS.primary,justifyContent:"center"}}>
            <TouchableOpacity style={{width:windowWidth,height:windowHeight *0.15,padding:30}} onPress={handleGoBack}> 
            <AppText style={{width:"100%",color:"white",fontSize:25}}>{"<"} Chala</AppText>
            </TouchableOpacity>
            <ScrollView style={{width:"100%",backgroundColor:"white",borderTopRightRadius:35,borderTopLeftRadius:35}} contentContainerStyle={{justifyContent:"center",alignItems:"center",flexGrow:1}}>
            <Image source={Categories.filter(x => x.tagId == params.tagId)[0].imageSource} style={{width:"80%",height:250,marginTop:"10%"}} resizeMode="contain"/>
             <TextInput onChangeText={setTitle} value={title} style={{ width:"80%", borderBottomWidth:1.5,borderColor:COLORS.primary,marginBottom:"5%",fontSize:SIZES.paragraph,color:COLORS.secondary,fontFamily:FONTS.normal,color:COLORS.primary}} placeholder="Event" placeholderTextColor={COLORS.gray}/>
            <View style={{width:"100%",marginTop:15,flexDirection:"row",justifyContent:"space-evenly"}}>
            <ButtonFill onPress={e => setShowTime(true)} style={{width:"35%",borderColor:COLORS.primary,buttonTextColor:COLORS.primary}}>{time == null? "Time" : `${time.getHours()}:${time.getMinutes() < 10? "0" + time.getMinutes() : time.getMinutes()}`}</ButtonFill>
            <ButtonFill onPress={e => setShowDate(true)} style={{width:"35%",backgroundColor:COLORS.primary,buttonTextColor:"white"}}>{date == null? "Date" : date.toLocaleDateString()}</ButtonFill>
             </View>
            <AppText style={{width:"100%",textAlign:"center",color:COLORS.primary,fontSize:18,marginTop:30}}>Select a Category</AppText>
            <View style={{width:windowWidth,padding:10,flexDirection:"row",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
            {Categories.map((item) => {
                return <TouchableOpacity onPress={e => setSelectedTag(item.tagId)} key={item.tagId} style={{width:70,height:70,margin:5,borderWidth:selectedTag == item.tagId? 4 : 1,borderColor:COLORS.primary,padding:10,borderRadius:5}}>
                <Image source={item.imageSource} style={{width:"100%",height:"100%"}}/>
                </TouchableOpacity>
            })}
            </View>
            {showTime && <DateTimePicker value={time == null? new Date() : time} onChange={handleTime} mode="time" is24Hour={true}/>}
            {showDate && <DateTimePicker value={date == null? new Date() : date} onChange={handleDate} mode="date"/>}
            <View style={{width:"80%",flexDirection:"row",justifyContent:"space-around",marginBottom:15}}>
            <ButtonFill onPress={handleUpdate} style={{width:"45%",backgroundColor:COLORS.primary,buttonTextColor:"white",marginTop:10}}>Update</ButtonFill>
            <ButtonFill onPress={handleDelete} style={{width:"45%",backgroundColor:COLORS.danger,buttonTextColor:"white",marginTop:10}}>Delete</ButtonFill>
            </View>
            <ErrorMessage style={{color:COLORS.danger,fontSize:18,marginBottom:5,textAlign:"center"}}>{errorMessage}</ErrorMessage>
            </ScrollView>
        </Container> 
    )
}
