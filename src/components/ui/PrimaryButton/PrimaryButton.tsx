import {Text, View, Pressable} from 'react-native';
import {useMemo} from 'react';
import COLORS from '../../../constants/colors';
import {styles} from './style';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

export const PrimaryButton = ({children, onPress}: PrimaryButtonProps) => {
  const pressHandler = () => {
    onPress();
  };

  const buttonPressedStyle = useMemo(
    () => [styles.buttonInnerContainer, styles.pressed],
    [styles.buttonInnerContainer, styles.pressed],
  );

  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={pressHandler}
        style={({pressed}) =>
          pressed ? buttonPressedStyle : styles.buttonInnerContainer
        }
        android_ripple={{color: COLORS.primary600}}>
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};
