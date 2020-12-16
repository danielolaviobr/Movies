import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import 'react-native-get-random-values';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuid} from 'uuid';

import Movie from '../../components/Movie';
import {
  completeLoading,
  startLoading,
  updateCurrentPage,
} from '../../redux/actions';
import {AppState} from '../../redux/reducers';

import api from '../../services/api';
import apiKey from '../../services/key';
import {Container, Footer, Header} from './styles';

const Explorer: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleMovies, setVisibleMovies] = useState([]);

  const isLoading = useSelector((state: AppState) => {
    return state.loading.isLoading;
  });

  const allMovies = [];

  const apiCall = useCallback(
    async (page = 1) => {
      const response = await api.get(
        `/movie/popular?api_key=${apiKey}&language=en-US&page=${page.toString()}`,
      );

      const movies = response.data.results;
      movies.forEach((movie: any) => allMovies.push(movie));

      setVisibleMovies(allMovies);
      setCurrentPage(page);

      dispatch(completeLoading());
    },
    [dispatch],
  );
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(startLoading());
    apiCall();
  }, []);

  useEffect(() => {
    if (isFocused) {
      dispatch(updateCurrentPage('Explorer'));
    }
  }, [isFocused]);

  const loadMoreMovies = useCallback(async () => {
    await apiCall(currentPage + 1);
  }, [currentPage]);

  if (isLoading) {
    return <ActivityIndicator style={{flex: 1}} />;
  }

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

  const listHeader = () => <Header>Explore</Header>;

  return (
    <Container>
      <FlatList
        style={{
          width: '100%',
        }}
        data={visibleMovies}
        renderItem={movieComponent}
        keyExtractor={(item) => `${item.id.toString()}${uuid()}`}
        onEndReached={loadMoreMovies}
        ListFooterComponent={loadingIndicatorFooter}
        ListHeaderComponent={listHeader}
        onEndReachedThreshold={0.1}
        removeClippedSubviews={true}
        maxToRenderPerBatch={20}
        windowSize={10}
      />
    </Container>
  );
};

export default Explorer;
