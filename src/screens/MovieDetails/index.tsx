import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  MovieInfo,
  Poster,
  Title,
  MovieDescription,
  Button,
  ExitButton,
  ButtonText,
} from './styles';
import {completeLoading, startLoading} from '../../redux/actions';
import {AppState} from '../../redux/reducers';
import api from '../../services/api';
import apiKey from '../../services/key';
import {Container} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useFavorites} from '../../hooks/favorites';

interface MovieDetailsProps {
  route: any;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({route}): JSX.Element => {
  const [movie, setMovie] = useState<any>({});
  const [favorited, setFavorited] = useState(false);
  const dispatch = useDispatch();
  const {id} = route.params.params;
  const isLoading = useSelector((state: AppState) => {
    return state.loading.isLoading;
  });
  const navigator = useNavigation();
  const {
    addToFavorites,
    isFavorited,
    removeFromFavorites,
    getFavorites,
  } = useFavorites();

  const loadMovieData = useCallback(async () => {
    await getFavorites();
    const response = await api.get(`/movie/${id}?api_key=${apiKey}`);

    const movieData = response.data;

    const isMovieFavorited = await isFavorited(movieData.id);
    setFavorited(isMovieFavorited);
    setMovie(movieData);
    dispatch(completeLoading());
  }, []);

  const imageURI = useCallback(() => {
    if (movie.poster_path) {
      return `https://image.tmdb.org/t/p/original${movie.poster_path}`;
    }
    return 'https://critics.io/img/movies/poster-placeholder.png';
  }, [movie.poster_path]);

  useEffect(() => {
    dispatch(startLoading());
    loadMovieData();
  }, []);

  const goToPreviousPage = useCallback(() => {
    navigator.goBack();
  }, []);

  if (isLoading) {
    return <ActivityIndicator style={{flex: 1}} />;
  }

  const handleFavoriteButtonPress = async () => {
    if (favorited) {
      await removeFromFavorites(movie.id);
      setFavorited(false);
    } else {
      await addToFavorites(movie.id);
      setFavorited(true);
    }
  };

  return (
    <Container>
      <MovieInfo>
        <ExitButton onPress={goToPreviousPage}>
          <Icon name="x" size={30} color={'#fff'} />
        </ExitButton>
        <Poster source={{uri: imageURI()}} />
        <Title>{movie.original_title}</Title>
        <MovieDescription>{movie.overview}</MovieDescription>
        <Button onPress={handleFavoriteButtonPress}>
          <ButtonText>
            {favorited ? 'Remove from Favorites' : 'Save to Favorites'}
          </ButtonText>
        </Button>
      </MovieInfo>
    </Container>
  );
};

export default MovieDetails;
