//asically the imports within the curly brackets are named imports,
//and must match a named export from the library you're importing from.
//That can be any object / function / constant that is exported
import { combineReducers } from 'redux';
//Using import without curly brackets imports the
//default variable / object / function from the library.
import authReducer from './authReducer';

//for combineReducers
export default combineReducers({
  auth: authReducer
});
