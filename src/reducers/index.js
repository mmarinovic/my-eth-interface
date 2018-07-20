import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import web3Reducer from './web3Reducer';
import accountsReducer from './accountsReducer';

const rootReducer = combineReducers({
  form: formReducer,
  web3: web3Reducer,
  accounts: accountsReducer
});

export default rootReducer;