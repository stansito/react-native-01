import { View, Text, Button, StyleSheet } from 'react-native';
import { useState } from 'react';


export function EntrenamientoScreen( { navigation }) {
      const [newRoutineName, setNewRoutineName] = useState('');
    
      const handleSaveRoutine = () => {
        // Aquí puedes guardar la nueva rutina con el nombre `newRoutineName`
        console.log('Guardar nueva rutina:', newRoutineName);
        setModalVisible(false);
        setNewRoutineName('');
      };
  
      return (
      <View style={styles.container}>
        <Text style={styles.title}>Ventanass Principal de Ejercicios</Text>
        <Button title="Crear Nueva Rutina " onPress={() => navigation.navigate('Rutina')} />
        
      </View>
      );
    }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 30,
      borderRadius: 10,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
  });
  
  