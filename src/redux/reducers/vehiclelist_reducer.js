
import { ASSIGNE_VEHICLE_LIST } from '../actions/types';
import { DELETE_ITEM_FROM_VEHICLELIST } from '../actions/types';
import { ADD_ITEM_TO_VEHICLELIST } from '../actions/types';

const initialState = {
    vehicleList: [],
};

const vehiclelist_reducer = (state = initialState, action) => {
    switch(action.type) {
      case ASSIGNE_VEHICLE_LIST:
          debugger;
          if(action.payload.length == 0)
          {
            return {
                ...state,
                vehicleList: []
              };
          }
          else
          {
            return {
                ...state,
                vehicleList: action.payload
              };
          }
      case DELETE_ITEM_FROM_VEHICLELIST:
       return {
          ...state,
          vehicleList: [...state.vehicleList.slice(0, action.payload), ...state.vehicleList.slice(action.payload + 1)]
        };
      case ADD_ITEM_TO_VEHICLELIST:
        return {
          ...state,
          vehicleList:[...state.vehicleList, action.payload]
        };
      default:
        return state;
    }
  }
  
  export default vehiclelist_reducer;