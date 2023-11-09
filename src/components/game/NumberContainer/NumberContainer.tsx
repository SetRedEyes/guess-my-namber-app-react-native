import {Text, View} from 'react-native';
import {useOrientation} from '../../../customHooks/useOrientation';
import {styles} from './style';
interface NumberContainerProps {
  children: React.ReactNode;
}

export const NumberContainer = ({children}: NumberContainerProps) => {
  const orientation = useOrientation();
  const style = styles(orientation);

  return (
    <View style={style.container}>
      <Text style={style.numberText}>{children}</Text>
    </View>
  );
};
