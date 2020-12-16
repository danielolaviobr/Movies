import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {startLoading} from '../../redux/actions';

import {Container, InfoContainer, MovieTitle, Overview, Poster} from './styles';

interface MovieProps {
  title: string;
  imagePath?: string;
  overview?: string;
  id: string;
}

const Movie: React.FC<MovieProps> = ({title, imagePath, overview, id}) => {
  const dispatch = useDispatch();
  const navigator = useNavigation();
  const imageURI = useCallback(() => {
    if (imagePath) {
      return `https://image.tmdb.org/t/p/w500${imagePath}`;
    }
    return 'https://critics.io/img/movies/poster-placeholder.png';
  }, [imagePath]);

  return (
    <Container
      onPress={() => {
        dispatch(startLoading());
        navigator.navigate('MovieDetails', {params: {id}});
      }}>
      <Poster
        source={{
          uri: imageURI(),
        }}
      />
      <InfoContainer>
        <MovieTitle>{title}</MovieTitle>
        <Overview numberOfLines={6}>{overview}</Overview>
      </InfoContainer>
    </Container>
  );
};

export default Movie;
