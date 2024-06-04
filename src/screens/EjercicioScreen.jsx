import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CustomCard from '../components/CustomCard';
import Serie from '../components/Serie';
import Icon from 'react-native-vector-icons/FontAwesome6';

export function EjercicioScreen({ route, navigation }) {
    const [currentExercise, setCurrentExercise] = useState({ id: Date.now().toString(), name: '', series: [] });
    const [series, setSeries] = useState([]);
    const exerciseIndex = route.params?.exerciseIndex;

    useEffect(() => {
        if (route.params?.selectedExercise) {
            setCurrentExercise(route.params.selectedExercise);
            setSeries(route.params.selectedExercise.series || []);
        }
    }, [route.params?.selectedExercise]);

    const addSerie = () => {
        setSeries(prevSeries => [...prevSeries, { id: Date.now().toString(), reps: '', weight: '' }]);
    };

    const removeSerie = (id) => {
        setSeries(prevSeries => prevSeries.filter(serie => serie.id !== id));
    };

    const updateSerie = (id, reps, weight) => {
        setSeries(prevSeries => {
            const newSeries = prevSeries.map(serie =>
                serie.id === id ? { ...serie, reps, weight } : serie
            );
            return newSeries;
        });
    };

    const saveExercise = () => {
        const updatedExercise = { ...currentExercise, series };
        navigation.navigate('Rutina', { selectedExercise: updatedExercise, exerciseIndex: exerciseIndex });
    };

    const handleSelectExercise = () => {
        navigation.navigate('ModalItemsEjercicios', { exerciseIndex });
    };

    return (
        <CustomCard>
            {currentExercise.name === '' && (
                <Button
                    onPress={handleSelectExercise}
                    title="Seleccionar Ejercicio"
                />
            )}
            <ScrollView>
                {currentExercise.name !== '' && (
                    <View>
                        <View style={styles.exerciseHeader}>
                            <Text style={styles.exerciseTitle}>{currentExercise.name}</Text>
                            <TouchableOpacity onPress={handleSelectExercise} style={styles.iconButton}>
                                <Icon name="retweet" size={24} color="#000000" />
                            </TouchableOpacity>
                        </View>
                        {series.map((serie, index) => (
                            <Serie
                                key={serie.id}
                                id={serie.id}
                                index={index}
                                reps={serie.reps}
                                weight={serie.weight}
                                onChange={updateSerie}
                                onDelete={removeSerie}
                            />
                        ))}
                    </View>
                )}
            </ScrollView>
            <Button title="Agregar Serie" onPress={addSerie} />
            <Button title="Guardar Ejercicio" onPress={saveExercise} />
        </CustomCard>
    );
}

const styles = StyleSheet.create({
    exerciseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    exerciseTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    iconButton: {
        padding: 5,
    },
});

export default EjercicioScreen;
