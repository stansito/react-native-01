// components/CustomSearchBar.js
import React from 'react';
import { SearchBar } from '@rneui/themed';
import { StyleSheet } from 'react-native';

const CustomSearchBar = ({ value, onChangeText, placeholder }) => {
    return (
        <SearchBar
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInputContainer}
            round={true}
        />
    );
};

const styles = StyleSheet.create({
    searchBarContainer: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        padding: 0, // Remover padding adicional
        
    },
    searchBarInputContainer: {
        backgroundColor: 'hsla(220, 12%, 95%, 1)', // Color de fondo del input
        borderRadius: 5,
        height: 35,
        borderWidth: 0,
        
    },
});

export default CustomSearchBar;
