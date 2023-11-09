import {Alert} from 'react-native';
import {generateRandomBetween} from './generateRandomBetween';
import {Dispatch} from 'react';

let minBoundary = 1;
let maxBoundary = 100;

export function nextGuessHandler(
  direction: string,
  currentGuess: number,
  userNumber: number,
  setCurrentGuess: (number: number) => void,
  setGuessRounds: Dispatch<React.SetStateAction<number[]>>,
) {
  if (
    (direction === 'lower' && currentGuess < userNumber) ||
    (direction === 'higher' && currentGuess > userNumber)
  ) {
    Alert.alert("Don't lie!", 'You know that this is wrong...', [
      {text: 'Sorry!', style: 'cancel'},
    ]);
    return;
  }

  if (direction === 'lower') {
    maxBoundary = currentGuess;
  } else {
    minBoundary = currentGuess + 1;
  }
  const newRndNum = generateRandomBetween(
    minBoundary,
    maxBoundary,
    currentGuess,
  );
  setCurrentGuess(newRndNum);
  setGuessRounds(prevGuessRounds => [newRndNum, ...prevGuessRounds]);
}

export const setInitialBoundaries = () => {
  minBoundary = 1;
  maxBoundary = 100;
};
