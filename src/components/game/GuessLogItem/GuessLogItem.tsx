import {Text, View} from 'react-native';
import {styles} from './style';

interface GuessLogItemProps {
  roundNumber: number;
  guess: number;
}

export const GuessLogItem = ({roundNumber, guess}: GuessLogItemProps) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>#{roundNumber}</Text>
      <Text style={styles.itemText}>Opponent's Guess {guess}</Text>
    </View>
  );
};
