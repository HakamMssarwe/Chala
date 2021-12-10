import AnimatedLottieView from 'lottie-react-native'
import { ScrollView, View } from 'native-base';
import React, { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppText from '../../components/AppText';
import Container from '../../components/Container'
import { SCHEDULE } from '../../constants/routeNames';
import { COLORS, windowHeight, windowWidth } from '../../constants/themes'
import { setApp } from '../../redux/slices/AppSlice';
import DatePicker from 'react-native-modern-datepicker';

export default function Schedule({navigation}) {

    const dispatch = useDispatch();
    let {isLoading} = useSelector((state) => state.app)
    const date = new Date().toISOString().split('T')[0]
    const [selectedDate, setSelectedDate] = useState('');

    const components = [{name:SCHEDULE},{name:SCHEDULE + "List"}]

    useEffect(() => {
        dispatch(setApp({isLoading:false}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])




    return isLoading? <AnimatedLottieView source={require('../../assets/splash/loading.json')} autoPlay loop /> :
    <Container style={{flex:1,backgroundColor:"white"}}>
        <TouchableOpacity style={{width:windowWidth,height:windowHeight *0.13,padding:30}} onPress={navigation.goBack}>
        <AppText style={{width:"100%",color:"white",fontSize:25,color:COLORS.primary}}>{"<"} Chala</AppText>
        </TouchableOpacity>
        <FlatList 
        style={{width:"100%"}} 
        keyExtractor={item => item.name}
        pagingEnabled
        data={components}
        renderItem={({item,index}) => {
            return item.name == SCHEDULE? 
            <View style={{width:windowWidth,height:windowHeight}}>
                <DatePicker
                options={{
                    backgroundColor: COLORS.primary,
                    textHeaderColor: "white",
                    textDefaultColor: "white",
                    selectedTextColor: COLORS.primary,
                    mainColor: "white",
                    textSecondaryColor: "white",
                    borderColor:"white"
                }}
                onSelectedChange={date => setSelectedDate(date)}
                current = {date}
                selected={date}
                mode="calendar"
                minuteInterval={30}
                style={{ borderRadius: 10}}
            />
            </View>:
            <View style={{width:"100%",height:windowHeight}}></View>
        }}
        />

    </Container>
}
