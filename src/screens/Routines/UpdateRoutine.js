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
import { Categories } from '../../utils/Tags';

export default function UpdateRoutine({navigation}) {

    const dispatch = useDispatch();
    let {isLoading} = useSelector((state) => state.app)
    const [time,setTime] = useState(new Date(0))
    const [showTime,setShowTime] = useState(false);



    useEffect(() => {
    console.log(time.toLocaleTimeString());

    },[time])

    const handleTime = (event, selectedDate) => {
        const currentTime = selectedDate || time;
        setShowTime(Platform.OS === 'ios');
        setTime(currentTime);
      };


    return (isLoading? <AnimatedLottieView source={require('../../assets/splash/loading.json')} autoPlay loop /> :
        <Container style={{flex:1,backgroundColor:COLORS.primary,justifyContent:"center"}}>
            <TouchableOpacity style={{width:windowWidth,height:windowHeight *0.15,padding:30}} onPress={e => navigation.goBack()}>
            <AppText style={{width:"100%",color:"white",fontSize:25}}>{"<"} Chala</AppText>
            </TouchableOpacity>
            <ScrollView style={{width:"100%",backgroundColor:"white",borderTopRightRadius:35,borderTopLeftRadius:35}} contentContainerStyle={{justifyContent:"center",alignItems:"center",flexGrow:1}}>
            <Image source={Images.collect} style={{width:"80%",height:250,marginTop:"10%"}} resizeMode="contain"/>
             <TextInput style={{ width:"80%", borderBottomWidth:1.5,borderColor:COLORS.primary,marginBottom:"5%",fontSize:SIZES.paragraph,color:COLORS.secondary,fontFamily:FONTS.normal,color:COLORS.primary}} placeholder="Routine" placeholderTextColor={COLORS.gray}/>
            <ButtonFill onPress={e => setShowTime(true)} style={{width:"80%",borderColor:COLORS.primary,buttonTextColor:COLORS.primary}}>{time.toLocaleTimeString() == new Date(0).toLocaleTimeString()? "Time" : time.toLocaleTimeString()}</ButtonFill>
            <View style={{width:"80%",marginTop:15,flexDirection:"row",justifyContent:"center",flexWrap:"wrap"}}>
            <TouchableOpacity style={{width:50,borderWidth:2,borderColor:COLORS.primary,borderRadius:5,padding:5,margin:5}}><AppText style={{fontSize:18,color:COLORS.primary,textAlign:"center"}}>Su</AppText></TouchableOpacity>
            <TouchableOpacity style={{width:50,borderWidth:2,borderColor:COLORS.primary,borderRadius:5,padding:5,margin:5}}><AppText style={{fontSize:18,color:COLORS.primary,textAlign:"center"}}>Mo</AppText></TouchableOpacity>
            <TouchableOpacity style={{width:50,borderWidth:2,borderColor:COLORS.primary,borderRadius:5,padding:5,margin:5}}><AppText style={{fontSize:18,color:COLORS.primary,textAlign:"center"}}>Tu</AppText></TouchableOpacity>
            <TouchableOpacity style={{width:50,borderWidth:2,borderColor:COLORS.primary,borderRadius:5,padding:5,margin:5}}><AppText style={{fontSize:18,color:COLORS.primary,textAlign:"center"}}>We</AppText></TouchableOpacity>
            <TouchableOpacity style={{width:50,borderWidth:2,borderColor:COLORS.primary,borderRadius:5,padding:5,margin:5}}><AppText style={{fontSize:18,color:COLORS.primary,textAlign:"center"}}>Th</AppText></TouchableOpacity>
            <TouchableOpacity style={{width:50,borderWidth:2,borderColor:COLORS.primary,borderRadius:5,padding:5,margin:5}}><AppText style={{fontSize:18,color:COLORS.primary,textAlign:"center"}}>Fr</AppText></TouchableOpacity>
            <TouchableOpacity style={{width:50,borderWidth:2,borderColor:COLORS.primary,borderRadius:5,padding:5,margin:5}}><AppText style={{fontSize:18,color:COLORS.primary,textAlign:"center"}}>Sa</AppText></TouchableOpacity>
             </View>
            <AppText style={{width:"100%",textAlign:"center",color:COLORS.primary,fontSize:18,marginTop:30}}>Select a Category</AppText>
            <View style={{width:windowWidth,padding:10,flexDirection:"row",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
            {Categories.map((item) => {
                return <TouchableOpacity style={{width:70,height:70,margin:5,borderWidth:1,borderColor:COLORS.primary,padding:10,borderRadius:5}}>
                <Image source={item.imageSource} style={{width:"100%",height:"100%"}}/>
                </TouchableOpacity>
            })}
            </View>
            {showTime && <DateTimePicker value={time} onChange={handleTime} mode="time" is24Hour={true}/>}
            <View style={{width:"80%",flexDirection:"row",justifyContent:"space-around",marginBottom:15}}>
            <ButtonFill style={{width:"45%",backgroundColor:COLORS.primary,buttonTextColor:"white",marginTop:10}}>Update</ButtonFill>
            <ButtonFill style={{width:"45%",backgroundColor:COLORS.danger,buttonTextColor:"white",marginTop:10}}>Delete</ButtonFill>
            </View>
            </ScrollView>
        </Container> 
    )
}
