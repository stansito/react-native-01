import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomWheelPicker from './CustomWheelPicker';

const Serie = ({ id, index, reps, weight, onChange, onDelete }) => {
  const [localReps, setLocalReps] = useState(reps || 0);
  const [localWeight, setLocalWeight] = useState(weight);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    onChange(id, localReps, localWeight);
  }, [localReps, localWeight]);

  return (
    <View style={styles.container}>
     <View style={styles.imageContainer}>
        <Text style={styles.seriesText}>Serie {index + 1}</Text>
      </View>
      <View style={styles.infoContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)} 
           style={styles.infoItem}>
          <Text style={styles.infoValue}>{localReps}</Text>
          <Text style={styles.infoLabel}>Reps</Text>
        </TouchableOpacity>
        <View style={styles.infoItem}>
          <TextInput style={styles.infoValue}
            placeholder="0"
            keyboardType="numeric"
            value={localWeight}
            onChangeText={setLocalWeight}
          />
          <Text style={styles.infoLabel}>Kg</Text>
        </View>
      </View>
        <TouchableOpacity onPress={() => onDelete(id)} style={styles.deleteButton}>
          <Icon name="trash" size={20} color="#ca3227" />
        </TouchableOpacity>
        
        <CustomWheelPicker
          localReps={localReps}
          setLocalReps={setLocalReps}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
    

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  imageContainer: {
    width: 80,
    height: 50,
    backgroundColor: '#80c3dd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seriesText: {
    color: 'white',
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 5,
  },
  infoValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoLabel: {
    fontSize: 12,
    color: 'gray',
  },
  deleteButton: {
    padding: 5,
  },
});

export default Serie;
