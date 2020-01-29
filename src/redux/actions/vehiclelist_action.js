export const ASSIGNE_VEHICLE_LIST = 'ASSIGNE_VEHICLE_LIST';
export const ASSIGNE_COPYVEHICLE_LIST = 'ASSIGNE_COPYVEHICLE_LIST';
export const DELETE_ITEM_FROM_VEHICLELIST = 'DELETE_ITEM_FROM_VEHICLELIST';
export const DELETE_ITEM_FROM_COPYVEHICLELIST = 'DELETE_ITEM_FROM_COPYVEHICLELIST';
export const ADD_ITEM_TO_VEHICLELIST = 'ADD_ITEM_TO_VEHICLELIST';
export const ADD_ITEM_TO_COPYVEHICLELIST = 'ADD_ITEM_TO_COPYVEHICLELIST';

export const assignevehicleList = vehicleList => {
  return {
    type: ASSIGNE_VEHICLE_LIST,
    payload: vehicleList
  }
}

export const assignecopyvehicleList = copyvehicleList => {
    return {
      type: ASSIGNE_COPYVEHICLE_LIST,
      payload: copyvehicleList
    }
  }

export const deleteItemVehicleList = index => {
  return {
    type: DELETE_ITEM_FROM_VEHICLELIST,
    payload: index
  }
}

export const deleteItemcopyVehicleList = index => {
    return {
      type: DELETE_ITEM_FROM_COPYVEHICLELIST,
      payload: index
    }
  }

export const addItemVehicleList = vehicleList => {
return {
    type: ADD_ITEM_TO_VEHICLELIST,
    payload: vehicleList
}
}

export const addItemCopyVehicleList = copyvehicleList => {
    return {
    type: ADD_ITEM_TO_COPYVEHICLELIST,
    payload: copyvehicleList
    }
}