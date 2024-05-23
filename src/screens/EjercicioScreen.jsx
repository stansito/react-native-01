import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

export function EjercicioScreen({ route, navigation }) {
    const [ejercicios, setEjercicios] = useState([]);

    useEffect(() => {
        if (route.params?.selectedExercise) {
            
            setEjercicios(prevEjercicios => [...prevEjercicios, route.params.selectedExercise]);
        }
    }, [route.params?.selectedExercise]);

    return (
        <View>
            <Text>EjercicioScreen</Text>
            <View>
                {ejercicios.map((ejercicio, key) => (
                    <Text key={key}>
                        {ejercicio.name}
                    </Text>
                ))}
            </View>
            <Button
                onPress={() => navigation.navigate('ModalItemsEjercicios')}
                title="Open Modal"
            />
        </View>
    );
}
