import {useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import {StatusBar} from 'expo-status-bar';

import Colors from './src/constants/colors';
import {StartGameScreen} from './src/screens/StartGameScreen';
import GameScreen from './src/screens/GameScreen';
import {GameOverScreen} from './src/screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState(0);
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./src/assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./src/assets/fonts/OpenSans-Bold.ttf'),
  });

  const pickedNumberHandler = pickedNumber => {
    setUserNumber(pickedNumber);
    console.log(pickedNumber, typeof pickedNumber);
    setGameIsOver(false);
  };

  const gameOverHandler = numberOfRounds => {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  };

  const startNewGameHandler = () => {
    setUserNumber(0);
    setGuessRounds(0);
  };

  const roundsCounterHandler = () => {
    setGuessRounds(prevState => prevState + 1);
  };
  return (
    <>
      {fontsLoaded ? (
        <>
          <StatusBar style="light" />
          <LinearGradient
            colors={[Colors.primary700, Colors.accent500]}
            style={styles.rootScreen}>
            <ImageBackground
              source={require('./src/assets/images/background.png')}
              resizeMode="cover"
              style={styles.rootScreen}
              imageStyle={styles.backgroundImage}>
              <SafeAreaView style={styles.rootScreen}>
                {gameIsOver && userNumber ? (
                  <GameOverScreen
                    userNumber={userNumber}
                    onStartNewGame={startNewGameHandler}
                    roundsNumber={guessRounds}
                  />
                ) : userNumber ? (
                  <GameScreen
                    userNumber={userNumber}
                    onGameOver={gameOverHandler}
                    onRoundsCounter={roundsCounterHandler}
                  />
                ) : (
                  <StartGameScreen onPickNumber={pickedNumberHandler} />
                )}
              </SafeAreaView>
            </ImageBackground>
          </LinearGradient>
        </>
      ) : (
        <AppLoading />
      )}
    </>
  );
}
const d = Dimensions.get('window');
const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
    width: d.width,
    height: d.height,
  },
});
