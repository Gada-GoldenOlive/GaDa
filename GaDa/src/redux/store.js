import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import user from './modules/user';
import status from './modules/status';

const reducer = combineReducers({
  user,
  status,
  defaultSurvey,
  mainSurvey,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
