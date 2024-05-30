import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import CustomCard from '../components/CustomCard';
import Serie from '../components/Serie';
import Toast from 'react-native-toast-message';

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

    return (
        <CustomCard>
            <Button
                onPress={() => navigation.navigate('ModalItemsEjercicios', { exerciseIndex })}
                title="Seleccionar Ejercicio"
            />
            {currentExercise && (
                <View>
                    <Text style={styles.exerciseTitle}>{currentExercise.name}</Text>
               
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
                
                    <Button title="Agregar Serie" onPress={addSerie} />
                    <Button title="Guardar Ejercicio" onPress={saveExercise} />
                </View>
            )}
        </CustomCard>
    );
}

const styles = StyleSheet.create({
    exerciseTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default EjercicioScreen;

