import AnimatedLottieView from 'lottie-react-native';
import React from 'react'
import { FlatList, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppText from '../../components/AppText';
import ButtonFill from '../../components/ButtonFill';
import ButtonOutline from '../../components/ButtonOutline';
import Container from '../../components/Container';
import { ADD_ROUTINE, HOME, UPDATE_ROUTINE } from '../../constants/routeNames';
import { COLORS, Images, SIZES, windowHeight, windowWidth } from '../../constants/themes';

export default function Routines({navigation}) {

    const dispatch = useDispatch();
    let {isLoading} = useSelector((state) => state.app)

    const routines = [
        {id:"1",tagId:"1",title:"Work"},
        {id:"1",tagId:"1",title:"Work"},
        {id:"1",tagId:"1",title:"Work"},
        {id:"1",tagId:"1",title:"Work"},
        {id:"1",tagId:"1",title:"Work"},
        {id:"1",tagId:"1",title:"Work"},
        {id:"1",tagId:"1",title:"Work"},
        {id:"1",tagId:"1",title:"Work"},
        {id:"1",tagId:"1",title:"Work"},
    ]

    return isLoading? <AnimatedLottieView source={require('../../assets/splash/loading.json')} autoPlay loop /> :
    <Container style={{flex:1,backgroundColor:COLORS.primary}}>
    <View style={{width:"100%",height:windowHeight *0.15,padding:30,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}> 
        <View style={{flexDirection:"row",alignItems:"center"}}>
        <TouchableOpacity onPress={e => navigation.navigate(HOME)}>
        <AppText style={{color:"white",fontSize:25}}>{"<"} Chala</AppText>
        </TouchableOpacity>
        </View>
        <View><ButtonFill onPress={e => navigation.navigate(ADD_ROUTINE)} style={{width:100,height:50}}>Add</ButtonFill></View>
    </View>
    <View style={{width:"100%",height:windowHeight *0.85,backgroundColor:"white",borderTopRightRadius:35,borderTopLeftRadius:35}}>
    <View style={{width:"100%",height:"30%",alignItems:"center",padding:30}}>
    <AppText style={{fontSize:SIZES.h1,color:COLORS.primary,fontWeight:"bold"}}>My Routines</AppText>
    <AppText style={{fontSize:16,color:COLORS.gray,textAlign:"center",marginTop:10}}>By setting up a Routine it will automatically be added to the schedule based on the date and time selected.</AppText>
    </View>
    <FlatList 
    style={{width:"100%",height:windowHeight * 0.25}}
    numColumns={2}
    contentContainerStyle={{alignItems:"space-between",justifyContent:"flex-start",flexGrow:1}}
    data={routines}
    renderItem={({item,index}) => {
        return <TouchableOpacity onLongPress={e => navigation.navigate(UPDATE_ROUTINE)} style={{width:windowWidth * 0.45,borderRadius:30,height:windowHeight * 0.2,backgroundColor:COLORS.primary,margin:10,marginBottom:10,justifyContent:"center",alignItems:"center"}}>
            <Image style={{width:80,height:80,borderRadius:50,marginBottom:10,marginTop:5}} source={Images.routine}/>
            <AppText style={{color:"white",fontSize:20}}>{item.title}</AppText>
            </TouchableOpacity>
    }}
    />
    </View>
    </Container>
}
