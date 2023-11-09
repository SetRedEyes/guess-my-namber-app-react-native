import {useEffect, useMemo, useState} from 'react';
import {View, FlatList, ListRenderItemInfo} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Card} from '../../components/ui/Card/Card';
import {GuessLogItem} from '../../components/game/GuessLogItem/GuessLogItem';
import {NumberContainer} from '../../components/game/NumberContainer/NumberContainer';
import {PrimaryButton} from '../../components/ui/PrimaryButton/PrimaryButton';
import {InstructionText} from '../../components/ui/InstructionText/InstructionText';
import {Title} from '../../components/ui/Title/Title';
import {useOrientation} from '../../customHooks/useOrientation';
import {generateRandomBetween} from './GameScreen.utils/generateRandomBetween';
import {
  nextGuessHandler,
  setInitialBoundaries,
} from './GameScreen.utils/nextGuessHandler';
import {Direction} from '../../constants/direction';
import {Orientation} from '../../constants/orientation';
import {styles} from './style';

interface GameScreenProps {
  userNumber: number;
  onGameOver: (rounds: number) => void;
}

export const GameScreen = ({userNumber, onGameOver}: GameScreenProps) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  const orientation = useOrientation();
  const style = styles(orientation);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    setInitialBoundaries();
  }, []);

  const guessRoundsListLength: number = guessRounds.length;

  const content = useMemo(() => {
    if (orientation === Orientation.PORTRAIT) {
      return (
        <>
          <View style={style.buttonsContainerWide}>
            <View style={style.buttonContainer}>
              <PrimaryButton
                onPress={nextGuessHandler.bind(
                  this,
                  Direction.LOWER,
                  currentGuess,
                  userNumber,
                  setCurrentGuess,
                  setGuessRounds,
                )}>
                <Ionicons name="md-remove" size={24} color="white" />
              </PrimaryButton>
            </View>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View style={style.buttonContainer}>
              <PrimaryButton
                onPress={nextGuessHandler.bind(
                  this,
                  Direction.HIGHER,
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
      <>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
          <InstructionText style={style.instructionText}>
            Higher or lower?
          </InstructionText>
          <View style={style.buttonsContainer}>
            <View style={style.buttonContainer}>
              <PrimaryButton
                onPress={nextGuessHandler.bind(
                  this,
                  Direction.LOWER,
                  currentGuess,
                  userNumber,
                  setCurrentGuess,
                  setGuessRounds,
                )}>
                <Ionicons name="md-remove" size={24} color="white" />
              </PrimaryButton>
            </View>
            <View style={style.buttonContainer}>
              <PrimaryButton
                onPress={nextGuessHandler.bind(
                  this,
                  Direction.HIGHER,
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
  }, [currentGuess, userNumber, orientation]);

  const renderItem = ({item, index}: ListRenderItemInfo<number>) => (
    <GuessLogItem roundNumber={guessRoundsListLength - index} guess={item} />
  );

  const keyExtractor = (item: number) => item.toString();

  return (
    <View style={style.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={style.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </View>
  );
};
