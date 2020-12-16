import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

interface ActiveStateProps {
  activeState: {movie: boolean; search: boolean; favorite: boolean};
  //   offset: number;
}

export const Container = styled.SafeAreaView`
  height: 90px;
  width: 100%;
  background-color: #e50914;

  align-items: center;
  justify-content: space-evenly;
  position: relative;
  box-shadow: 0 -5px 5px rgba(0, 0, 0, 0.4);
`;

export const IconsContainer = styled.View`
  height: 90px;
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const Circle = styled(Animated.View)<ActiveStateProps>`
  position: absolute;
  margin-top: 2px;
  height: 5px;
  width: 5px;
  border-radius: 3px;
  background-color: #000;
  left: 49.5%;
  /* left: ${(props) => 49.5}%; */
  bottom: 50%;
`;
