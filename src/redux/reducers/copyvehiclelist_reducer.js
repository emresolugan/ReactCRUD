
import { ASSIGNE_COPYVEHICLE_LIST } from '../actions/types';
import { DELETE_ITEM_FROM_COPYVEHICLELIST } from '../actions/types';
import { ADD_ITEM_TO_COPYVEHICLELIST } from '../actions/types';

const initialState = {
    copyvehicleList: [],
};

const copyvehiclelist_reducer = (state = initialState, action) => {
    switch(action.type) {
      case ASSIGNE_COPYVEHICLE_LIST:
        return {
          ...state,
          copyvehicleList: action.payload
        };
      case DELETE_ITEM_FROM_COPYVEHICLELIST:
       return {
          ...state,
          copyvehicleList: [...state.copyvehicleList.slice(0, action.payload), ...state.copyvehicleList.slice(action.payload + 1)]
        };
      case ADD_ITEM_TO_COPYVEHICLELIST:
        return {
          ...state,
          copyvehicleList:[...state.copyvehicleList, action.payload]
        };
      default:
        return state;
    }
  }
  
  export default copyvehiclelist_reducer;