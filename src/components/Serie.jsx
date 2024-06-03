import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import WheelPicker from 'react-native-wheely';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
const Serie = ({ id, index, reps, weight, onChange, onDelete }) => {
  const [localReps, setLocalReps] = useState(reps || 0);
  const [localWeight, setLocalWeight] = useState(weight);
  const [modalVisible, setModalVisible] = useState(false);
  const cantidadRepeticiones = [...Array(51).keys()];
  useEffect(() => {
    onChange(id, localReps, localWeight);
  }, [localReps, localWeight]);

  const handlePickerChange = (text) => {
    setLocalReps(text);
  };

  const handleOnWheelChange = (index) => {
    setLocalReps(index);
  };
 
  return (
    <View style={styles.serieContainer}>
      <Text style={styles.serieTitle}>Serie {index + 1}</Text>
      <TouchableOpacity  onPress={() => setModalVisible(true)}>
        <Text  style={styles.input}>{localReps}</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Reps</Text>
      <TextInput
        style={styles.input}
        placeholder="Peso (KG)"
        keyboardType="numeric"
        value={localWeight}
        onChangeText={setLocalWeight}
      />
        <TouchableOpacity onPress={() => onDelete(id)} style={styles.deleteButton}>
        <Icon name="trash" size={20} color="#ab2920" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent} >
            <Text  style={styles.modalTitle}>Selecciona las repeticiones</Text>
            <WheelPicker
                selectedIndex={localReps }
                options={cantidadRepeticiones}
                onChange={handleOnWheelChange}
                visibleRest= {1}
                decelerationRate={ 0.985 }
                snapToInterval={1}
            />

            <Button
              title="Aceptar"
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
 
              </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  serieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  serieTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  subtitle: {
    fontSize: 16,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginLeft: 10,
    borderRadius: 5,
    marginRight: 5,
    width: 30,
    alignContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginBottom: 10,
  },
  deleteButton: {
    padding: 5,
  },
});

export default Serie;
