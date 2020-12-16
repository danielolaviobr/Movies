import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  TextInputChangeEventData,
  NativeSyntheticEvent,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {v4 as uuid} from 'uuid';
import {useDispatch, useSelector} from 'react-redux';

import Movie from '../../components/Movie';
import SearchBar from '../../components/SearchBar';
import {
  completeLoading,
  startLoading,
  updateCurrentPage,
} from '../../redux/actions';
import {AppState} from '../../redux/reducers';
import api from '../../services/api';
import apiKey from '../../services/key';
import {Container, Footer} from './styles';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [inputValue, setInputValue] = useState('');
  const currentPageName = useSelector((state: AppState) => {
    return state.currentPage.page;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleMovies, setVisibleMovies] = useState([]);
  const allMovies = [];

  const isLoading = useSelector((state: AppState) => {
    return state.loading.isLoading;
  });

  const handleSearch = useCallback(
    async (page = 1) => {
      const response = await api.get(
        `/search/movie?api_key=${apiKey}&query=${inputValue}&page=${page}`,
      );

      const movies = response.data.results;
      movies.forEach((movie: any) => allMovies.push(movie));

      setVisibleMovies(allMovies);
      setCurrentPage(page);

      dispatch(completeLoading());
    },
    [inputValue],
  );
  const handleInputChange = useCallback(
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const newInputValue = event.nativeEvent.text;
      setInputValue(newInputValue);
    },
    [inputValue],
  );

  const loadMoreMovies = useCallback(async () => {
    await handleSearch(currentPage + 1);
  }, [currentPage]);

  useEffect(() => {
    if (isFocused) {
      dispatch(updateCurrentPage('Search'));
    }
  }, [currentPageName]);

  const movieComponent = ({item}) => (
    <Movie
      title={item.title}
      imagePath={item.poster_path}
      overview={item.overview}
      id={item.id}
      key={item.id}
    />
  );

  const loadingIndicatorFooter = () => {
    if (isLoading) return null;
    return (
      <Footer>
        <ActivityIndicator />
      </Footer>
    );
  };

  return (
    <Container>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          width: '100%',
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={{
            width: '100%',
          }}>
          <SearchBar
            sendSearch={handleSearch}
            inputChange={handleInputChange}
            inputValue={inputValue}
          />
        </ScrollView>
        <FlatList
          style={{
            width: '100%',
          }}
          data={visibleMovies}
          renderItem={movieComponent}
          keyExtractor={(item) => `${item.id.toString()}${uuid()}`}
          onEndReached={loadMoreMovies}
          ListFooterComponent={loadingIndicatorFooter}
          onEndReachedThreshold={0.1}
          removeClippedSubviews={true}
          maxToRenderPerBatch={20}
          windowSize={10}
        />
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Search;
