import React from 'react';
import { StyleSheet, View } from 'react-native';

export default Circle = () => {
    return (
        <View style={styles.circle} />
    );
}

const styles = StyleSheet.create({
    circle: {
        // position: 'absolute',
        // top: 2 * 140,
        // left: 2 * 132,
        width: 80,
        height: 80,
        borderRadius: 50,
        borderWidth: 10,
        borderColor: '#BAC1B8',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
});