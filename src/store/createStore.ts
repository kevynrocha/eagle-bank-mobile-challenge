import { createStore } from 'redux';
import reducers from './modules/rootReducer';

export default createStore(reducers);
