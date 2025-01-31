import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import appwriteService from '../../utils/appwrite'
import { useAuth } from '../../store/loginContextProvider'
import Count from '../../components/count'
import { useContext } from 'react'
import { UserContext } from '@/store/userContextProvider'
import { useCount } from '@/store/countContextProvider'
import colors from '@/utils/colors'
import Triggers from '@/components/triggers'
import Reasons from '@/components/reasons'

const {height,width} = Dimensions.get('window')
const Home = ({navigation}:any) => {
  const context = useContext(UserContext);

  // Check if context is undefined
  if (!context) {
    throw new Error('useContext must be used within a UserProvider');
  }

const {setCount,setReasons,reasons} = useCount()
  const {toggleLogin} = useAuth()
    const logOut = async () =>{
        const logOut = await appwriteService.logout()

        if(logOut){
          toggleLogin()
          setCount(0)
          setReasons([])
        }
    }

  return (
    <ScrollView style={{height:height}} showsVerticalScrollIndicator={false}>
    <View style={{flex:1,justifyContent:'center',backgroundColor:colors.background,paddingHorizontal:20,height:height}}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>Hello, Rohit</Text>
        <Text style={styles.date}>Jan, 13</Text>
        </View>
      <Count/>
      <Triggers/>
      <Reasons/>
      
      <TouchableOpacity onPress={logOut} style={{flex:1}}><Text>Home</Text></TouchableOpacity>
      
    </View>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
  greetingContainer: {
    // backgroundColor:'red'
    marginBottom:-30
  },
  greeting:{
    fontSize:24,
    fontWeight:'bold'
  },
  date: {

  }
})