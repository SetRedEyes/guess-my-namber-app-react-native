import {useState, useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import {Orientation} from '../constants/orientation';

export const useOrientation = () => {
  const {height, width} = useWindowDimensions();
  const [orientation, setOrientation] = useState<Orientation>(
    Orientation.PORTRAIT,
  );
  useEffect(() => {
    setOrientation(
      height > width ? Orientation.PORTRAIT : Orientation.LANDSCAPE,
    );
  }, [height, width]);
  return orientation;
};
