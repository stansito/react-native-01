// CustomToast.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomToast = ({ text1, props }) => (
  <View style={styles.toastContainer}>
    <Text style={styles.toastText}>{text1}</Text>
    {props && <Text style={styles.toastText}>{props.uuid}</Text>}
  </View>
);

const toastConfig = {
    //Nombres de Toast Personalizados
    debuggerInfo: CustomToast,
};

const styles = StyleSheet.create({
  toastContainer: {
    width: '90%',
    backgroundColor: '#333',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: '5%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export { toastConfig };
