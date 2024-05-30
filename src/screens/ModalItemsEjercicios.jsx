import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import CustomCard from '../components/CustomCard';
import CustomSearchBar from '../components/CustomSearchBar';
import CustomItem from '../components/CustomItem';
import exercises from '../utils/resources/exercices';
import { TabView, SceneMap } from 'react-native-tab-view';

export function ModalItemsEjercicios({ route, navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredExercises, setFilteredExercises] = useState(exercises);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
    ]);

    const exerciseIndex = route.params?.exerciseIndex;

    useEffect(() => {
        const filtered = exercises.filter(exercise => exercise.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredExercises(filtered);
    }, [searchQuery]);

    const handleSelectExercise = (exercise) => {
        navigation.navigate('Ejercicio', { selectedExercise: exercise, exerciseIndex: exerciseIndex });
    };

    const FirstRoute = () => (
        <FlatList
            data={filteredExercises}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <CustomItem item={item} onPress={() => handleSelectExercise(item)} />
            )}
        />
    );

    const SecondRoute = () => (
        <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
    );

    return (
        <CustomCard>
            <CustomSearchBar
                placeholder="Buscar ejercicio"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <TabView
                navigationState={{ index, routes }}
                renderScene={SceneMap({
                    first: FirstRoute,
                    second: SecondRoute,
                })}
                onIndexChange={setIndex}
                initialLayout={{ width: Dimensions.get('window').width }}
                style={styles.tabView}
            />
        </CustomCard>
    );
}

const styles = StyleSheet.create({
    fonts: {
        marginBottom: 8,
        fontSize: 18,
        fontWeight: 'bold',
    },
    scene: {
        flex: 1,
    },
    tabView: {
        paddingTop: 10,
        flex: 1,
    },
});

export default ModalItemsEjercicios;
