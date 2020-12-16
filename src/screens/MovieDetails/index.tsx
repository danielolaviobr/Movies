import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
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

// interface Movie {
//   original_title: string;
// }

interface MovieDetailsProps {
  route: any;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({route}): JSX.Element => {
  const [movie, setMovie] = useState<any>({});
  const dispatch = useDispatch();
  const {id} = route.params.params;
  const isLoading = useSelector((state: AppState) => {
    return state.loading.isLoading;
  });
  const navigator = useNavigation();
  const {addToFavorites, getFavorites} = useFavorites();

  const loadMovieData = useCallback(async () => {
    const response = await api.get(`/movie/${id}?api_key=${apiKey}`);

    const movieData = response.data;
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

  return (
    <Container>
      <MovieInfo>
        <ExitButton onPress={goToPreviousPage}>
          <Icon name="x" size={30} color={'#fff'} />
        </ExitButton>
        <Poster source={{uri: imageURI()}} />
        <Title>{movie.original_title}</Title>
        <MovieDescription>{movie.overview}</MovieDescription>
        <Button
          onPress={async () => {
            await addToFavorites(movie.id);
            const favs = await getFavorites();
            console.log(favs);
          }}>
          <ButtonText>Save to Favorites</ButtonText>
        </Button>
      </MovieInfo>
    </Container>
  );
};

export default MovieDetails;
