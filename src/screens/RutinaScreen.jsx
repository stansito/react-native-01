import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomCard from '../components/CustomCard';
import Toast from 'react-native-toast-message';

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
        /*Toast.show({
            type: 'debuggerInfo',
            text1: `Rutinass:  ${JSON.stringify(route.params)}`,
            position: 'bottom',
            visibilityTime: 10000,
            bottom: 200
        });*/
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
                {exercises.map((exercise, index) => (
                    <View key={index} style={styles.exerciseContainer}>
                        <Text style={styles.exerciseText}>{exercise.name}</Text>
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Editar"
                                onPress={() => navigation.navigate('Ejercicio', { selectedExercise: exercise, exerciseIndex: index })}
                            />
                            <Button
                                title="Eliminar"
                                color="red"
                                onPress={() => handleDeleteExercise(index)}
                            />
                        </View>
                    </View>
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
    exerciseContainer: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    exerciseText: {
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});

export default RutinaScreen;
