import {View} from 'react-native';
import {useOrientation} from '../../../customHooks/useOrientation';
import {styles} from './style';
interface ICardProps {
  children: React.ReactNode;
}

export const Card = ({children}: ICardProps) => {
  const deviceOrientation = useOrientation();
  const style = styles(deviceOrientation);

  return <View style={style.card}>{children}</View>;
};
