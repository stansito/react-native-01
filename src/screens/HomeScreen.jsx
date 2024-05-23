import React, { useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';


export function HomeScreen({ navigation }) {
  const scrollViewRef = useRef();

  const handleScroll = event => {
      const contentOffsetX = event.nativeEvent.contentOffset.x;
      const viewSize = event.nativeEvent.layoutMeasurement.width;
      const selectedIndex = Math.floor(contentOffsetX / viewSize);
      // Puedes hacer algo con el índice seleccionado, como cambiar el estado o ejecutar una función
  };

  return (
      <View style={styles.container}>
          <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              contentOffset={{ x: Dimensions.get('window').width * 0.5 - (Dimensions.get('window').width * 0.7 / 2) }}
          >
              <View style={styles.item}>
                  <Text style={styles.title}>Item 1</Text>
              </View>
              <View style={styles.item}>
                  <Text style={styles.title}>Item 2</Text>
              </View>
              <View style={styles.item}>
                  <Text style={styles.title}>Item 3</Text>
              </View>
              <View style={styles.item}>
                  <Text style={styles.title}>Item 4</Text>
              </View>
              <View style={styles.item}>
                  <Text style={styles.title}>Item 5</Text>
              </View>
              <View style={styles.item}>
                  <Text style={styles.title}>Item 6</Text>
              </View>
          </ScrollView>
      </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  item: {
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'lightblue',
      borderRadius: 5,
      marginLeft: width * 0.15, // Margen izquierdo para centrar el elemento en la pantalla
      marginRight: 10, // Margen derecho entre elementos
  },
  title: {
      fontSize: 20,
      textAlign: 'center',
  },
});

