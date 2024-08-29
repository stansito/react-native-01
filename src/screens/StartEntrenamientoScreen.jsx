import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomCard from '../components/CustomCard';
import ExerciseCard from '../components/ExerciseCard';
import StepIndicator from 'react-native-step-indicator';
import Icon from 'react-native-vector-icons/Octicons';
import Toast from 'react-native-toast-message';
import { setupDatabase, insertExercise,insertSeries,insertExerciseInRoutine, getExerciseInRotineById } from '../storage/setupDatabase'; // Asegúrate de usar la ruta correcta

const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 4,
  stepStrokeCurrentColor: '#193741',
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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [allCompleted, setAllCompleted] = useState(false);

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

  useEffect(() => {
    const allCompleted = exercises.every(exercise => exercise.completed);
    setAllCompleted(allCompleted);
  }, [exercises]);

  const openModal = (exercise, index) => {
    if (index > currentStep) {
      Alert.alert('Aviso', 'Debes completar los ejercicios en orden.');
    } else {
      setSelectedExercise(exercise);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const markAsCompleted = () => {
    const updatedExercises = exercises.map((exercise, index) =>
      exercise === selectedExercise ? { ...exercise, completed: true } : exercise
    );
    setExercises(updatedExercises);
    setCurrentStep(prevStep => prevStep + 1);
    closeModal();
  };

  const handleConfirmRoutine = async () => {
    if (rutinaName && exercises.length > 0) {
      const newRoutine = { id: routineId, name: rutinaName, exercises: exercises };
      try {
        const db = await setupDatabase();
        for (const exercise of exercises) {
          const exerciseId = await insertExercise(db, Date.now().toString(), exercise.name, exercise.notas);
          for (const serie of exercise.series) {
            await insertSeries(db, exerciseId, serie.id, serie.weight, serie.reps);
          }
          const routineResult = await insertExerciseInRoutine(db, routineId, exerciseId);
          const rutina = await getExerciseInRotineById(db, routineResult);
          console.log('Routine result:', rutina);
        }

        let storedRoutines = await AsyncStorage.getItem('routines');
        storedRoutines = storedRoutines ? JSON.parse(storedRoutines) : [];
        const existingRoutineIndex = storedRoutines.findIndex(routine => routine.id === routineId);

        if (existingRoutineIndex !== -1) {
          storedRoutines[existingRoutineIndex] = newRoutine;
        } else {
          storedRoutines.push(newRoutine);
        }

        await AsyncStorage.setItem('routines', JSON.stringify(storedRoutines));

        Toast.show({
          type: 'success',
          text1: `Rutina guardada exitosamente`,
          position: 'bottom',
          visibilityTime: 5000,
          bottom: 200,
        });

        navigation.navigate('Entrenamiento');
      } catch (error) {
        Alert.alert('Error', 'Hubo un problema al guardar la rutina: ' + error.message);
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
          {exercises.length === 0 && (
            <View style={styles.emptyExerciseContainer}>
              <Icon style={styles.icon} name="circle-slash" />
              <Text style={styles.emptyExerciseText}>No hay ejercicios</Text>
            </View>
          )}
          {exercises.map((exercise, index) => (
            <ExerciseCard
              key={index}
              exercise={exercise}
              index={index}
              animate={true}
              onPress={openModal}
              onDelete={() => {
                setExercises(prevExercises => prevExercises.filter((_, i) => i !== index));
              }}
            />
          ))}
        </ScrollView>
      </View>
      <Button
        title="Agregar Ejercicio"
        onPress={() => navigation.navigate('Ejercicio', { exerciseIndex: exercises.length })}
      />
      {allCompleted && (
        <Button
          title="Confirmar Rutina"
          onPress={handleConfirmRoutine}
        />
      )}
      <Modal visible={modalVisible} onRequestClose={closeModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Detalles del Ejercicio</Text>
          <Text style={styles.modalText}>Nombre: {selectedExercise?.name}</Text>
          <Text style={styles.modalText}>Series: {selectedExercise?.series.length}</Text>
          <Button title="Marcar como completado" onPress={markAsCompleted} />
          <Button title="Cerrar" onPress={closeModal} />
        </View>
      </Modal>
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
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default StartEntrenamientoScreen;
