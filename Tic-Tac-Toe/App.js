import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native';
import Circle from './src/components/Circle';
import Cross from './src/components/Cross';
import board from './assets/board.png';

export default function App() {
  const [gameMap, setGameMap] = useState([
    [" ", " ", " "], //first row
    [" ", " ", " "], //second row
    [" ", " ", " "] //third row
  ]);

  const [value, setValue] = useState('');

  const playersTurn = () => {
    setValue('x')
  }
  const restart = () => {
    setValue('')
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={board} style={styles.imageBackground}>
        <View style={styles.map}>
          {
            gameMap.map((row) =>
              <View style={styles.row}>
                {row.map((cell) =>
                  <Pressable style={styles.cell}>
                    {cell === 'x' && <Cross />}
                    {cell === 'o' && <Circle />}
                  </Pressable> // Add a key for each cell
                )}
              </View>
            )
          }
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    width: '100%',
    aspectRatio: 0.95
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    margin: 10
    // borderColor: 'red'
  },
  restart: {
    backgroundColor: 'blue',
    width: '30%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  }
});
