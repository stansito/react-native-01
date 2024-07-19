import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomCard from '../components/CustomCard';
import ExerciseCard from '../components/ExerciseCard';
import StepIndicator from 'react-native-step-indicator';
import Icon from 'react-native-vector-icons/Octicons';

const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 4,
  stepStrokeCurrentColor: '#13c7fe',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#4b3c32',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#1e6b75',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#293832',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#292624',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013',


};

export function StartEntrenamientoScreen({ navigation, route }) {
  const [rutinaName, setRutinaName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [routineId, setRoutineId] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

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
      const newRoutine = { id: routineId || Date.now().toString(), name: rutinaName, exercises: exercises };
      try {
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

  return (
    <CustomCard>
      <Text style={styles.title}>{routineId ? 'Iniciar Entrenamiento' : 'Crear Nueva Rutina'}</Text>
      <Text>Rutina: {rutinaName}</Text>
      <View style={styles.container}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentStep}
          stepCount={exercises.length}
          direction='vertical'
          style={styles.stepIndicator}
        />
        <ScrollView style={styles.scrollView}>
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
              animate={true}
            />
          ))}
        </ScrollView>
      </View>
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
    marginBottom: 10,
  },
  container: {
    flexDirection: 'row',
  },
  scrollView: {
    width: '70%',
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

export default StartEntrenamientoScreen;
