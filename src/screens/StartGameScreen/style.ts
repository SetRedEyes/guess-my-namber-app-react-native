import {StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';
import {Orientation} from '../../constants/orientation';

export const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    alignItems: 'center',
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: COLORS.accent500,
    borderBottomWidth: 2,
    color: COLORS.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {flex: 1},
});

const landscape = StyleSheet.create({
  ...commonStyles,
  rootContainer: {
    ...commonStyles.rootContainer,
    marginTop: 80,
  },
});

const portrait = StyleSheet.create({
  ...commonStyles,
  rootContainer: {...commonStyles.rootContainer, marginTop: 120},
});

export const styles = (orientation: Orientation) =>
  orientation === Orientation.LANDSCAPE ? landscape : portrait;
