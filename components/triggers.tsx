import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const {width , height} = Dimensions.get('window')
const Triggers = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Triggers</Text>
    <View style={styles.triggerContainer}>
    
        <Text style={styles.trigger}>Instagram</Text>
        <Text style={styles.trigger}>Being Lonely</Text>
        <Text style={styles.trigger}>Reddit</Text>
        <Text style={styles.trigger}>anything</Text>
        <Text style={styles.trigger}>Being alone at home</Text>

      
    </View>
    </View>
  )
}

export default Triggers

const styles = StyleSheet.create({
    container:{
        marginTop:20,
        width,
        paddingHorizontal:20
    },
    heading:{
        fontSize:24,
        fontWeight:'bold',
        textAlign:'left'
    },
    triggerContainer:{
        paddingTop:10,
        flexDirection:'row',
        flexWrap:'wrap',
        gap:10
    },
    trigger:{
        backgroundColor: '#FFEEE9',
        padding: 8,
        paddingHorizontal:14,
        borderRadius: 100,
        alignSelf: 'flex-start',
        color:'#FF4000'
        
    }
})