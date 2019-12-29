import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { authReducer } from './authReducer';
import { songReducer } from './songReducer';
import { downloadReducer } from './downloadReducer';
import { songRuntimeInfoReducer } from './songRuntimeInfoReducer';

// the root reducer will become the state at the whole app.
// { state.firebase/state.authError } for example, are ways to reach the content the state holds.

const rootReducer = combineReducers({
    authError: authReducer,
    firebase: firebaseReducer,
    song: songReducer,
    songRuntimeInfo: songRuntimeInfoReducer,
    download: downloadReducer
});

export default rootReducer;
