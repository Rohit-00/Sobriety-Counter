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

const Count = () => {

  const context = useContext(UserContext);
  const { count, setCount , reasons, setReasons} = useCount();
  const [data , setData] = useState<number>(0)
  const handleDataFromChild = (data:number) => {
    setData(data);
  };

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
    fetchData();
  }, [userId]);
      
   
 // add skeleton when userId === knull (Don't forget)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.counterCard}>
     <View>
      <Text style={styles.heading}>You've been clean for</Text>
      <Text style={styles.motivation}>Keep Going!!</Text>
     </View>
     <View>
      <Text style={styles.counter}>{data}</Text>
      <Text style={styles.days}>Days</Text>
     </View>
      </View>
      <Text style={styles.motivation}>Keep going, you can do it!!</Text>
      <Metrices setData={handleDataFromChild}/>
    </SafeAreaView>
  );
};

export default Count;

const styles = StyleSheet.create({
container:{
  
  marginTop:50,
  width:'100%',
  
},
counterCard:{
backgroundColor:colors.primary,
width:'100%',
paddingVertical:20,
paddingHorizontal:20,
borderRadius:25,
flexDirection:'row',
justifyContent:'space-between',
textAlign:'right',
alignItems:'center'
},

heading:{
  fontSize:20,
  fontWeight:'bold',
  color:'white',
  
},
counter:{
  textAlign:'center',
  fontSize:76,
  color:'white',
},
days:{
  marginTop:-20,
  textAlign:'right',
  fontWeight:'bold',
  color:'white',
  marginRight:8

},
counterContainer:{
  flexDirection:'row',
  alignSelf:'center',
  alignItems:'baseline',
  gap:10
},
motivation:{
 
  color:'white',
  fontSize:18,
  fontStyle:'italic',
  fontWeight:'semibold'
}
});
