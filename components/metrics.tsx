import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useCount } from '@/store/countContextProvider';
import colors from '@/utils/colors';
// Calculate 7 days past date
const calcWeek = () => {
  const today = new Date();
  today.setDate(today.getDate() - 7);
  return today;
};

// Calculate this month's first date
const getFirstThisMonth = () => {
  const today = new Date();
  const firstDateOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  return firstDateOfMonth;
};

// Calculate previous month's first date
const getFirstLastMonth = () => {
  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  return lastMonth;
};

const {width , height} = Dimensions.get('window')
const Metrices = ({setData}:any) => {
  const { reasons } = useCount();

  const dates: Date[] = [];

  // Safely process reasons if it exists
  reasons &&
    reasons.forEach((item) => {
      try {
        const data = JSON.parse(item); // Parse each item
        if (data?.date) {
          dates.push(new Date(data.date)); // Push valid dates
        }
      } catch (error) {
        console.warn('Invalid JSON:', item); // Log invalid entries
      }
    });

  const lastSevenDaysData = dates.filter(
    (item) => item >= calcWeek() && item <= new Date()
  );
  const thisMonthData = dates.filter((item) => item >= getFirstThisMonth());
  const lastMonthData = dates.filter(
    (item) => item < getFirstThisMonth() && item >= getFirstLastMonth()
  );

  const mostRecentDate = new Date(
    Math.max(...dates.map((date) => new Date(date).getTime()))
  );

  const lastSevenDays = lastSevenDaysData.length;
  const lastMonth = lastMonthData.length;
  const thisMonth = thisMonthData.length;
  const cleanSince = new Date().getDate() - mostRecentDate.getDate();
  setData(cleanSince)
  return (
    <View style={styles.container}>
    <View style={styles.metric}>
    <Text>Last 7 days</Text>
    <Text style={{fontSize:24,fontWeight:'bold'}}>{lastSevenDays}</Text>
    </View>
    <View style={{height:60,backgroundColor:'grey',width:1,alignSelf:'center'}}></View>
    <View style={styles.metric}>
    
    <Text>This Month</Text>
    <Text style={{fontSize:24,fontWeight:'bold'}}>{thisMonth}</Text>
    </View>
    <View style={{height:60,backgroundColor:'grey',width:1,alignSelf:'center'}}></View>

    <View style={styles.metric}>
    <Text>Last Month</Text>
    <Text style={{fontSize:24,fontWeight:'bold'}}>{lastMonth}</Text>
    </View>
    </View>
  );
};

export default Metrices;

const styles = StyleSheet.create({
  container:{

    width:width-100,
    height:90,
    backgroundColor:colors.background,
    borderRadius:25,
    marginTop:20,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:20
  },
  metric:{
    flexDirection:'column',
    alignItems:'center', 
    justifyContent:'center',
    gap:5
  }
});
