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
}

const FavoritesContext = createContext<FavoritesContextData>(
  {} as FavoritesContextData,
);

export const FavoritesProvider: React.FC = ({children}) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = useCallback(
    async (id: string) => {
      setFavorites([...favorites, id]);
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

  return (
    <FavoritesContext.Provider value={{getFavorites, addToFavorites}}>
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
