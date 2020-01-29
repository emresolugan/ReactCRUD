import React from 'react';
import './vehicle.css';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { connect } from 'react-redux';
import { assignevehicleList } from '../../../redux/actions/vehiclelist_action';
import { assignecopyvehicleList } from '../../../redux/actions/vehiclelist_action';
import { deleteItemVehicleList } from '../../../redux/actions/vehiclelist_action';
import { deleteItemcopyVehicleList } from '../../../redux/actions/vehiclelist_action';
import { addItemVehicleList } from '../../../redux/actions/vehiclelist_action';


class VehicleComponent extends React.Component {

   constructor()
   {
      super();
   }         
    
   componentWillMount()
   {
      let _data = {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         }
         }

         fetch('http://localhost:50305/api/Vehicle/GetVehicles/', _data)
         .then((_response) => _response.json())
         .then(_response => {
         _response = JSON.parse(_response);
         if (_response.length != 0 && _response[0].Result) 
         {
            if(_response[0].Result == "Empty") 
            {
               this.props.assignevehicleList([]);
               this.props.assignecopyvehicleList([]);
            }
         }
         else
         {
            this.props.assignevehicleList(_response);
            this.props.assignecopyvehicleList(_response);
         }
         })
         .catch((error) => console.error(error))
   } 

   routeFunc(path, id)
   {
      if(id > 0)
         this.props.history.push('/' + path + '/' + id);
      else
         this.props.history.push('/' + path + '/');
   }

   deleteListItem(id, index)
   {
      let _data = {
         method: 'DELETE',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         }
         }

         fetch('http://localhost:50305/api/Vehicle/DeleteVehicle/' + id, _data)
         .then((response) => response.json())
         .then(response => {
         response = JSON.parse(response);
         if(response[0].Result == "True")
         {
            let foundIndex = this.props.copyvehicleList.findIndex(x => x.VehicleId == id);
            this.props.deleteItemVehicleList(index);
            this.props.deleteItemcopyVehicleList(foundIndex);
         }
         })
         .catch((error) => console.error(error))
   }

   searchVehicle(event)
   {
     if(event.target.value == "")
     {
         this.props.assignevehicleList(this.props.copyvehicleList);
     }
     else
     {
      this.props.assignevehicleList([]);
 
       for(let i in this.props.copyvehicleList)
       {
         if(this.props.copyvehicleList[i].Nickname.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
         {
            this.props.addItemVehicleList(this.props.copyvehicleList[i]);
         }
       }
     }
   }

   render() {
      return (
         <div>
            <div className="tableDiv">
            <div className="input-group mb-3">
               <input type="text" className="form-control searchBarClass" onChange={(e) => this.searchVehicle(e)} placeholder="Search Bar" aria-label="SearchBar"/>
            </div>
            <table className="table table-striped table-bordered vehiclesTableClass">
               <thead>
                  <tr>
                     <th scope="col">Plate</th>
                     <th scope="col">NickName</th>
                     <th scope="col">Brand</th>
                     <th scope="col">Model</th>
                     <th scope="col">ModelYear</th>
                     <th scope="col">Type</th>
                     <th scope="col">Color</th>
                     <th scope="col">Status</th>
                     <th scope="col" colSpan="2" className="iconColClass"><i className="fa fa-plus-circle fa-2x addIconClass" onClick={() => this.routeFunc("addvehicle", 0)}></i></th>
                  </tr>
               </thead>
               <tbody>
               {
                  this.props.vehicleList.map((val, i) => (
                   <tr key={i}>
                   <td>{val.Plate}</td>
                   <td>{val.Nickname}</td>
                   <td>{val.BrandDesc}</td>
                   <td>{val.ModelDesc}</td>
                   <td>{val.ModelYear}</td>
                   <td>{val.TypeDesc}</td>
                   <td>{val.ColorDesc}</td>
                   <td>{val.StatusDesc}</td>
                   <td className="iconColClass"><i className="fa fa-edit fa-lg editIconClass" onClick={() => this.routeFunc("editvehicle", val.VehicleId)}></i></td>
                   <td className="iconColClass"><i className="fa fa-minus-circle fa-lg deleteIconClass" onClick={() => this.deleteListItem(val.VehicleId, i)}></i></td>
                </tr>
               ))}
               </tbody>
            </table>
            </div>
         </div>
      )
   }

}

const mapStateToProps = state => {
   return {
      vehicleList: state.vehicleList.vehicleList,
      copyvehicleList: state.copyvehicleList.copyvehicleList,
   }
 }
 
 const mapDispatchToProps = dispatch => {
   return {
     assignevehicleList: (vehicleList) => {
       dispatch(assignevehicleList(vehicleList))
     },
     assignecopyvehicleList: (index) => {
       dispatch(assignecopyvehicleList(index))
     },
     deleteItemVehicleList: (index) => {
      dispatch(deleteItemVehicleList(index))
     }, 
     deleteItemcopyVehicleList: (index) => {
      dispatch(deleteItemcopyVehicleList(index))
     }, 
     addItemVehicleList: (vehicleList) => {
       dispatch(addItemVehicleList(vehicleList))
     },
   }
 }

export default connect(mapStateToProps, mapDispatchToProps)(VehicleComponent)

