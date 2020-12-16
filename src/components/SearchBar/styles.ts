import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 50px;
  padding: 8px;
  margin: 16px 8px;
  margin-top: 8px;
  padding: 0 8px;
`;

export const SearchButton = styled(RectButton)`
  width: 45px;
  height: 45px;
  background-color: #e50914;
  border-radius: 25px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.4);
  align-items: center;
  justify-content: center;
`;

export const InputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 50px;
  border-radius: 10px;
  padding: 8px;
`;

export const Input = styled.TextInput`
  flex: 1;
  height: 40px;
  margin-right: 8px;
  background-color: rgba(200, 200, 200, 0.5);
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  padding: 0 8px;
  color: #fff;
  font-weight: bold;
`;
