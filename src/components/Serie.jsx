import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Serie = ({ index, reps, weight, onChange, onDelete }) => {
    const [localReps, setLocalReps] = useState(reps);
    const [localWeight, setLocalWeight] = useState(weight);

    useEffect(() => {
        onChange(index, localReps, localWeight);
    }, [localReps, localWeight]);

    return (
        <View style={styles.serieContainer}>
            <Text style={styles.serieTitle}>Serie {index + 1}</Text>
            <TextInput
                style={styles.input}
                placeholder="Repeticiones"
                keyboardType="numeric"
                value={localReps}
                onChangeText={setLocalReps}
            />
            <TextInput
                style={styles.input}
                placeholder="Peso (KG)"
                keyboardType="numeric"
                value={localWeight}
                onChangeText={setLocalWeight}
            />
            <Button title="Eliminar" onPress={() => onDelete(index)} />
        </View>
    );
};

const styles = StyleSheet.create({
    serieContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    serieTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 5,
        marginLeft: 10,
        borderRadius: 5,
    },
});

export default Serie;
