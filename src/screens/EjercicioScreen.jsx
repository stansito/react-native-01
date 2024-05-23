import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import CustomCard from '../components/CustomCard';
import Serie from '../components/Serie'; // Asegúrate de que la ruta sea correcta
import Toast from 'react-native-toast-message';

export function EjercicioScreen({ route, navigation }) {
    const [currentExercise, setCurrentExercise] = useState(null);
    const [series, setSeries] = useState([]);

    useEffect(() => {
        if (route.params?.selectedExercise) {
            setCurrentExercise(route.params.selectedExercise);
            setSeries([]); // Resetea las series cuando se selecciona un nuevo ejercicio
        }
    }, [route.params?.selectedExercise]);

    const addSerie = () => {
        setSeries(prevSeries => [...prevSeries, { reps: '', weight: '' }]);
    };

    const removeSerie = (index) => {
        setSeries(prevSeries => prevSeries.filter((_, i) => i !== index));
    };

    const updateSerie = (index, reps, weight) => {
        setSeries(prevSeries => {
            const newSeries = [...prevSeries];
            newSeries[index] = { reps, weight };
            return newSeries;
        });
    };

    const addExercise = () => {
        if (currentExercise) {
            const updatedExercise = { ...currentExercise, series: series };
            Toast.show({
                type: 'debuggerInfo',
                text1: `UPDATEExercise:  ${JSON.stringify(updatedExercise)}`,
                position: 'bottom',
                visibilityTime: 5000,
                bottom: 200
            });
            navigation.navigate('Rutina', { selectedExercise: updatedExercise });
        }
    };

    return (
        <CustomCard>
            <Button
                onPress={() => navigation.navigate('ModalItemsEjercicios')}
                title="Seleccionar Ejercicio"
            />
            {currentExercise && (
                <View>
                    <Text style={styles.exerciseTitle}>{currentExercise.name}</Text>
                    <ScrollView>
                        {series.map((serie, index) => (
                            <Serie
                                key={index}
                                index={index}
                                reps={serie.reps}
                                weight={serie.weight}
                                onChange={updateSerie}
                                onDelete={removeSerie}
                            />
                        ))}
                    </ScrollView>
                    <Button title="Agregar Serie" onPress={addSerie} />
                    <Button title="Agregar ejercicio" onPress={addExercise} />
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
