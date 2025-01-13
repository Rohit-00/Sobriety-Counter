import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { database } from '@/models/database';
import User from '@/models/userData';
import personalReasons from '@/models/personReasons';
import { Q } from '@nozbe/watermelondb';

const Reasons = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [reason, setReason] = useState('');
  const [reasons,setReasons] = useState<personalReasons[]>()

  useEffect(() => {
    const fetchData = async () => {
      
        const usersCollection = await database.collections.get<User>('user');
        // const user = await usersCollection.query().fetch();

        const personalReasons = await database.get<personalReasons>('personalReasons').query().fetch();
        setReasons(personalReasons)
    };
    fetchData();
  }, [isModalVisible]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddReason = async () => {
    try{
    await database.write(async () => {
       const data =await database.get<personalReasons>('personalReasons').create((personReason)=>{
        personReason.personalReason = reason
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
          <Text style={styles.heading}>Reasons</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Icon name='add-outline' size={32} />
          </TouchableOpacity>
        </View>
        <View style={styles.triggerContainer}>
          {reasons?.map((item)=>
            <Text style={styles.trigger} key={item.id}>{item.personalReason}</Text>
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
              value={reason}
              onChangeText={setReason}
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
    backgroundColor: '#DCFFF6',
    padding: 8,
    paddingHorizontal: 14,
    borderRadius: 100,
    alignSelf: 'flex-start',
    color: '#4BBD8B',
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