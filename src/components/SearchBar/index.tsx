import React from 'react';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';
import Icons from 'react-native-vector-icons/Feather';

import {Container, Input, InputContainer, SearchButton} from './styles';

interface SearchBarProps {
  sendSearch(): void;
  inputChange(event: NativeSyntheticEvent<TextInputChangeEventData>): void;
  inputValue: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  sendSearch,
  inputChange,
  inputValue,
}) => {
  return (
    <Container
      style={{
        flex: 1,
        alignSelf: 'center',
      }}>
      <InputContainer>
        <Input
          placeholder={'Search'}
          placeholderTextColor={'rgba(37, 37, 37, 0.5)'}
          onChange={inputChange}
          value={inputValue}
        />
        <SearchButton onPress={sendSearch}>
          <Icons name="search" color="#fff" size={28} />
        </SearchButton>
      </InputContainer>
    </Container>
  );
};

export default SearchBar;
