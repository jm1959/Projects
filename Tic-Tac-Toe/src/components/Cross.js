import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

export default Cross = () => {
    return (
        <View style={styles.cross}>
            <View style={styles.crossLine}></View>
            <View style={[styles.crossLine, styles.crossLine2]}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    cross: {
        // position: 'absolute',
        // top: 1 * 140,
        // left: 2 * 132,
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    crossLine: {
        position: 'absolute',
        width: 15,
        height: 80,
        borderRadius: 10,
        backgroundColor: '#BAC1B8',
        transform: [{ rotate: '45deg' }],
    },
    crossLine2: {
        transform: [{ rotate: '-45deg' }],
    }
});