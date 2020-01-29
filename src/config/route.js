import React from 'react';
import { Switch, Route } from 'react-router-dom';
import VehicleComponent from '../components/pages/VehicleComponent/vehicle';
import AddEditVehicleComponent from '../components/pages/AddEditVehicleComponent/addeditvehicle';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={VehicleComponent} />
      <Route path="/addvehicle" component={AddEditVehicleComponent} />
      <Route path="/editvehicle/:id" component={AddEditVehicleComponent} />
    </Switch>
  );
}