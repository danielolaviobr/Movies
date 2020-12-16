import {START_LOADING, COMPLETE} from './actionTypes';

export const startLoading = () => ({
  type: START_LOADING,
});

export const completeLoading = () => ({
  type: COMPLETE,
});

export const updateCurrentPage = (page: string) => ({
  type: 'routeUpdate',
  page,
});
