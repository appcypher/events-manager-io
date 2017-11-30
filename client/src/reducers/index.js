import { combineReducers } from 'redux';
import user from './userReducer';
import center from './centerReducer';
import event from './eventReducer';

export default combineReducers({
  user,
  center,
  event,
});
