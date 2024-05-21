import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useEffect } from 'react';

export function RutinaScreen({navigation}) {
    const [rutinaName, setRutinaName] = useState('');

    //validacion de nombre de rutina
    const handleRutinaNameChange = (text) => {
            setRutinaName(text);
    };

    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        if (isConfirmed) {
            if (rutinaName) {
                Alert.alert('Éxito', 'Rutina agregada con éxito');
                setIsConfirmed(false); // Restablecer para futuras confirmaciones
                // Aquí podrías también limpiar los estados o enviar los datos a un servidor
            } else {
                Alert.alert('Error', 'Por favor, completa todos los campos');
                setIsConfirmed(false); // Restablecer en caso de error
            }
        }
    }, [isConfirmed, rutinaName]);
   
    const handleConfirmRoutine = () => {
        if (rutinaName ) {
            Alert.alert('Éxito', 'Rutina agregada con éxito');
            // Aquí podrías también limpiar los estados o enviar los datos a un servidor
        } else {
            Alert.alert('Error', 'Por favor, completa todos los campos');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Nueva Rutina</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de la Rutina"
                value={rutinaName}
                onChangeText={handleRutinaNameChange}
            />
            <Button
                title="Agregar Ejercicio"
                onPress={() => navigation.navigate('Ejercicio')}
            />
            <Button
                title="Confirmar Rutina"
                onPress={handleConfirmRoutine}
            />
        </View>
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
});
