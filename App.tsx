import {useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import {StatusBar} from 'expo-status-bar';

import COLORS from './src/constants/colors';
import {StartGameScreen} from './src/screens/StartGameScreen/StartGameScreen';
import {GameOverScreen} from './src/screens/GameOverScreen/GameOverScreen';
import {GameScreen} from './src/screens/GameScreen/GameScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState<number>(0);
  const [gameIsOver, setGameIsOver] = useState<boolean>(true);
  const [guessRounds, setGuessRounds] = useState<number>(0);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./src/assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./src/assets/fonts/OpenSans-Bold.ttf'),
  });

  const {width, height} = useWindowDimensions();
  const style = styles(width, height);

  const pickedNumberHandler = (pickedNumber: number) => {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  };

  const gameOverHandler = (numberOfRounds: number) => {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  };

  const startNewGameHandler = () => {
    setUserNumber(0);
    setGuessRounds(0);
  };

  return (
    <>
      {fontsLoaded ? (
        <>
          <StatusBar style="light" />
          <LinearGradient
            colors={[COLORS.primary700, COLORS.accent500]}
            style={style.rootScreen}>
            <ImageBackground
              source={require('./src/assets/images/background.png')}
              resizeMode="cover"
              style={style.rootScreen}
              imageStyle={style.backgroundImage}>
              <SafeAreaView style={style.rootScreen}>
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

export const styles = (width: number, height: number) => {
  return StyleSheet.create({
    rootScreen: {
      flex: 1,
    },
    backgroundImage: {
      opacity: 0.15,
      width: width,
      height: height,
    },
  });
};
