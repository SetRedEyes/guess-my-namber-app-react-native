import {StyleSheet} from 'react-native';
import COLORS from '../../../constants/colors';
import {Orientation} from '../../../constants/orientation';

const commonStyles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: COLORS.primary800,
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});

const landscape = StyleSheet.create({
  card: {...commonStyles.card, marginTop: 16},
});

const portrait = StyleSheet.create({
  card: {...commonStyles.card, marginTop: 36},
});

export const styles = (orientation: Orientation) =>
  orientation === Orientation.LANDSCAPE ? landscape : portrait;
