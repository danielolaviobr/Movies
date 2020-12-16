import {Pressable} from 'react-native';
import styled, {css} from 'styled-components/native';

interface ActiveProps {
  active: boolean;
}

export const Container = styled(Pressable)`
  height: 70px;
  width: 70px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: #000;
  font-weight: bold;
`;

export const Circle = styled.View<ActiveProps>`
  margin-top: 5px;
  height: 0;
  width: 0;
  border-radius: 3px;
  background-color: #000;

  ${(props) =>
    props.active &&
    css`
      height: 5px;
      width: 5px;
    `};
`;
