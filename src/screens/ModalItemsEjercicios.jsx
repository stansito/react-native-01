import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";

export function ModalItemsEjercicios({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    
    
    const [exercises, setExercises] = useState([
        // Suponiendo que tienes una lista inicial de ejercicios
        { id: 1, name: 'Push Up' },
        { id: 2, name: 'Pull Up' },
        { id: 3, name: 'Squat' }
    ]);
    const [filteredExercises, setFilteredExercises] = useState(exercises);

    useEffect(() => {
        // Filtrar ejercicios basados en searchQuery
        const filtered = exercises.filter(exercise => exercise.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredExercises(filtered);
    }, [searchQuery, exercises]);

    const handleSelectExercise = (exercise) => {
        navigation.navigate('Ejercicio', { selectedExercise: exercise });
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  }}>
            <TextInput
                placeholder="Buscar ejercicio"
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', padding: 10 }}
            />
            <FlatList
                data={filteredExercises}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelectExercise(item)}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
