import {useState} from 'react';
import {TextInput, Alert} from 'react-native';
import {Card} from '../../components/ui/Card/Card';
import {View, KeyboardAvoidingView, ScrollView} from 'react-native';
import {Title} from '../../components/ui/Title/Title';
import {InstructionText} from '../../components/ui/InstructionText/InstructionText';
import {PrimaryButton} from '../../components/ui/PrimaryButton/PrimaryButton';
import {styles} from './style';
import {useOrientation} from '../../customHooks/useOrientation';
interface StartGameScreenProps {
  onPickNumber: (number: number) => void;
}

export const StartGameScreen = ({onPickNumber}: StartGameScreenProps) => {
  const [enteredNumber, setEnteredNumber] = useState<string>('');

  const deviceOrientation = useOrientation();
  const style = styles(deviceOrientation);

  const numberInputHandler = (enteredText: string) => {
    setEnteredNumber(enteredText);
  };

  const resetInputHandler = () => {
    setEnteredNumber('');
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99.',
        [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}],
      );

      return;
    }

    onPickNumber(chosenNumber);
  };

  return (
    <ScrollView style={style.screen}>
      <KeyboardAvoidingView style={style.screen}>
        <View style={style.rootContainer}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              style={style.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              value={enteredNumber}
              onChangeText={numberInputHandler}
            />
            <View style={style.buttonsContainer}>
              <View style={style.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={style.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
