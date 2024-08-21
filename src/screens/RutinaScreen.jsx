import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomCard from '../components/CustomCard';
import ExerciseCard from '../components/ExerciseCard';
import Icon from 'react-native-vector-icons/Octicons';
import { setupDatabase, insertRoutine } from '../storage/setupDatabase'; 

export function RutinaScreen({ navigation, route }) {
  const [rutinaName, setRutinaName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [routineId, setRoutineId] = useState(null);

  useEffect(() => {
    if (route.params?.routine) {
      const selectedRoutine = route.params.routine;
      setRoutineId(selectedRoutine.id);
      setRutinaName(selectedRoutine.name);
      setExercises(selectedRoutine.exercises);
    }
  }, [route.params?.routine]);

  useEffect(() => {
    if (route.params?.selectedExercise && route.params?.exerciseIndex !== undefined) {
      const updatedExercise = route.params.selectedExercise;
      const index = route.params.exerciseIndex;

      setExercises(prevExercises => {
        const newExercises = [...prevExercises];
        newExercises[index] = updatedExercise;
        return newExercises;
      });
    }
  }, [route.params?.selectedExercise, route.params?.exerciseIndex]);

  const handleRutinaNameChange = (text) => {
    setRutinaName(text);
  };

  const handleConfirmRoutine = async () => {
    if (rutinaName && exercises.length > 0) {
      try {
        const db = await setupDatabase();
        const routineId = await insertRoutine(db, rutinaName);
        const newRoutine = { id: routineId , name: rutinaName, exercises: exercises };
        let storedRoutines = await AsyncStorage.getItem('routines');
        storedRoutines = storedRoutines ? JSON.parse(storedRoutines) : [];

        const existingRoutineIndex = storedRoutines.findIndex(routine => routine.id === routineId);

        if (existingRoutineIndex !== -1) {
          storedRoutines[existingRoutineIndex] = newRoutine;
        } else {
          storedRoutines.push(newRoutine);
        }

        await AsyncStorage.setItem('routines', JSON.stringify(storedRoutines));
        navigation.navigate('Entrenamiento');
      } catch (error) {
        Alert.alert('Error', 'Hubo un problema al guardar la rutina');
      }
    } else {
      Alert.alert('Error', 'Por favor, completa todos los campos');
    }
  };

  const handleDeleteExercise = (index) => {
    setExercises(prevExercises => prevExercises.filter((_, i) => i !== index));
  };

  return (
    <CustomCard>
      <Text style={styles.title}>{routineId ? 'Editar Rutina' : 'Crear Nueva Rutina'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la Rutina"
        value={rutinaName}
        onChangeText={handleRutinaNameChange}
      />
      <ScrollView>
        {exercises && exercises.length === 0 && (
          <View style={styles.emptyExerciseContainer}>
            <Icon style={styles.icon} name="circle-slash" />
            <Text style={styles.emptyExerciseText}>Aún no has agregado ejercicios</Text>
          </View>
        )}
        {exercises.map((exercise, index) => (
          <ExerciseCard
            key={index}
            exercise={exercise}
            index={index}
            navigation={navigation}
            onDelete={handleDeleteExercise}
          />
        ))}
      </ScrollView>
      <Button
        title="Agregar Ejercicio"
        onPress={() => navigation.navigate('Ejercicio', { exerciseIndex: exercises.length })}
      />
      <Button
        title="Confirmar Rutina"
        onPress={handleConfirmRoutine}
      />
    </CustomCard>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  emptyExerciseContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 120,
    color: 'gray',
    opacity: 0.2,
    paddingTop: 30,
  },
  emptyExerciseText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    zIndex: 1,
  },
});

export default RutinaScreen;
