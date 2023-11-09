import {StyleSheet} from 'react-native';
import {Orientation} from '../../constants/orientation';

const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  instructionText: {marginBottom: 12},
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {flex: 1},
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

const landscape = StyleSheet.create({
  ...commonStyles,
  screen: {...commonStyles.screen, marginTop: 30},
});

const portrait = StyleSheet.create({
  ...commonStyles,
  screen: {...commonStyles.screen, marginTop: 120},
});

export const styles = (orientation: Orientation) =>
  orientation === Orientation.LANDSCAPE ? landscape : portrait;
