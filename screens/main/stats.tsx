import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { UserContext } from '@/store/userContextProvider';
import { useCount } from '@/store/countContextProvider';
import { Calendar, LocaleConfig, WeekCalendar } from 'react-native-calendars';
import RecentList from '@/components/recentList';
import colors from '@/utils/colors';
import Icon from 'react-native-vector-icons/Ionicons'  
import { AnimatedFAB } from '@cascadeui/animated-fab'
const handleClick = () =>{
    console.log('navigate')
    }
    
const Stats = () => {
  const context = useContext(UserContext);
  const { reasons } = useCount();

  // Check if context is undefined
  if (!context) {
    throw new Error('useContext must be used within a UserProvider');
  }

  // Extract and format selected dates
  const selectedDates: any = [];

  reasons.map((item) => {
    const dates = new Date(item.date).toLocaleDateString('en-CA');
    selectedDates.push(dates);
  });

  // Create markedDates object
  const obj: any = {};
  selectedDates.map((item: any) => {
    obj[item] = { selected: true,  markedColor: 'red' };
  });


  return (
    <>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Calendar
        theme={{
          backgroundColor: 'black',
          calendarBackground: '#f0f0f0',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#ff6347',
          selectedDayTextColor: '#ffffff',
          todayTextColor: 'green',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          arrowColor: 'orange',
          monthTextColor: colors.primary,
          indicatorColor: 'blue',
          textDayFontFamily: 'monospace',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 14,
        }}
        markedDates={obj}
      />

        
    </View>
    eturn (
    <AnimatedFAB menuItems={[
        {icon:(<Icon name='aperture-outline' size={32} color='black'></Icon>),onPress:handleClick,label:'home'},
        {icon:(<Icon name='share-outline' size={32} color='black'></Icon>),onPress:handleClick,label:'share'},
        {icon:(<Icon name='mic-circle-outline' size={32} color='black'></Icon>),onPress:handleClick, label:'voice'}
      ]}
      fabColor='black'
      fabIcon={(<Icon name="add" size={30} color="white" />)}
      fabMenuColor='white'
      />
    <RecentList/>
    </>
  );
};

export default Stats;

const styles = StyleSheet.create({});
