// import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {AppState} from '../../redux/reducers';
import currentPage from '../../redux/reducers/currentPage';
import {activeRoute, navigate} from '../../services/navigationRef';
import NavigationTile from '../NavigationTile';
import {Circle, Container, IconsContainer} from './styles';

interface ActiveStateProps {
  movie: boolean;
  search: boolean;
  favorite: boolean;
}

const BottomNavBar: React.FC = () => {
  const offset = useSharedValue(0);
  const [activeState, setActiveState] = useState<ActiveStateProps>({
    movie: true,
    search: false,
    favorite: false,
  });
  const currentPageName = useSelector((state: AppState) => {
    return state.currentPage.page;
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value}],
    };
  });

  const handlePressMovie = useCallback(() => {
    navigate('Explorer');
    offset.value = withSpring(0);
    setActiveState({
      movie: true,
      search: false,
      favorite: false,
    });
  }, []);

  const handlePressSearch = useCallback(() => {
    navigate('Search');
    offset.value = withSpring(-120);
    setActiveState({
      movie: false,
      search: true,
      favorite: false,
    });
  }, []);

  const handlePressFavorites = useCallback(() => {
    navigate('Favorites');
    offset.value = withSpring(121);
    setActiveState({
      movie: false,
      search: false,
      favorite: true,
    });
  }, []);

  useEffect(() => {
    switch (currentPageName) {
      case 'Explorer':
        offset.value = withSpring(0);
        setActiveState({
          movie: true,
          search: false,
          favorite: false,
        });
        break;
      case 'Search':
        offset.value = withSpring(-120);
        setActiveState({
          movie: false,
          search: true,
          favorite: false,
        });
        break;
      case 'Favorites':
        offset.value = withSpring(121);
        setActiveState({
          movie: false,
          search: false,
          favorite: true,
        });
        break;
    }
  }, [currentPageName]);

  return (
    <Container>
      <IconsContainer>
        <NavigationTile
          icon="search"
          handlePress={handlePressSearch}
          active={activeState.search}
        />
        <NavigationTile
          icon="film"
          handlePress={handlePressMovie}
          active={activeState.movie}
        />
        <NavigationTile
          icon="star"
          handlePress={handlePressFavorites}
          active={activeState.favorite}
        />
      </IconsContainer>
      <Circle activeState={activeState} style={[animatedStyles]} />
    </Container>
  );
};

export default BottomNavBar;
