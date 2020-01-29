import { createStore, combineReducers } from 'redux';
import vehiclelist_reducer from './reducers/vehiclelist_reducer';
import copyvehiclelist_reducer from './reducers/copyvehiclelist_reducer';

const rootReducer = combineReducers({
  vehicleList: vehiclelist_reducer,
  copyvehicleList: copyvehiclelist_reducer
});

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;