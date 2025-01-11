import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import appwriteService from '@/utils/appwrite'

const {width , height} = Dimensions.get('window')
const Reasons = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reasons</Text>
    <View style={styles.triggerContainer}>
    
        <TouchableOpacity onPress={()=>appwriteService.logout()}><Text style={styles.trigger} >Instagram</Text>
        </TouchableOpacity>
        <Text style={styles.trigger}>Being Lonely</Text>
        <Text style={styles.trigger}>Reddit</Text>
        <Text style={styles.trigger}>anything</Text>
        <Text style={styles.trigger}>Being alone at home</Text>

      
    </View>
    </View>
  )
}

export default Reasons

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
        backgroundColor: '#DCFFF6',
        padding: 8,
        paddingHorizontal:14,
        borderRadius: 100,
        alignSelf: 'flex-start',
        color:'#00B265'
        
    }
})