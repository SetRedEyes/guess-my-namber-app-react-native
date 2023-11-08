import {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, useWindowDimensions} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import Title from '../components/ui/Title';
import {Card} from '../components/ui/Card/Card';
import {NumberContainer} from '../components/game/NumberContainer';
import InstructionText from '../components/ui/InstructionText';
import PrimaryButton from '../components/ui/PrimaryButton';

import {
  nextGuessHandler,
  setInitialBoundaries,
} from '../utils/nextGuessHandler';
import {generateRandomBetween} from '../utils/generateRandomBetween';
import {GuessLogItem} from '../components/game/GuessLogItem';

function GameScreen({userNumber, onGameOver}) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  const {width} = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    setInitialBoundaries();
  }, []);

  const guessRoundsListLength = guessRounds.length;

  const renderItem = ({item, index}) => {
    return (
      <GuessLogItem roundNumber={guessRoundsListLength - index} guess={item}>
        {item}
      </GuessLogItem>
    );
  };

  const keyExtractor = ({item}) => item;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={nextGuessHandler.bind(
                this,
                'lower',
                currentGuess,
                userNumber,
                setCurrentGuess,
                setGuessRounds,
              )}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={nextGuessHandler.bind(
                this,
                'higher',
                currentGuess,
                userNumber,
                setCurrentGuess,
                setGuessRounds,
              )}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={nextGuessHandler.bind(
                this,
                'lower',
                currentGuess,
                userNumber,
                setCurrentGuess,
                setGuessRounds,
              )}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={nextGuessHandler.bind(
                this,
                'higher',
                currentGuess,
                userNumber,
                setCurrentGuess,
                setGuessRounds,
              )}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 100,
    alignItems: 'center',
  },
  instructionText: {marginBottom: 12},
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {flex: 1},
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
