import AnimatedLottieView from 'lottie-react-native';
import { ScrollView } from 'native-base';
import React, { useEffect, useState } from 'react'
import { View, Text, Image, TextInput, Platform } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import AppText from '../../components/AppText';
import ButtonFill from '../../components/ButtonFill';
import ButtonOutline from '../../components/ButtonOutline';
import Container from '../../components/Container'
import { COLORS, FONTS, Images, SIZES, Tags, windowHeight, windowWidth } from '../../constants/themes'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Categories, Days } from '../../utils/Arrays';
import ErrorMessage from '../../components/ErrorMessage';
import { setApp } from '../../redux/slices/AppSlice';
import { ROUTINES } from '../../constants/routeNames';
import HttpRequest from '../../utils/functions/HttpRequest';

export default function AddRoutine({navigation,route:{params}}) {

    const dispatch = useDispatch();
    let {isLoading} = useSelector((state) => state.app)
    const [time,setTime] = useState(null)
    const [showTime,setShowTime] = useState(false);
    const [title,setTitle] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const [selectedTag,setSelectedTag] = useState(null);
    const [sunday,setSunday] = useState(false);
    const [monday,setMonday] = useState(false);
    const [tuesday,setTuesday] = useState(false);
    const [wedensday,setWedensday] = useState(false);
    const [thursday,setThursday] = useState(false);
    const [friday,setFriday] = useState(false);
    const [saturday,setSaturday] = useState(false);

    const handleTime = (event, selectedDate) => {
        const currentTime = selectedDate || time;
        setShowTime(Platform.OS === 'ios');
        setTime(currentTime);
      };


      let handleGoBack = () => {
        dispatch(setApp({isLoading:true}));
        navigation.replace(ROUTINES)
       }


      let handleDays = (day) => { 

        switch(day)
        {
            case 0:
                setSunday((prevState) => (!prevState))
                break;
            case 1:
                setMonday((prevState) => (!prevState))
                break;
            case 2:
                setTuesday((prevState) => (!prevState))
                break;
            case 3:
                setWedensday((prevState) => (!prevState))
                break;
            case 4:
                setThursday((prevState) => (!prevState))
                break;
            case 5:
                setFriday((prevState) => (!prevState))
                break;
            case 6:
                setSaturday((prevState) => (!prevState))
                break;
        }

      }

      let handleSelectedDayStyle = (day) => {
        switch(day)
        {
            case 0:
               return sunday;
            case 1:
                return monday;
            case 2:
                return tuesday;
            case 3:
                return wedensday
            case 4:
                return thursday;
            case 5:
                return friday;
            case 6:
                return saturday;
        }
      }

       const handleAddingRoutine = async() => {
        dispatch(setApp({isLoading:true}));

        if (title == "")
        {
            setErrorMessage("Please do not leave the title field empty.")
            dispatch(setApp({isLoading:false}))
            return;
        }
        

        if (time == null )
        {
            setErrorMessage("Please select a valid time.")
            dispatch(setApp({isLoading:false}))
            return;
        }


        if (selectedTag == null)
        {
            setErrorMessage("You must select a tag that best describes the activity.")
            dispatch(setApp({isLoading:false}))
            return;
        }


        let isActive = false;

        if (sunday)
          isActive = true;

        else if (monday)
        isActive = true;

        else if (tuesday)
        isActive = true;

        else if (wedensday)
        isActive = true;

        else if (thursday)
        isActive = true;

        else if (friday)
        isActive = true;

        else if (saturday)
        isActive = true;


        var response = await HttpRequest("/Routines/CreateRoutine","post",{Title:title,UserId:params,TagId:selectedTag,StartHour:time.getTime(),Sunday:sunday,Monday:monday,Tuesday:tuesday,Wedensday:wedensday,Thursday:thursday,Friday:friday,Saturday:saturday,IsActive:isActive})

        if (response.status != 200)
        {
            setErrorMessage("Something went wrong.")
            dispatch(setApp({isLoading:false}))
            return;

        }

        setTitle("");
        navigation.replace(ROUTINES)
    }





    return (isLoading? <AnimatedLottieView source={require('../../assets/splash/loading.json')} autoPlay loop /> :
        <Container style={{flex:1,backgroundColor:COLORS.primary,justifyContent:"center"}}>
            <TouchableOpacity style={{width:windowWidth,height:windowHeight *0.15,padding:30}} onPress={handleGoBack}>
            <AppText style={{width:"100%",color:"white",fontSize:25}}>{"<"} Chala</AppText>
            </TouchableOpacity>
            <ScrollView style={{width:"100%",backgroundColor:"white",borderTopRightRadius:35,borderTopLeftRadius:35}} contentContainerStyle={{justifyContent:"center",alignItems:"center",flexGrow:1}}>
            <Image source={Images.read} style={{width:"80%",height:250,marginTop:"10%"}} resizeMode="contain"/>
             <TextInput onChangeText={setTitle} value={title} style={{ width:"80%", borderBottomWidth:1.5,borderColor:COLORS.primary,marginBottom:"5%",fontSize:SIZES.paragraph,color:COLORS.secondary,fontFamily:FONTS.normal,color:COLORS.primary}} placeholder="Routine" placeholderTextColor={COLORS.gray}/>
            <ButtonFill onPress={e => setShowTime(true)} style={{width:"80%",borderColor:COLORS.primary,buttonTextColor:COLORS.primary}}>{time == null? "Time" : `${time.getHours()}:${time.getMinutes() < 10? "0" + time.getMinutes() : time.getMinutes()}`}</ButtonFill>
            <View style={{width:"80%",marginTop:15,flexDirection:"row",justifyContent:"center",flexWrap:"wrap"}}>
            {Days.map((item) => {
                return <TouchableOpacity onPress={e => handleDays(item.id)} key={item.id} style={{width:50,borderWidth:handleSelectedDayStyle(item.id)?3:2,borderColor:COLORS.primary,borderRadius:5,padding:5,margin:5}}><AppText style={{fontSize:18,color:COLORS.primary,textAlign:"center"}}>{item.name}</AppText></TouchableOpacity>
            })}
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

            <ButtonFill onPress={handleAddingRoutine} style={{width:"50%",marginTop:15,marginBottom:15,backgroundColor:COLORS.primary,buttonTextColor:"white"}}>Add</ButtonFill>
            <ErrorMessage style={{color:COLORS.danger,fontSize:18,marginBottom:5,textAlign:"center"}}>{errorMessage}</ErrorMessage>

            </ScrollView>
        </Container> 
    )
}
