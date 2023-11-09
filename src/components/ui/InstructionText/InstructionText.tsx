import {StyleProp, Text, ViewStyle} from 'react-native';
import {styles} from './style';

interface InstructionTextProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const InstructionText = ({children, style}: InstructionTextProps) => {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
};
