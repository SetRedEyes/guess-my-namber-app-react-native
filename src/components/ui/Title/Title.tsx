import {Text} from 'react-native';
import {styles} from './style';

interface TitleProps {
  children: React.ReactNode;
}

export const Title = ({children}: TitleProps) => {
  return <Text style={styles.title}>{children}</Text>;
};
