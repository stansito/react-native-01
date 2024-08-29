import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Button, TextInput } from 'react-native';
import { setupDatabase, getRoutineById, getExerciseById,deleteRoutineById } from '../storage/setupDatabase'; // Asegúrate de usar la ruta correcta

export function HomeScreen({ navigation }) {
  const [exercise, setExercise] = useState(null);
  const [routine, setRoutine] = useState(null);


  useEffect(() => {
    const initializeDatabase = async () => {
      const db = await setupDatabase();
      if (db) {
        // Inserta un registro de ejemplo
        //TODO: 
        const exerciseResult = await getExerciseById(db, 93);
        const routineResult = await getRoutineById(db, 12);
        //await deleteRoutineById(db, 3);
        console.log("Rutina: ",routineResult);
        //const routinesData = await getAllRoutines(db);
       // console.log("Todas las rutinas: ",routinesData);
        setExercise(exerciseResult);
        setRoutine(routineResult);
      }
    };

    initializeDatabase();
  }, []); // El arreglo vacío asegura que solo se ejecute una vez al montar el componente

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {routine ? (
          <View>
            <Text style={styles.text}>Nombre: {routine.nombre}</Text>
            <View>
              <Text style={styles.text}>Fecha: {exercise.fecha}</Text>
              <Text style={styles.text}>Tipo de Ejercicio: {exercise.tipo_ejercicio_id}</Text>
              <Text style={styles.text}>Notas: {exercise.notas}</Text>
              <Text style={styles.text}>Series:</Text>
              {exercise.series && exercise.series.length > 0 ? (
                exercise.series.map((serie, index) => (
                  <View key={index}>
                    <Text style={styles.text}>Serie {serie.id}: {serie.peso} kg x {serie.repeticiones} reps</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.text}>No hay series registradas.</Text>
              )}
              <Button title="Eliminar Ejercicio" onPress={() => {
                // Lógica para eliminar el ejercicio
              }} />
            </View>
          </View>
        ) : (
          <Text style={styles.text}>No hay Rutinas registradas.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width,
  },
  text: {
    fontSize: 18,
  },
});
 