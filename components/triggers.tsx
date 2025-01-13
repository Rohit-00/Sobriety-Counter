import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { database } from '@/models/database';
import User from '@/models/userData';
import personalReasons from '@/models/personReasons';
import { Q } from '@nozbe/watermelondb';
import Triggers from '@/models/triggers';
import colors from '@/utils/colors';

const Reasons = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [addedTrigger, setAddedTrigger] = useState('');
  const [triggers,setTriggers] = useState<Triggers[]>()

  useEffect(() => {
    const fetchData = async () => {
      
        const usersCollection = await database.collections.get<User>('user');
        // const user = await usersCollection.query().fetch();

        const triggers = await database.get<Triggers>('triggers').query().fetch();
        setTriggers(triggers)
    };
    fetchData();
  }, [isModalVisible]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddReason = async () => {
    try{
    await database.write(async () => {
       const data =await database.get<Triggers>('triggers').create((trigger)=>{
        trigger.trigger = addedTrigger
      })
      console.log(data)
    

    })
  }catch(err){
    console.log(err)
  }

    toggleModal();
  };

  return (
    <View style={styles.containerContainer}>
      <View>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Triggers</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Icon name='add-outline' size={32} />
          </TouchableOpacity>
        </View>
        <View style={styles.triggerContainer}>
          {triggers?.map((item)=>
            <Text style={styles.trigger} key={item.id}>{item.trigger}</Text>
          )}
        
        </View>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Reason</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your reason"
              value={addedTrigger}
              onChangeText={setAddedTrigger}
            />
            <View style={styles.buttonContainer}>
              <Pressable style={[styles.button, styles.cancelButton]} onPress={toggleModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.addButton]} onPress={handleAddReason}>
                <Text style={styles.buttonText}>Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Reasons;

const styles = StyleSheet.create({
  containerContainer: {
    width: '100%',
    borderRadius: 25,
    borderColor: '#C6C6C6',
    borderWidth: 1,
    padding: 20,
    marginTop: 30,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  triggerContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  trigger: {
    backgroundColor: '#FFEEE9',
  
    padding: 8,
    paddingHorizontal: 14,
    borderRadius: 100,
    alignSelf: 'flex-start',
    color: '#FF794C',
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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
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
    backgroundColor: '#4BBD8B',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});