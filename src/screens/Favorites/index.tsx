import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuid} from 'uuid';

import Movie from '../../components/Movie';
import {useFavorites} from '../../hooks/favorites';
import {startLoading, updateCurrentPage} from '../../redux/actions';
import {AppState} from '../../redux/reducers';
import api from '../../services/api';
import apiKey from '../../services/key';
import {Container, Footer, Header} from './styles';

const Favorites: React.FC = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [visibleMovies, setVisibleMovies] = useState();
  const currentPageName = useSelector((state: AppState) => {
    return state.currentPage.page;
  });
  const isLoading = useSelector((state: AppState) => {
    return state.loading.isLoading;
  });
  const {getFavorites} = useFavorites();

  const loadMovies = useCallback(async () => {
    const movies = await getFavorites();
    const moviesData = movies.map(async (movie) => {
      const response = await api.get(`/movie/${movie}?api_key=${apiKey}`);
      const movieData = response.data;
      return movieData;
    });
    setVisibleMovies(moviesData);
  }, []);

  useEffect(() => {
    dispatch(startLoading());
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

  return (
    <Container>
      <FlatList
        style={{
          width: '100%',
        }}
        data={visibleMovies}
        renderItem={movieComponent}
        keyExtractor={(item) => `${item.id.toString()}${uuid()}`}
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
