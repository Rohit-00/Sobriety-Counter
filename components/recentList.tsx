import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useCount } from '@/store/countContextProvider'
import colors from '@/utils/colors'
import { FlatList } from 'react-native-gesture-handler'

const RecentList = () => {

const {reasons} = useCount()
type ReasonsType = {
    date : Date,
    reason: string,
    time: string
}
const formattedReasons : ReasonsType[] = []
reasons && reasons.map((item,key)=>
    { 
        const data = JSON.parse(item);
        formattedReasons.push(data)
    }

)
console.log(formattedReasons)

  return (
    <View style={styles.container}>
    <Text style={styles.heading}>Recent</Text>
    {/* {reasons.map((item, key) => {
        const data = JSON.parse(item);
        
        return (
        <>
          <View
            key={key}
            style={styles.listItem}
          >

            <Text style={styles.reason}>{data.reason}</Text>
            <View style={styles.dateTime}>
            <Text>{new Date(data.date).toLocaleDateString()}</Text>
            <Text >
              {new Date(data.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
            </View>
            
          </View>
          <View style={{height:'0.2%',width:'90%',backgroundColor:'black',alignSelf:'center',marginBottom:10}}/>
          </>
        );
      })} */}
      {/* <FlatList
      data={formattedReasons}
      keyExtractor={(item,key)=>key.toString()}
      renderItem={((item)=>
      {
        return(
            <>
            <View
            style={styles.listItem}
          >

            <Text style={styles.reason}>{item.item.reason}</Text>
            <View style={styles.dateTime}>
            <Text>{new Date(item.item.date).toLocaleDateString()}</Text>
            <Text >
              {new Date(item.item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
            </View>
            
          </View>
          <View style={{height:'0.2%',width:'90%',backgroundColor:'black',alignSelf:'center',marginBottom:10}}/>
          </>
        )
      }
    )}
      
      /> */}
    </View>
  )
}

export default RecentList

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    heading:{
    marginHorizontal:20,
    fontSize:24,
    fontWeight:'bold',
    color:colors.primary,
    marginBottom:15
    },
    listItem:{
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        alignSelf:'center',
        marginBottom:20
      },
      reason:{
        fontSize:16,
        
      },
      dateTime:{
        flexDirection:'row',
        gap:25
      }
})