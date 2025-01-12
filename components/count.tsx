import { StyleSheet, Text, TouchableOpacity, View,SafeAreaView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import appwriteService from '@/utils/appwrite';
import { UserContext } from '@/store/userContextProvider';
import { useCount } from '@/store/countContextProvider';
import colors from '@/utils/colors';
import Metrices from './metrics';
import { database } from '@/models/database';

const Count = () => {

  const context = useContext(UserContext);
  const { count, setCount , reasons, setReasons} = useCount();
  const [data , setData] = useState<number>()
  const setNumber = ({data}:{data:number}) =>{
    setData(data)
  }
  // Check if context is undefined
  if (!context) {
    throw new Error('useContext must be used within a UserProvider');
  }

  const { userId,setUserId } = context;

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const userID : any = await appwriteService.getCurrentUser()
        setUserId(userID?.targets.at(0)?.userId)
        const data = await appwriteService.fetchCount({ userId: userId?userId:''});
        await database.write(async () => {
            // const addReasons = await database.get('reasons').create((reason:any)=> {
            //   reason.userId = userId,
            //   reason.totalCount = 1
            //   reason.reasons = "New Reason here"
            // })
        
            const allReasons : any = await database.get('users').query().fetch()
            setReasons(allReasons)
          })
        // setCount(data.totalCount);
        
      } catch (error) {
        console.error('Error fetching count:', error);
      }
    };

    fetchData();
  }, [userId]);
  
 // add skeleton when userId === knull (Don't forget)
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>You've been clean for</Text>
      <View style={styles.counterContainer}>
      <Text style={styles.counter}>{data}</Text>
      <Text style={{color:'white',fontWeight:'bold',fontSize:16}}>days</Text>
      </View>
      <Text style={styles.motivation}>Keep going, you can do it!!</Text>
    <Metrices setData={setData}/>
    </SafeAreaView>
  );
};

export default Count;

const styles = StyleSheet.create({
container:{
  flex:1,
  marginTop:50,

},
heading:{
  fontSize:24,
  fontWeight:'bold',
  color:'white',
  textAlign:'center'
  
},
counter:{
  textAlign:'center',
  fontSize:86,
  fontWeight:'600', 
  color:'white',
  margin:-10,
  marginTop:-20
},
counterContainer:{
  flexDirection:'row',
  alignSelf:'center',
  alignItems:'baseline',
  gap:10
},
motivation:{
  textAlign:'center',
  color:'white',
  fontSize:18,
  fontStyle:'italic',
  fontWeight:'semibold'
}
});
