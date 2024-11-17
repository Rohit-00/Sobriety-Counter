import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import appwriteService from '../../utils/appwrite'
import { useAuth } from '../../store/loginContextProvider'


const Home = ({navigation}:any) => {
  const {toggleLogin} = useAuth()
    const logout = async () =>{
        const logout = await appwriteService.logout()
        if(logout){
          toggleLogin()
        }
    }
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity onPress={logout}><Text>Home</Text></TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})