import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import appwriteService from '../../utils/appwrite'
import { useAuth } from '../../store/loginContextProvider'
import Count from '../../components/count'
import { useContext } from 'react'
import { UserContext } from '@/store/userContextProvider'
import { useCount } from '@/store/countContextProvider'
import Metrices from '@/components/metrics'
import colors from '@/utils/colors'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import WeekCal from '@/components/weekCal'
import Triggers from '@/components/triggers'
import Reasons from '@/components/reasons'

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
    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:colors.primary}}>
      <Count/>
      <TouchableOpacity onPress={logOut} style={{flex:1}}><Text>Home</Text></TouchableOpacity>
    <BottomSheet
    snapPoints={[510,510]}
    >
    <BottomSheetView style={styles.contentContainer}>
          <WeekCal/>
          <Triggers/>
          <Reasons/>
        </BottomSheetView>
    </BottomSheet>
   
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
})