import {combineReducers} from 'redux';
import loading from './loading';
import currentPage from './currentPage';

const rootReducer = combineReducers({loading, currentPage});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
