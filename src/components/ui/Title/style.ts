import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    borderWidth: Platform.select({ios: 2, android: 3}),
    borderColor: 'white',
    padding: 12,
    maxWidth: '80%',
    width: 300,
  },
});
