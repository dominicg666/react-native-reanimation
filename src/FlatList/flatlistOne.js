
 import React from 'react';
 import {
   View,
   Dimensions,
   FlatList,
   Image,
   Text,
   StatusBar,
   StyleSheet,
   Animated
 } from 'react-native';
 import faker from 'faker';
 
 faker.seed(10)

 const _data= [...Array(30).keys()].map((_,i)=>{

    return {
        key:faker.datatype.uuid(),
        image:`https://randomuser.me/api/portraits/${faker.helpers.randomize(['women','men'])}/${faker.datatype.number(60)}.jpg`,
        name:faker.name.findName(),
        jobTitle:faker.name.jobTitle(),
        email:faker.internet.email()
    }
 })

 const BG_IMG ='https://images.pexels.com/photos/4118248/pexels-photo-4118248.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'

 const SPACING = 20;
 const AVATAR_SIZE = 70;
 const ITEM_SIZE = 130;
 const FlatListOne= (props) => {
   const scrollY =React.useRef(new Animated.Value(0)).current
 
   return (
     <View style={{flex:1,backgroundColor:'#fff'}}>
         <Image
         source={{uri:BG_IMG}}
         style={StyleSheet.absoluteFillObject}
         blurRadius={80}
         />
       <Animated.FlatList
        onScroll={Animated.event([{
            nativeEvent:{contentOffset:{y:scrollY}}}],
            {useNativeDriver:true}
            )}
         data={_data}
         contentContainerStyle={{
             padding:SPACING,
             paddingTop:StatusBar.currentHeight || 42
         }}
         keyExtractor={item=>item.key}
         renderItem = {({item,index})=>{

            const inputRange = [
                -1,
                0,
                ITEM_SIZE * index+1,
                ITEM_SIZE * (index + 2)
            ]

            const opcityInputRange = [
                -1,
                0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + .5)
            ]

            const scale = scrollY.interpolate({
                inputRange,
                outputRange:[1,1,1,0]
            })
            const opacity = scrollY.interpolate({
                inputRange:opcityInputRange,
                outputRange:[1,1,1,0]
            })
                return (
                    <Animated.View key={index} style={{
                        flexDirection:"row",
                        padding:SPACING,
                        marginBottom:SPACING,
                        borderRadius:12,
                        backgroundColor:"rgba(255,255,255,0.8)",
                        shadowColor:"#000",
                        shadowOffset:{
                            width:0,
                            height:10
                        },
                        shadowOpacity:.3,
                        shadowRadius:20,
                        opacity,
                        transform:[{scale}]
                    }}>
                        <Image
                        source={{uri:item.image}}
                        style={{
                            width:AVATAR_SIZE,
                            height:AVATAR_SIZE,
                            borderRadius:AVATAR_SIZE,
                            marginRight:SPACING
                        }}
                        />
                        <View>
                            <Text style={{
                                fontSize:22,
                                fontWeight:"700"
                            }}>
                                {item.name}
                            </Text>
                            <Text style={{fontSize:18,opacity:.7}}>
                                {item.jobTitle}
                            </Text>
                            <Text style={{fontSize:14,opacity:.8}}>
                                {item.email}
                            </Text>
                        </View>
                     </Animated.View>
                )
         }}
       />
     </View>
   );
 };
 
 
 export default FlatListOne;
 