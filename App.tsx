import {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  useWindowDimensions,
  View,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useFonts} from 'expo-font';
import {StatusBar} from 'expo-status-bar';

import COLORS from './src/constants/colors';
import {StartGameScreen} from './src/screens/StartGameScreen/StartGameScreen';
import {GameOverScreen} from './src/screens/GameOverScreen/GameOverScreen';
import {GameScreen} from './src/screens/GameScreen/GameScreen';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState<number>(0);
  const [gameIsOver, setGameIsOver] = useState<boolean>(true);
  const [guessRounds, setGuessRounds] = useState<number>(0);
  const [appIsReady, setAppIsReady] = useState(false);

  // const [fontsLoaded] = useFonts({
  //   'open-sans': require('./src/assets/fonts/OpenSans-Regular.ttf'),
  //   'open-sans-bold': require('./src/assets/fonts/OpenSans-Bold.ttf'),
  // });

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

  useEffect(() => {
    async function prepare() {
      await Font.loadAsync({
        'open-sans': require('./src/assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./src/assets/fonts/OpenSans-Bold.ttf'),
      });
      setAppIsReady(true);
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={style.rootScreen} onLayout={onLayoutRootView}>
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
    </View>
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
