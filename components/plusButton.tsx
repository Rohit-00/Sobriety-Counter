import React, { useContext, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import colors from '@/utils/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useCount } from '@/store/countContextProvider';
import { UserContext } from '@/store/userContextProvider';
import appwriteService from '@/utils/appwrite';
import { database } from '@/models/database';
import { DatabaseProps } from '@nozbe/watermelondb/Database';
import { Q } from '@nozbe/watermelondb';
const { width } = Dimensions.get('window');
import Reason from '@/models/reasons';
import User from '@/models/userData';
const PlusButton = () => {
  const { count, setCount, reasons } = useCount();
  const [formState, setFormState] = useState({
    reason: '',
    date: new Date(),
    time: new Date(),
    isModalVisible: false,
    isDatePickerOpen: false,
    isTimePickerOpen: false,
  });
  
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useContext must be used within a UserProvider');
  }
  const { userId } = context;
  const toggleModal = () => {
    setFormState((prev) => ({
      ...prev,
      isModalVisible: !prev.isModalVisible,
    }));
  };

  const toggleDatePicker = () => {
    setFormState((prev) => ({
      ...prev,
      isDatePickerOpen: !prev.isDatePickerOpen,
    }));
  };

  const toggleTimePicker = () => {
    setFormState((prev) => ({
      ...prev,
      isTimePickerOpen: !prev.isTimePickerOpen,
    }));
  };

  const handleDateChange = (_: any, selectedDate: any) => {
    if (selectedDate) {
      setFormState((prev) => ({
        ...prev,
        date: selectedDate,
        isDatePickerOpen: false,
      }));
    } else {
      toggleDatePicker();
    }
  };

  const handleTimeChange = (_: any, selectedTime: any) => {
    if (selectedTime) {
      setFormState((prev) => ({
        ...prev,
        time: selectedTime,
        isTimePickerOpen: false,
      }));
    } else {
      toggleTimePicker();
    }
  };

  const handleAdd = async () => {
    const reason = {
      reason:formState.reason,
      date:formState.date,
      time:formState.time
    }
    const stringReason = JSON.stringify(reason)
    reasons.push(stringReason)
    try{
      await database.write(async () => {
        const usersCollection = await database.collections.get<User>('user');
        const user = await usersCollection.query(
          Q.where('userId',userId!)
        )
        const allTheReasons = await database.get<Reason>('reasons').query(
          Q.where('user',userId!)
        ).fetch()
        console.log(allTheReasons[5])
        // await database.get<Reason>('reasons').create( (reason:any) => {
        //   reason.reason = 'Last Reason';
        //   reason.date = '2023-10-01';
        //   reason.time = Date.now();
        //   reason.userId = userId!
        //   reason.user.set(user[0])
          
        // });
       
        
      });
      

  } catch(error) {
    console.log(error)
  }

    
    // try {
    //   const update = await appwriteService.addCount({
    //     userId: userId || '',
    //     count: count || 0,
    //     reasons,
    //   });
      
    //   setCount(update?.totalCount);
    //   setFormState((prev) => ({
    //     ...prev,
    //     reason: '',
    //     isModalVisible: false,
    //   }));
    // } catch (error) {
    //   console.error('Error adding count:', error);
    // }
  };

  return (
    <View style={{zIndex:1000}}>
      {/* Floating Button */}
      <TouchableOpacity onPress={toggleModal}>
        <View style={styles.buttonStyle} />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={formState.isModalVisible}
        animationType="fade"
        transparent
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                {/* Close Button */}
                <TouchableOpacity style={styles.closeIcon} onPress={toggleModal}>
                  <Text style={styles.closeIconText}>×</Text>
                </TouchableOpacity>

                <Text style={styles.modalTitle}>Reason/Trigger</Text>

                <TextInput
                  style={styles.textInput}
                  placeholder="Enter something"
                  placeholderTextColor="#888"
                  value={formState.reason}
                  onChangeText={(reason) =>
                    setFormState((prev) => ({ ...prev, reason }))
                  }
                />

                {/* Date Picker */}
                <TouchableOpacity onPress={toggleDatePicker}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Select Date"
                    placeholderTextColor="#888"
                    value={formState.date.toDateString()}
                    editable={false}
                  />
                </TouchableOpacity>

                {formState.isDatePickerOpen && (
                  <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={formState.date}
                    onChange={handleDateChange}
                  />
                )}

                {/* Time Picker */}
                <TouchableOpacity onPress={toggleTimePicker}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Select Time"
                    placeholderTextColor="#888"
                    value={formState.time.toLocaleTimeString()}
                    editable={false}
                  />
                </TouchableOpacity>

                {formState.isTimePickerOpen && (
                  <DateTimePicker
                    mode="time"
                    display="spinner"
                    value={formState.time}
                    onChange={handleTimeChange}
                  />
                )}

                {/* Add Button */}
                <Pressable style={styles.addButton} onPress={handleAdd}>
                  <Text style={styles.addButtonText}>Add</Text>
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default PlusButton;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.secondary,
    width: 80,
    height: 80,
    borderRadius: 100,
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
  },
  modalOverlay: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position:'relative'
    
  },
  modalContent: {
    width: width * 0.8,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    position:'relative'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'red'
  },
  closeIconText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  addButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
