import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {Circle, Container} from './styles';

Icon.loadFont();

interface NavigationTileProps {
  icon: string;
  active?: boolean;
  handlePress(): void;
}

const NavigationTile: React.FC<NavigationTileProps> = ({
  icon,
  active = false,
  handlePress,
}) => {
  return (
    <Container onPress={handlePress}>
      <Icon name={icon} size={active ? 30 : 25} />
      {/* <Circle active={active} /> */}
    </Container>
  );
};

export default NavigationTile;
