import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import WheelPicker from 'react-native-wheely';
import Toast from 'react-native-toast-message';


const Serie = ({ id,index, reps, weight, onChange, onDelete }) => {
 
    const [localReps, setLocalReps] = useState(reps);
    const [localWeight, setLocalWeight] = useState(weight);
    const cantidadRepeticiones = [...Array(51).keys()];
    useEffect(() => {
        onChange(id, localReps, localWeight);
    }, [localReps, localWeight]);

    return (
        
        <View style={styles.serieContainer}>
   
            <Text style={styles.serieTitle}>Serie {index + 1}</Text>
            <WheelPicker
                selectedIndex={localReps }
                options={cantidadRepeticiones}
                onChange={(index ) => setLocalReps(index)}
                visibleRest= {1}
            />
            <Text  style={styles.subtitle}>Reps</Text>
            <TextInput
                style={styles.input}
                placeholder="Peso (KG)"
                keyboardType="numeric"
                value={localWeight}
                onChangeText={setLocalWeight}
            />
         
            <Button color='#ab2920' title="Eliminar" onPress={() => onDelete(id)} />
        </View>
    );
};

const styles = StyleSheet.create({
    serieContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    serieTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    subtitle: {
        fontSize: 16,
        marginLeft: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 5,
        marginLeft: 10,
        borderRadius: 5,
        marginRight: 5,
    },
  
});

export default Serie;
