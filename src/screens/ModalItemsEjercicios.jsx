import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Button, Dimensions, StatusBar,ScrollView  } from "react-native";
import CustomCard from '../components/CustomCard';
import CustomSearchBar from '../components/CustomSearchBar';
import CustomItem from '../components/CustomItem';
import { CardDivider } from '@rneui/base/dist/Card/Card.Divider';
import exercises from '../utils/resources/exercices';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Tab    } from '@rneui/base';


export function ModalItemsEjercicios({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredExercises, setFilteredExercises] = useState(exercises);
    
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
    ]);

    const [indexScroll, setIndexScroll] = useState(0);
    const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const currentIndex = Math.round(contentOffset.x / layoutMeasurement.width);
        if (currentIndex !== indexScroll) {
          setIndexScroll(currentIndex);
        }
      };


    useEffect(() => {
        const filtered = exercises.filter(exercise => exercise.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredExercises(filtered);
    }, [searchQuery]);

    const handleSelectExercise = (exercise) => {
        navigation.navigate('Ejercicio', { selectedExercise: exercise });
    };

    const FirstRoute = () => (
        <FlatList
        data={filteredExercises}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
            <CustomItem item={item} onPress={handleSelectExercise} />
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
        flex: 1, // Asegura que el TabView ocupe todo el espacio disponible
        
      },
});

export default ModalItemsEjercicios;


/*
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
          

  <StyledCard>
                <CustomSearchBar
                    placeholder="Buscar ejercicio"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                 <CardDivider borderColor='transparent'/>
                <FlatList
                    data={filteredExercises}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <CustomItem item={item} onPress={handleSelectExercise} />
                    )}
                />
                <Button title="Ejercicios" size="sm" type="clear">
                    Ejercicios
                </Button>
            </StyledCard>


            Esto es dado por chatgpt
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={200}
        >
            <View style={[styles.page, { backgroundColor: '#ff4081' }]}>

            </View>
            <View style={[styles.page, { backgroundColor: '#673ab7' }]}>

            </View>
        </ScrollView>


*/