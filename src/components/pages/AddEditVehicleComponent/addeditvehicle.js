import React from 'react';
import './addeditvehicle.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteItemVehicleList } from '../../../redux/actions/vehiclelist_action';
import { deleteItemcopyVehicleList } from '../../../redux/actions/vehiclelist_action';
import { addItemVehicleList } from '../../../redux/actions/vehiclelist_action';
import { addItemCopyVehicleList } from '../../../redux/actions/vehiclelist_action';

class AddEditVehicleComponent extends React.Component {

    constructor()
    {
       super();
       this.state = { 
         brandList: [],
         allModelList: [],
         modelList: [],
         typeList: [],
         colorList: [],
         statusList: [],
         nickname: "", 
         plate: "",
         modelyear: "",
         selectedColor: 0,
         selectedBrand: 0,
         selectedModel: 0,
         selectedType: 0,
         selectedStatus: 3 // veritabanında 0 ve 1 değerleri bulunduğu için default olarak seçili gelmesin diye herhangi bir sayı atanmıştır.
       };
    }

    componentDidMount() // select listeleri geldikten sonra eğer bu bir edit ise seçili elemanları getir
    {
       if(this.props.match.params.id) // editten geliyorsa
       {
         let _data = {
            method: 'GET',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
            }
            } 
            fetch('http://localhost:50305/api/Vehicle/GetOneVehicle/' + this.props.match.params.id, _data)
            .then((_response) => _response.json())
            .then(_response => {
            _response = JSON.parse(_response);
            if (_response.length != 0 && _response[0].Result) 
            {
               if(_response[0].Result == "Empty") 
               {
                  this.setState({ nickname: "" });
                  this.setState({ plate: "" });
                  this.setState({ modelyear: "" });
                  this.setState({ selectedBrand: 0 });
                  this.setState({ selectedColor: 0 });
                  this.setState({ selectedModel: 0 });
                  this.setState({ selectedStatus: 3 });
                  this.setState({ selectedType: 0 });
               }
            }
            else
            {
               this.setState({ modelList: this.state.allModelList.filter(x => x.BrandId == _response[0].BrandId) });
               this.setState({ nickname: _response[0].Nickname });
               this.setState({ plate: _response[0].Plate });
               this.setState({ modelyear: _response[0].ModelYear });
               this.setState({ selectedBrand: _response[0].BrandId });
               this.setState({ selectedColor: _response[0].ColorId });
               this.setState({ selectedModel: _response[0].ModelId });
               this.setState({ selectedStatus: _response[0].StatusId });
               this.setState({ selectedType: _response[0].TypeId });
            }
            })
            .catch((error) => console.error(error))
       }
    }

    componentWillMount() // Componentler Dom'a eklenmeden select listelerini getir
    {
       this.getColors();
       this.getBrands();
       this.getTypes();
       this.getModels();
       this.getStatus();
    } 

    getColors()
    {
      let _data = {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         }
         } 
         fetch('http://localhost:50305/api/Vehicle/GetColors/', _data)
         .then((_response) => _response.json())
         .then(_response => {
         _response = JSON.parse(_response);
         if (_response.length != 0 && _response[0].Result) 
         {
            if(_response[0].Result == "Empty") 
            {
               this.setState({ colorList: [] });
            }
         }
         else
         {
            this.setState({ colorList: _response });
         }
         })
         .catch((error) => console.error(error))
    }

    getBrands()
    {
      let _data = {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         }
         } 
         fetch('http://localhost:50305/api/Vehicle/GetBrands/', _data)
         .then((_response) => _response.json())
         .then(_response => {
         _response = JSON.parse(_response);
         if (_response.length != 0 && _response[0].Result) 
         {
            if(_response[0].Result == "Empty") 
            {
               this.setState({ brandList: [] });
            }
         }
         else
         {
            this.setState({ brandList: _response });
         }
         })
         .catch((error) => console.error(error))
    }

    getTypes()
    {
      let _data = {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         }
         } 
         fetch('http://localhost:50305/api/Vehicle/GetTypes/', _data)
         .then((_response) => _response.json())
         .then(_response => {
         _response = JSON.parse(_response);
         if (_response.length != 0 && _response[0].Result) 
         {
            if(_response[0].Result == "Empty") 
            {
               this.setState({ typeList: [] });
            }
         }
         else
         {
            this.setState({ typeList: _response });
         }
         })
         .catch((error) => console.error(error))
    }

    getModels()
    {
      let _data = {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         }
         } 
         fetch('http://localhost:50305/api/Vehicle/GetModels/', _data)
         .then((_response) => _response.json())
         .then(_response => {
         _response = JSON.parse(_response);
         if (_response.length != 0 && _response[0].Result) 
         {
            if(_response[0].Result == "Empty") 
            {
               this.setState({ allModelList: [] });
            }
         }
         else
         {
            this.setState({ allModelList: _response });
         }
         })
         .catch((error) => console.error(error))
    }

    getStatus()
    {
      let _data = {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         }
         } 
         fetch('http://localhost:50305/api/Vehicle/GetStatus/', _data)
         .then((_response) => _response.json())
         .then(_response => {
         _response = JSON.parse(_response);
         if (_response.length != 0 && _response[0].Result) 
         {
            if(_response[0].Result == "Empty") 
            {
               this.setState({ statusList: [] });
            }
         }
         else
         {
            this.setState({ statusList: _response });
         }
         })
         .catch((error) => console.error(error))
    }

    handleInputChanges(stateType, event)
    {
       if(stateType == "selectedBrand") // Seçilen markaya göre ilişkili modelleri getir
       {
         this.setState({ modelList: this.state.allModelList.filter(x => x.BrandId == event.target.value) });
       }

      this.setState({[stateType]: event.target.value});
    }

    saveVehicle()
    {
      if(this.props.match.params.id) // güncelleme işlemi ise
      {
         let data = { VehicleId: Number(this.props.match.params.id), Nickname: this.state.nickname, Plate: this.state.plate, BrandId: Number(this.state.selectedBrand), ModelId: Number(this.state.selectedModel), ModelYear: this.state.modelyear, TypeId: Number(this.state.selectedType), ColorId: Number(this.state.selectedColor), StatusId: Number(this.state.selectedStatus) };
         let _data = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
            }
            } 
            fetch('http://localhost:50305/api/Vehicle/UpdateVehicle/' + this.props.match.params.id, _data)
            .then((response) => response.json())
            .then(response => {
               response = JSON.parse(response);
            if(response[0].Result == "True")
            {
               this.props.deleteItemVehicleList(this.props.vehicleList.findIndex(x => x.VehicleId == this.props.match.params.id));
               this.props.deleteItemcopyVehicleList(this.props.copyvehicleList.findIndex(x => x.VehicleId == this.props.match.params.id));
               this.props.addItemVehicleList({ VehicleId: this.props.match.params.id, Nickname: this.state.nickname, Plate: this.state.plate, BrandId: this.state.selectedBrand, ModelId: this.state.selectedModel, ModelYear: this.state.modelyear, TypeId: this.state.selectedType, ColorId: this.state.selectedColor, StatusId: this.state.selectedStatus });
               this.props.addItemCopyVehicleList({ VehicleId: this.props.match.params.id, Nickname: this.state.nickname, Plate: this.state.plate, BrandId: this.state.selectedBrand, ModelId: this.state.selectedModel, ModelYear: this.state.modelyear, TypeId: this.state.selectedType, ColorId: this.state.selectedColor, StatusId: this.state.selectedStatus });
            }
            })
            .catch((error) => console.error(error))
      }
      else // kayıt işlemi ise
      {
         let data = { Nickname: this.state.nickname, Plate: this.state.plate, BrandId: Number(this.state.selectedBrand), ModelId: Number(this.state.selectedModel), ModelYear: this.state.modelyear, TypeId: Number(this.state.selectedType), ColorId: Number(this.state.selectedColor), StatusId: Number(this.state.selectedStatus), Brand: { BrandId: 2, BrandDesc: "asfasf" } };
         let _data = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
            }
            } 
            fetch('http://localhost:50305/api/Vehicle/AddVehicle/', _data)
            .then((response) => response.json())
            .then(response => {
               response = JSON.parse(response);
            if(response[0].Result == "True")
            {
               // redux store tutulan değerler güncelleniyor.
               this.props.addItemVehicleList({ VehicleId: response[1].Result, Nickname: this.state.nickname, Plate: this.state.plate, BrandId: this.state.selectedBrand, ModelId: this.state.selectedModel, ModelYear: this.state.modelyear, TypeId: this.state.selectedType, ColorId: this.state.selectedColor, StatusId: this.state.selectedStatus });
               this.props.addItemCopyVehicleList({ VehicleId: response[1].Result, Nickname: this.state.nickname, Plate: this.state.plate, BrandId: this.state.selectedBrand, ModelId: this.state.selectedModel, ModelYear: this.state.modelyear, TypeId: this.state.selectedType, ColorId: this.state.selectedColor, StatusId: this.state.selectedStatus });
               this.setState({ nickname: "" });
               this.setState({ plate: "" });
               this.setState({ modelyear: "" });
               this.setState({ selectedBrand: 0 });
               this.setState({ selectedColor: 0 });
               this.setState({ selectedModel: 0 });
               this.setState({ selectedStatus: 3 });
               this.setState({ selectedType: 0 });
            }
            })
            .catch((error) => console.error(error))
      }
    }

    render() {
       return (
          <div className="mainDivClass">
             <div className="inputGroup">
               <div className="input-group mb-3">
                  <input type="text" className="form-control" key={this.state.value} value={this.state.plate} onChange={(e) => this.handleInputChanges("plate", e)} placeholder="Plate"/>
               </div>
               <div className="input-group mb-3">
                  <input type="text" className="form-control" key={this.state.value} value={this.state.nickname} onChange={(e) => this.handleInputChanges("nickname", e)} placeholder="Nickname" />
               </div>
               <div className="input-group mb-3">
                  <select className="custom-select" id="inputGroupSelect04" key={this.state.value}  value={this.state.selectedBrand} onChange={(e) => this.handleInputChanges("selectedBrand", e)}>
                     <option defaultValue>Choose Brand...</option>
                     {
                        this.state.brandList.map((val, i) => (
                           <option key={val.BrandId} value={val.BrandId} >{val.BrandDesc}</option>
                        ))
                     }
                  </select>
                  <div className="input-group-append">
                     <label className="input-group-text">Options</label>
                  </div>
               </div>
               <div className="input-group mb-3">
                  <select className="custom-select" id="inputGroupSelect05" key={this.state.value}  value={this.state.selectedModel} onChange={(e) => this.handleInputChanges("selectedModel", e)}>
                     <option defaultValue>Choose Model...</option>
                     {
                        this.state.modelList.map((val, i) => (
                           <option key={val.ModelId} value={val.ModelId} >{val.ModelDesc}</option>
                        ))
                     }
                  </select>
                  <div className="input-group-append">
                     <label className="input-group-text">Options</label>
                  </div>
               </div>
               <div className="input-group mb-3">
                  <input type="text" className="form-control" key={this.state.value} value={this.state.modelyear} onChange={(e) => this.handleInputChanges("modelyear", e)} placeholder="Model Year" />
               </div>
               <div className="input-group mb-3">
                  <select className="custom-select" id="inputGroupSelect03" key={this.state.value}  value={this.state.selectedType} onChange={(e) => this.handleInputChanges("selectedType", e)}>
                     <option defaultValue>Choose Type...</option>
                     {
                        this.state.typeList.map((val, i) => (
                           <option key={val.TypeId} value={val.TypeId} >{val.TypeDesc}</option>
                        ))
                     }
                  </select>
                  <div className="input-group-append">
                     <label className="input-group-text">Options</label>
                  </div>
               </div>
               <div className="input-group mb-3">
                  <select className="custom-select" id="inputGroupSelect02" key={this.state.value}  value={this.state.selectedColor} onChange={(e) => this.handleInputChanges("selectedColor", e)}>
                     <option defaultValue>Choose Color...</option>
                     {
                        this.state.colorList.map((val, i) => (
                           <option key={val.ColorId} value={val.ColorId} >{val.ColorDesc}</option>
                        ))
                     }
                  </select>
                  <div className="input-group-append">
                     <label className="input-group-text">Options</label>
                  </div>
               </div>
               <div className="input-group mb-3">
                  <select className="custom-select" id="inputGroupSelect06" key={this.state.value}  value={this.state.selectedStatus} onChange={(e) => this.handleInputChanges("selectedStatus", e)}>
                     <option defaultValue>Choose Status...</option>
                     {
                        this.state.statusList.map((val, i) => (
                           <option key={val.StatusId} value={val.StatusId} >{val.StatusDesc}</option>
                        ))
                     }
                  </select>
                  <div className="input-group-append">
                     <label className="input-group-text">Options</label>
                  </div>
               </div>
               <br/>
               <br/>
               <button type="button" className="btn btn-primary btnClass" onClick={() => this.saveVehicle()}>Save</button>
               <br/>
               <br/>
               <Link to="/">Go To Vehicles...</Link>
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
     deleteItemVehicleList: (index) => {
      dispatch(deleteItemVehicleList(index))
     }, 
     deleteItemcopyVehicleList: (index) => {
      dispatch(deleteItemcopyVehicleList(index))
     }, 
     addItemVehicleList: (vehicleList) => {
       dispatch(addItemVehicleList(vehicleList))
     },
     addItemCopyVehicleList: (copyvehicleList) => {
      dispatch(addItemCopyVehicleList(copyvehicleList))
    },
   }
 }

export default connect(mapStateToProps, mapDispatchToProps)(AddEditVehicleComponent)
