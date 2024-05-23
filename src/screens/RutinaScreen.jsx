import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomCard from '../components/CustomCard';
import Toast from 'react-native-toast-message';

export function RutinaScreen({ navigation, route }) {
    const [rutinaName, setRutinaName] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [routine, setRoutine] = useState(null);

    useEffect(() => {
        if (route.params?.routine) {
            const selectedRoutine = route.params.routine;
            setRoutine(selectedRoutine);
            setRutinaName(selectedRoutine.name);
            setExercises(selectedRoutine.exercises);
        }
    }, [route.params?.routine]);
    
    useEffect(() => {
      
        if (route.params?.selectedExercise) {
            setExercises(prevExercises => [...prevExercises, route.params.selectedExercise]);
        }
    }, [route.params?.selectedExercise]);

    const handleRutinaNameChange = (text) => {
        setRutinaName(text);
    };

    const handleConfirmRoutine = async () => {
        if (rutinaName && exercises.length > 0) {
            const newRoutine = { name: rutinaName, exercises: exercises };
            try {
                let storedRoutines = await AsyncStorage.getItem('routines');
                storedRoutines = storedRoutines ? JSON.parse(storedRoutines) : [];
    
                // Buscar la rutina existente
                const existingRoutineIndex = storedRoutines.findIndex(routine => routine.name === rutinaName);
    
                if (existingRoutineIndex !== -1) {
                    // Actualizar la rutina existente
                    storedRoutines[existingRoutineIndex] = newRoutine;
                } else {
                    // Agregar la nueva rutina si no existe
                    storedRoutines.push(newRoutine);
                }
    
                await AsyncStorage.setItem('routines', JSON.stringify(storedRoutines));
                navigation.navigate('Entrenamiento'); // Navegar a la pantalla principal
            } catch (error) {
                Alert.alert('Error', 'Hubo un problema al guardar la rutina');
            }
        } else {
            Alert.alert('Error', 'Por favor, completa todos los campos');
        }
    };
    return (
        <CustomCard>
            <Text style={styles.title}>Crear Nueva Rutina</Text>
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
                    </View>
                ))}
            </ScrollView>
            <Button
                title="Agregar Ejercicio"
                onPress={() => navigation.navigate('Ejercicio')}
            />
            <Button
                title="Confirmar Rutina"
                onPress={handleConfirmRoutine}
            />
     
        </CustomCard>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
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
});

export default RutinaScreen;
