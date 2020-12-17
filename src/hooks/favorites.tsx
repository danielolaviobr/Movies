import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface FavoritesContextData {
  getFavorites(): Promise<string[]>;
  addToFavorites(id: string): Promise<void>;
  removeFromFavorites(id: string): Promise<void>;
  isFavorited(id: string): Promise<boolean>;
}

const FavoritesContext = createContext<FavoritesContextData>(
  {} as FavoritesContextData,
);

export const FavoritesProvider: React.FC = ({children}) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = useCallback(
    async (id: string) => {
      const newFavoritesSet = new Set([...favorites, id]);
      setFavorites([...newFavoritesSet]);
      await AsyncStorage.setItem(
        '@Movies:favorites',
        JSON.stringify(favorites),
      );
    },
    [favorites],
  );

  const getFavorites = useCallback(async () => {
    const favoriteMoviesIdsString = await AsyncStorage.getItem(
      '@Movies:favorites',
    );
    return JSON.parse(favoriteMoviesIdsString);
  }, []);

  const removeFromFavorites = useCallback(
    async (id: string) => {
      const filteredMovies = favorites.filter((movieID) => movieID !== id);
      setFavorites([...filteredMovies]);
      await AsyncStorage.setItem(
        '@Movies:favorites',
        JSON.stringify(favorites),
      );
    },
    [favorites],
  );

  const isFavorited = useCallback(async (id: string) => {
    const favoriteMoviesIdsString = await AsyncStorage.getItem(
      '@Movies:favorites',
    );
    setFavorites(JSON.parse(favoriteMoviesIdsString));
    return JSON.parse(favoriteMoviesIdsString).includes(id);
  }, []);

  return (
    <FavoritesContext.Provider
      value={{getFavorites, addToFavorites, removeFromFavorites, isFavorited}}>
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites(): FavoritesContextData {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within an FavoritesProvider');
  }

  return context;
}
