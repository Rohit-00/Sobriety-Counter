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
  const { count, setCount, reasons,setReasons } = useCount();
  const [formState, setFormState] = useState({
    enteredReason: '',
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
    try{
      await database.write(async () => {
        const usersCollection = await database.collections.get<User>('user');
        const user = await usersCollection.query(
        ).fetch()
        console.log(user[0].userId)
        const data = await database.get<Reason>('reasons').create( (reason) => {
          reason.reason = formState.enteredReason;
          reason.date = formState.date.toString();
          reason.time = formState.date.toTimeString();
          reason.userId = user[0].userId
          
          // //relation is not implemented I guess. I'm using userId for reference. Sorry :P
        });
        console.log(data)
        await user[0].update(user => 
          user.totalCount += 1
        )
        
        const allTheReasons = await database.get<Reason>('reasons').query(
          Q.where('user',userId!)
        ).fetch()
        setReasons(allTheReasons)   
        toggleModal()
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

              <Text style={styles.modalTitle}>Break Your Healthy Habit?</Text>

              <Text style={styles.label}>Trigger</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter something"
                placeholderTextColor="#888"
                value={formState.enteredReason}
                onChangeText={(enteredReason) =>
                  setFormState((prev) => ({ ...prev, enteredReason }))
                }
              />

              <Text style={styles.label}>Date</Text>
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

              <Text style={styles.label}>Time</Text>
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

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                <Pressable style={[styles.button, styles.cancelButton]} onPress={toggleModal}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.addButton]} onPress={handleAdd}>
                  <Text style={styles.buttonText}>Add</Text>
                </Pressable>
              </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
  closeIconText: {
    fontSize: 24,
    color: '#000',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  addButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
