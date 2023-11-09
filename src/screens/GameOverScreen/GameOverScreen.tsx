import {useMemo} from 'react';
import {Image, View, Text, useWindowDimensions, ScrollView} from 'react-native';
import {Title} from '../../components/ui/Title/Title';
import {PrimaryButton} from '../../components/ui/PrimaryButton/PrimaryButton';
import {styles} from './style';
import {useOrientation} from '../../customHooks/useOrientation';
import {Orientation} from '../../constants/orientation';

interface GameOverScreenProps {
  roundsNumber: number;
  userNumber: number;
  onStartNewGame: () => void;
}

export const GameOverScreen = ({
  roundsNumber,
  userNumber,
  onStartNewGame,
}: GameOverScreenProps) => {
  const orientation = useOrientation();
  let imageSize: number;

  if (orientation === Orientation.PORTRAIT) {
    imageSize = 150;
  } else {
    imageSize = 80;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  const onStartGame = () => {
    onStartNewGame();
  };

  const imageContainerStyles = useMemo(
    () => [styles.imageContainer, imageStyle],
    [imageSize],
  );

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>GAME OVER!</Title>
        <View style={imageContainerStyles}>
          <Image
            style={styles.image}
            source={require('../../assets/images/success.png')}
          />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{' '}
          rounds to guess the number{' '}
          <Text style={styles.highlight}>{userNumber}</Text>.
        </Text>
        <PrimaryButton onPress={onStartGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  );
};
