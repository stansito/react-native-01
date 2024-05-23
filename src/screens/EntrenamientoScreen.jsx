import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomCard from '../components/CustomCard';
import Toast from 'react-native-toast-message';

export function EntrenamientoScreen({ navigation }) {
    const [routines, setRoutines] = useState([]);

    useEffect(() => {
        const loadRoutines = async () => {
            try {
                const storedRoutines = await AsyncStorage.getItem('routines');
                if (storedRoutines) {
                    const routinesData = JSON.parse(storedRoutines);
                    setRoutines(routinesData);
                    routinesData.forEach(routine => {
                        showRoutineToast(routine);
                    });
                }
            } catch (error) {
                console.error('Error loading routines:', error);
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Hubo un problema al cargar las rutinas'
                });
            }
        };
        // cargar rutinas al entrar a la pantalla
        const focusListener = navigation.addListener('focus', loadRoutines);

        return focusListener;
    }, [navigation]);

    const showRoutineToast = (routine) => {
        const exerciseNames = routine.exercises.map(ex => ex.name).join(', ');
        Toast.show({
            type: 'info',
            text1: `Rutina: ${routine.name}`,
            text2: `Ejercicios: ${exerciseNames}`,
            position: 'bottom'
        });
    };

    const handleDeleteRoutine = async (routineIndex) => {
        try {
            const updatedRoutines = [...routines];
            updatedRoutines.splice(routineIndex, 1);
            await AsyncStorage.setItem('routines', JSON.stringify(updatedRoutines));
            setRoutines(updatedRoutines);
            Toast.show({
                type: 'success',
                text1: 'Rutina eliminada',
                text2: 'La rutina ha sido eliminada exitosamente'
            });
        } catch (error) {
            console.error('Error deleting routine:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Hubo un problema al eliminar la rutina'
            });
        }
    };

    return (
        <CustomCard>
            <Text style={styles.title}>Ventanas Principal de Entrenamientos</Text>
            <Button title="Crear Nueva Rutina" onPress={() => navigation.navigate('Rutina')} />
            <ScrollView>
                {routines.map((routine, index) => (
                    <View key={index} style={styles.routineContainer}>
                        <Text style={styles.routineText}>{routine.name}</Text>
                        {routine.exercises.map((exercise, idx) => (
                            <Text key={idx} style={styles.exerciseText}>{exercise.name}</Text>
                        ))}
                        <Button
                            title="Editar Rutina"
                            onPress={() => navigation.navigate('Rutina', { routine: routine })}
                        />
                        <Button
                            title="Eliminar Rutina"
                            onPress={() => handleDeleteRoutine(index)}
                        />
                    </View>
                ))}
            </ScrollView>
        </CustomCard>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    routineContainer: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    routineText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    exerciseText: {
        fontSize: 16,
        marginLeft: 10,
    },
});

export default EntrenamientoScreen;
