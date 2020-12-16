import {Pressable} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(Pressable)`
  align-self: center;
  width: 95%;
  background-color: #324248;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;
  padding: 0 8px;
  opacity: 0.8;
`;

export const MovieTitle = styled.Text`
  margin-top: 8px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;

export const Poster = styled.Image`
  border-radius: 5px;
  height: 180px;
  width: 125px;
  margin: 8px;
`;

export const Overview = styled.Text`
  margin-top: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  text-align: justify;
`;

export const InfoContainer = styled.View`
  align-items: center;
  justify-content: flex-start;
  width: 220px;
  height: 150px;
  height: 100%;
  margin: 0 8px;
  margin-top: 12px;
  margin-bottom: 4px;
  /* background-color: red; */
`;
