import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const Triggers = () => {
  return (
    <View style={styles.containerContainer}>
    <View>
      <View style={styles.headingContainer}>
      <Text style={styles.heading}>Triggers</Text>
      <TouchableOpacity>
      <Icon name='add-outline' size={32}/>
      </TouchableOpacity>
      
      </View>
    <View style={styles.triggerContainer}>
    
        <Text style={styles.trigger}>Instagram</Text>
        <Text style={styles.trigger}>Being Lonely</Text>
        <Text style={styles.trigger}>Reddit</Text>
   

      
    </View>
    </View>
    </View>
  )
}

export default Triggers

const styles = StyleSheet.create({
  containerContainer:{
 
    width:'100%',
    borderRadius:25,
    borderColor:'#C6C6C6',
    borderWidth:1,
    padding:20,
    marginTop:30
   
  },

    headingContainer:{
      flexDirection:'row',
      justifyContent:'space-between'
    
     
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