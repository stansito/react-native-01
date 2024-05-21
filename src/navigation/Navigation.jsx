import * as React from 'react';
import { EntrenamientoScreen } from '../screens/EntrenamientoScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { RutinaScreen } from '../screens/RutinaScreen';
import { EjercicioScreen } from '../screens/EjercicioScreen';
import { ModalItemsEjercicios } from '../screens/ModalItemsEjercicios';

function HomeStackScreen() {
const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}


function EntrenamientoStackScreen() {
  const EntrenamientoStack = createNativeStackNavigator();
  return (
    <EntrenamientoStack.Navigator>
      <EntrenamientoStack.Group>
        <EntrenamientoStack.Screen name="Entrenamiento" component={EntrenamientoScreen} />
        <EntrenamientoStack.Screen name="Rutina" component={RutinaScreen} />
        <EntrenamientoStack.Screen name="Ejercicio" component={EjercicioScreen} />
      </EntrenamientoStack.Group>
      <EntrenamientoStack.Group>
        <EntrenamientoStack.Screen name="ModalItemsEjercicios" component={ModalItemsEjercicios} />
      </EntrenamientoStack.Group>
    </EntrenamientoStack.Navigator>
  );
}

function MyStack() {
  const Tab = createBottomTabNavigator();
  return (
       <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="HomeStack" component={HomeStackScreen} />
        <Tab.Screen name="EntrenamientoStack" component={EntrenamientoStackScreen} />
      </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
