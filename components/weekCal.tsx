import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '@/utils/colors'


const {width , height} = Dimensions.get('window')
const WeekCal = () => {
  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={{color:'#4B4B4B'}}>sat</Text>
        <View style={styles.date}><Text style={styles.dateNumber}>2</Text></View>
      </View>
    
      <View style={styles.dateContainer}>
        <Text style={{color:'#4B4B4B'}}>sat</Text>
        <View style={styles.date}><Text style={styles.dateNumber}>2</Text></View>
      </View>
    
      <View style={styles.dateContainer}>
        <Text style={{color:'#4B4B4B'}}>sat</Text>
        <View style={styles.date}><Text style={styles.dateNumber}>2</Text></View>
      </View>
    
      <View style={styles.dateContainer}>
        <Text style={{color:'#4B4B4B'}}>sat</Text>
        <View style={styles.date}><Text style={styles.dateNumber}>2</Text></View>
      </View>
    
      <View style={styles.dateContainer}>
        <Text style={{color:'#4B4B4B'}}>sat</Text>
        <View style={styles.date}><Text style={styles.dateNumber}>2</Text></View>
      </View>
    
      <View style={styles.dateContainer}>
        <Text style={{color:'#4B4B4B'}}>sat</Text>
        <View style={styles.highlightedDate}><Text style={styles.highlightedDateNumber}>2</Text></View>
      </View>
    
      <View style={styles.dateContainer}>
        <Text style={{color:'#4B4B4B'}}>sat</Text>
        <View style={styles.date}><Text style={styles.dateNumber}>2</Text></View>
      </View>
    

    </View>
  )
}

export default WeekCal

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-end',
        width,
        paddingHorizontal:20
    },
    dateContainer:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    date:{
        height:40,
        width:40,
        backgroundColor:'#EBEBEB',
        borderRadius:100,
        alignItems:'center',
        justifyContent:'center'
    },
    dateNumber:{
        textAlign:'center',
        fontSize:16,
        fontWeight:'semibold'
    },
    highlightedDate:{
        height:40,
        width:40,
        backgroundColor:colors.secondary,
        borderRadius:100,
        alignItems:'center',
        justifyContent:'center'
    },
    highlightedDateNumber:{
        textAlign:'center',
        fontSize:16,
        fontWeight:'semibold',
        color:'white'
    }
})