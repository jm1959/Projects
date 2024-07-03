import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Pressable, Alert } from 'react-native';
import Circle from './src/components/Circle';
import Cross from './src/components/Cross';
import board from './assets/board.png';

export default function App() {
  const [turn, setTurn] = useState('x');
  const [player, setPlayer] = useState(1);

  const [gameMap, setGameMap] = useState([
    [" ", " ", " "], //first row
    [" ", " ", " "], //second row
    [" ", " ", " "] //third row
  ]);

  const playersTurn = (rowIndex, cellIndex) => {
    if (gameMap[rowIndex][cellIndex] !== " ") {
      Alert.alert('Invalid Move', 'This cell is already taken');
      return;
    }

    setGameMap((currentMap) => {
      currentMap[rowIndex][cellIndex] = turn;
      return currentMap;
    });
    setPlayer(player === 1 ? 2 : 1);
    setTurn(turn === 'x' ? 'o' : 'x');
    const winner = checkWin();
    if (winner) {
      gameWon(winner)
    } else {
      checkTie();
    }
  }
  const restart = () => {
    setTurn('x');
    setGameMap([
      [" ", " ", " "], //first row
      [" ", " ", " "], //second row
      [" ", " ", " "] //third row
    ]);
    setPlayer(1);
  }

  const checkWin = () => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      const isXWinner = gameMap[i].every(cell => cell === 'x');
      const isYWinner = gameMap[i].every(cell => cell === 'o');
      if (isXWinner) {
        return 'x'
      }
      if (isYWinner) {
        return 'o'
      }
    }

    // Check columns

    for (let i = 0; i < 3; i++) {
      let isColumnXWinner = true;
      let isColumnYWinner = true;
      for (let j = 0; j < 3; j++) {
        if (gameMap[j][i] !== 'x') {
          isColumnXWinner = false;
        }
        if (gameMap[j][i] !== 'o') {
          isColumnYWinner = false;
        }
      }
      if (isColumnXWinner) {
        return 'x'

      }
      if (isColumnYWinner) {
        return 'o'

      }
    }

    // Check diagonals
    let isDiagonalXWinner = true;
    let isDiagonalOWinner = true;
    let isReverseDiagonalXWinner = true;
    let isReverseDiagonalOWinner = true;
    for (let i = 0; i < 3; i++) {

      if (gameMap[i][i] !== 'x') {
        isDiagonalXWinner = false;
      }
      if (gameMap[i][i] !== 'o') {
        isDiagonalOWinner = false;
      }
      if (gameMap[i][2 - i] !== 'x') {
        isReverseDiagonalXWinner = false;
      }
      if (gameMap[i][2 - i] !== 'o') {
        isReverseDiagonalOWinner = false;
      }

    }
    if (isDiagonalXWinner || isReverseDiagonalXWinner) {
      return 'x'
    }
    if (isDiagonalOWinner || isReverseDiagonalOWinner) {
      return 'o'
    }

  }

  const checkTie = () => {
    let isTie = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameMap[i][j] === ' ') {
          isTie = false;
          break;
        }
      }
    }
    if (isTie) {
      Alert.alert('Tie', 'Game is a tie');
    }
  }

  const gameWon = (winner) => {
    Alert.alert(`Player ${winner} Wins`, 'Congratulations');
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={board} style={styles.imageBackground}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Players {player} Turn</Text>
        </View>
        <View style={styles.map}>
          {
            gameMap.map((row, rowIndex) =>
              <View key={`row-${rowIndex}`} style={styles.row}>
                {row.map((cell, cellIndex) =>
                  <Pressable key={`row-${rowIndex}-cell-${cellIndex}`} onPress={() => playersTurn(rowIndex, cellIndex)} style={styles.cell}>
                    {cell === 'x' && <Cross />}
                    {cell === 'o' && <Circle />}
                  </Pressable> // Add a key for each cell
                )}
              </View>
            )
          }
        </View>
        <View style={styles.restart}>
          <Pressable onPress={() => restart()} ><Text>restart</Text></Pressable>
        </View>

      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
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
    //borderWidth: 1,
    //borderColor: '#FFFFFF',
    width: '100%',
    aspectRatio: 0.95,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    //borderWidth: 1,
    //borderColor: '#FFFFFF',
  },
  cell: {
    flex: 1,
    //borderWidth: 1,
    margin: 10
    // borderColor: 'red'
  },
  restart: {
    position: 'absolute',
    right: 10,
    bottom: 150,
    backgroundColor: 'blue',
    width: '30%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  header: {
    position: 'absolute',
    top: 100,
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  }
});
