import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
`;

export const Header = styled.Text`
  align-self: center;
  font-weight: bold;
  font-size: 28px;
  color: #fff;

  margin-bottom: 8px;
`;

export const Footer = styled.View`
  height: 60px;
  width: 100%;
`;
