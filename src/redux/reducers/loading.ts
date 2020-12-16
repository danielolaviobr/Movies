import {COMPLETE, START_LOADING} from '../actionTypes';

const initialState = {
  isLoading: false,
};

interface ActionProps {
  type: string;
}

export default function (state = initialState, action: ActionProps) {
  switch (action.type) {
    case START_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case COMPLETE: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}
