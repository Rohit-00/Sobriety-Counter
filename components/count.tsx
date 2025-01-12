import { StyleSheet, Text, TouchableOpacity, View,SafeAreaView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import appwriteService from '@/utils/appwrite';
import { UserContext } from '@/store/userContextProvider';
import { useCount } from '@/store/countContextProvider';
import colors from '@/utils/colors';
import Metrices from './metrics';
import { database } from '@/models/database';
import User from '@/models/userData';
import Reason from '@/models/reasons';
import { Q } from '@nozbe/watermelondb';
import { cleanSince } from '@/utils/metricFunctions';

const Count = () => {

  const context = useContext(UserContext);
  const { count, setCount , reasons, setReasons} = useCount();
  const [data , setData] = useState<number>()

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
       const usersCollection = await database.collections.get<User>('user');
               const user = await usersCollection.query().fetch()
               console.log(user[0].totalCount)
              setCount(user[0].totalCount)
       const allTheReasons = await database.get<Reason>('reasons').query(
                        Q.where('user',userId!)
                      ).fetch()
                      setReasons(allTheReasons)   
              
            setReasons(allTheReasons)
          })
       
      } catch (error) {
        console.error('Error fetching count:', error);
      }
    };
    const s = cleanSince(reasons)
    setData(s)
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
