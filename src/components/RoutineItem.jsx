import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';


const RoutineItem = ({ routine, index, navigation, handleDeleteRoutine }) => {
    const [showExercises, setShowExercises] = useState(false);

    const toggleExercises = () => {
        setShowExercises(!showExercises);
    };

    return (
        <View style={styles.card}>
            <View style={styles.titleContainer}>
                <Text style={styles.routineTitle}>s{routine.name}</Text>
            </View>
            <TouchableOpacity style={styles.slidersContainer} onPress={toggleExercises}>
                <Text style={styles.exercicecounter}>{routine.exercises.length}</Text>
                <Icon name="chevron-down" size={24} color="#42556b" />  
            </TouchableOpacity>
            {showExercises && (
                <View style={styles.content}>
                 
                    <View style={styles.exercisesContainer}>
                        {routine.exercises.map((exercise, idx) => (
                            <Text key={idx} style={styles.exerciseText}>
                                {exercise.name}
                            </Text>
                        ))}
                    </View>
                </View>
            )}
            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('Rutina', { routine: routine })}
                >
                    <Text style={styles.actionButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDeleteRoutine(index)}
                >
                    <Text style={styles.actionButtonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
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
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 6,
        paddingBottomm: 16,
        paddingTop: 16,
        borderColor: '#4A90E2',
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 12,
    },
    routineTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
    },
    content: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        flex: 1,
    },
    exercisesContainer: {
        marginTop: 12,
    },
    exerciseText: {
        fontSize: 16,
        color: '#666666',
        marginVertical: 4,
    },
    actionsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'hsl(212, 67%, 67%)',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    actionButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
    },
    actionButtonText: {
        fontSize: 16,
        color:  'hsl(212, 67%, 96%)',
    },
    slidersContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    exercicecounter: {
        marginLeft: 8, // Ajusta el espacio entre el contador y el icono
        fontSize: 16,
        color: 'hsl(214.28571428571428, 5.882352941176474%, 53.333333333333336%)',
    },
});

export default RoutineItem;
