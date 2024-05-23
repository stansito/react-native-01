import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem } from '@rneui/themed';

const CustomItem = ({ item, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress(item)}>
            <ListItem containerStyle={styles.listItem}>
                <ListItem.Content style={styles.listItemContent}>
                    <ListItem.Title style={styles.listItemTitle}>{item.name}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    listItem: {
        borderLeftWidth: 5,
        borderColor: '#40a4f4',
        marginVertical: 5,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 10,
        paddingBottom: 10,
    },
    listItemContent: {
        flex: 1,
        marginLeft: 5,
    },
    listItemTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default CustomItem;
