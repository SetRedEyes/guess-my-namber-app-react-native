import {StyleSheet} from 'react-native';
import {Orientation} from '../../../constants/orientation';
import COLORS from '../../../constants/colors';

const commonStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.accent500,
    borderWidth: 4,
    borderRadius: 8,
  },
  numberText: {
    color: COLORS.accent500,
    fontFamily: 'open-sans-bold',
  },
});

const landscape = StyleSheet.create({
  ...commonStyles,
  container: {...commonStyles.container, padding: 12, margin: 12},
  numberText: {...commonStyles.numberText, fontSize: 28},
});

const portrait = StyleSheet.create({
  ...commonStyles,
  container: {...commonStyles.container, padding: 24, margin: 24},
  numberText: {...commonStyles.numberText, fontSize: 36},
});

export const styles = (orientation: Orientation) =>
  orientation === Orientation.LANDSCAPE ? landscape : portrait;
