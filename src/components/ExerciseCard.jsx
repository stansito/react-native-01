import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import { TouchableOpacity } from 'react-native';

const ExerciseCard = ({ exercise, index, navigation, onDelete }) => {
  const handleDelete = () => {
    onDelete(index);
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Ejercicio', { selectedExercise: exercise, exerciseIndex: index })}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Text style={styles.seriesText}>imagen</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoItemEjercicio}>
            <Text style={styles.infoValue}>{exercise.name}</Text>
            <Text style={styles.infoLabel}>Ejercicio</Text>
          </View>
          <View style={styles.infoItemSeries}>
            <Text style={styles.infoValue}>{exercise.series.length}</Text>
            <Text style={styles.infoLabel}>Series</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => onDelete(index)} style={styles.deleteButton}>
          <Icon name="trash" size={20} color="#ca3227" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  infoItemEjercicio: {
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 5,
  },

  infoItemSeries: {
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoLabel: {
    fontSize: 12,
    color: 'gray',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default ExerciseCard;
