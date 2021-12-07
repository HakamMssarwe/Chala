import AnimatedLottieView from 'lottie-react-native';
import React from 'react'
import { FlatList, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppText from '../../components/AppText';
import ButtonFill from '../../components/ButtonFill';
import ButtonOutline from '../../components/ButtonOutline';
import Container from '../../components/Container';
import { ADD_TASK, HOME, UPDATE_TASK } from '../../constants/routeNames';
import { COLORS, Images, SIZES, windowHeight } from '../../constants/themes';

export default function Tasks({navigation}) {

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
        <View><ButtonFill onPress={e => navigation.navigate(ADD_TASK)} style={{width:100,height:50}}>Add</ButtonFill></View>
    </View>
    <View style={{width:"100%",height:windowHeight *0.85,backgroundColor:"white",borderTopRightRadius:35,borderTopLeftRadius:35}}>
    <View style={{width:"100%",height:"25%",alignItems:"center",padding:30}}>
    <AppText style={{fontSize:SIZES.h1,color:COLORS.primary,fontWeight:"bold"}}>My Tasks</AppText>
    <AppText style={{fontSize:16,color:COLORS.gray,textAlign:"center",marginTop:10}}>Track your Tasks like an Entrepreneur.</AppText>
    </View>
    <FlatList 
    style={{width:"100%",height:windowHeight * 0.25}}
    contentContainerStyle={{alignItems:"center",justifyContent:"flex-start",flexGrow:1}}
    data={routines}
    renderItem={({item,index}) => {
        return <TouchableOpacity onLongPress={e => navigation.navigate(UPDATE_TASK)} style={{width:"85%",height:windowHeight * 0.1,borderRadius:10,flexDirection:"row",justifyContent:"flex-start",alignItems:"center",backgroundColor:COLORS.primary,marginBottom:10}}>
            <AppText style={{color:"white",width:"100%",fontSize:20,padding:5,paddingLeft:15,textDecorationLine: 'line-through', textDecorationStyle: 'solid',textAlign:"left"}}>{item.title}</AppText>
            </TouchableOpacity>
    }}
    />
    </View>
    </Container>
}
