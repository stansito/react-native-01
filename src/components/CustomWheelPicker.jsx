import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import WheelPicker from 'react-native-wheely';

const CustomWheelPicker = ({ localReps, setLocalReps, modalVisible, setModalVisible }) => {
  const cantidadRepeticiones = [...Array(51).keys()];

  const handleOnWheelChange = (index) => {
    setLocalReps(index);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Selecciona las repeticiones</Text>
          <WheelPicker
            selectedIndex={localReps}
            options={cantidadRepeticiones}
            onChange={handleOnWheelChange}
            visibleRest={1}
            decelerationRate={0.985}
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
  );
};

const styles = StyleSheet.create({
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
});

export default CustomWheelPicker;
