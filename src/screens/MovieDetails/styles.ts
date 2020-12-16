import {Pressable} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
`;

export const MovieInfo = styled.SafeAreaView`
  position: relative;
  align-self: center;
  flex-grow: 1;
  min-height: 95%;
  align-items: center;
  justify-content: center;
  background-color: #324248;
  margin: 36px 16px 60px 16px;
  padding: 8px;
  border-radius: 10px;
`;

export const Poster = styled.Image`
  border-radius: 5px;
  height: 360px;
  width: 250px;
  margin: 8px;
`;

export const Title = styled.Text`
  padding-top: 8px;
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;

export const MovieDescription = styled.Text`
  margin: 8px;
  padding-top: 16px;
  font-size: 14px;
  line-height: 18px;
  font-weight: bold;
  color: #fff;
  text-align: justify;
`;

export const Button = styled(Pressable)`
  position: absolute;
  bottom: 0;
  width: 95%;
  height: 60px;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: red;
  margin-bottom: 16px;
  border-radius: 10px;
`;

export const ButtonText = styled.Text`
  padding-top: 16px;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  align-self: center;
  height: 100%;
  margin-bottom: 13px;
`;

export const ExitButton = styled(Pressable)`
  height: 40px;
  width: 40px;
  position: absolute;
  left: 20px;
  top: 30px;
`;
