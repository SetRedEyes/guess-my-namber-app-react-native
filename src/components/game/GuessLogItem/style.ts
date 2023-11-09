import {StyleSheet} from 'react-native';
import COLORS from '../../../constants/colors';

export const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    marginVertical: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.accent500,
    borderColor: COLORS.primary800,
    borderWidth: 1,
    borderRadius: 40,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  itemText: {
    fontFamily: 'open-sans',
  },
});
