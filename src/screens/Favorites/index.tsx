import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuid} from 'uuid';

import Movie from '../../components/Movie';
import {useFavorites} from '../../hooks/favorites';
import {
  completeLoading,
  startLoading,
  updateCurrentPage,
} from '../../redux/actions';
import {AppState} from '../../redux/reducers';
import api from '../../services/api';
import apiKey from '../../services/key';
import {Container, Footer, Header} from './styles';

const Favorites: React.FC = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [visibleMovies, setVisibleMovies] = useState([]);
  const currentPageName = useSelector((state: AppState) => {
    return state.currentPage.page;
  });
  const isLoading = useSelector((state: AppState) => {
    return state.loading.isLoading;
  });
  const {getFavorites} = useFavorites();

  const loadMovies = useCallback(async () => {
    const movies = await getFavorites();
    console.log(movies);
    const moviesDataPromise = movies.map(async (movie) => {
      const response = api.get(`/movie/${movie}?api_key=${apiKey}`);
      const movieData = await response;
      return movieData.data;
    });
    let moviesData: React.SetStateAction<any[]>;
    await Promise.all(moviesDataPromise).then((movies) => {
      console.log(movies.map((mv) => mv.original_title));
      moviesData = movies;
    });
    setVisibleMovies(moviesData);
    dispatch(completeLoading());
  }, []);

  useEffect(() => {
    dispatch(startLoading());
    loadMovies();
  }, [getFavorites]);

  useEffect(() => {
    loadMovies();
  }, []);

  useEffect(() => {
    if (isFocused) {
      dispatch(updateCurrentPage('Favorites'));
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

  const listHeader = () => <Header>Favorites</Header>;

  if (isLoading) {
    return <ActivityIndicator style={{flex: 1}} />;
  }

  return (
    <Container>
      <FlatList
        style={{
          width: '100%',
        }}
        data={visibleMovies}
        renderItem={movieComponent}
        keyExtractor={() => uuid()}
        ListHeaderComponent={listHeader}
        onEndReachedThreshold={0.1}
        removeClippedSubviews={true}
        maxToRenderPerBatch={20}
        windowSize={10}
      />
    </Container>
  );
};

export default Favorites;
