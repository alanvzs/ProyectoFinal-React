import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const baseUrl = "http://localhost/example/laravel-react/public/";

class Orden extends Component {
   
     constructor(props){
      // variables
      super(props);
      this.state = {
        usuarios:[],
        equipos:[],
        orden:[],
        ordenBackup:[],
        textBuscar:'',
        formIdorden:'',
        formEquipo:'',
        formUsuario:'',
        formTipo:'',
        formFecha:'',
        formDiagnostico:'',
        formServicio:'',
        formObs:'',
        formTecnico:'',
        idOrden:0,
        idEquipo:0,
        idUsuario:0,
        edit:false
      }
      // funciones de onchange de los campos en el formulario
     this.handleChangeUsuario = this.handleChangeUsuario.bind(this);
      this.handleChangeEquipo = this.handleChangeEquipo.bind(this);
      this.handleChangeTipo  = this.handleChangeTipo.bind(this);
      this.handleChangeDiag  = this.handleChangeDiag.bind(this);
      this.handleChangeServicio  = this.handleChangeServicio.bind(this);
      this.handleChangeObs  = this.handleChangeObs.bind(this);
      this.handleChangeTec  = this.handleChangeTec.bind(this);

    }

    componentDidMount(){
      this.loadDataOrden()
      
    }

    loadDataOrden(){

      axios.get(baseUrl+'api/orden/list').then(response=>{
          this.setState({
            orden:response.data,
            ordenBackup:response.data
          })
       }).catch(error=>{
         alert("Error "+error)
       })

       axios.get(baseUrl+'api/usuario/list').then(response=>{
          this.setState({
            usuarios:response.data,
          })
      }).catch(error=>{
        alert("Error "+error)
      })

      axios.get(baseUrl+'api/equipo/list').then(response=>{
        this.setState({
          equipos:response.data,
        })
     }).catch(error=>{
       alert("Error "+error)
     })

    }

    filter(event){

      console.log(event.target.value)
      // obtener datos de buscar
      var text = event.target.value
      // obtener datos de array
      const data = this.state.ordenBackup

      const newData = data.filter(function(item){
          // variable de titulo
          const itemDataInv = item.no_inventario.toUpperCase()
          // variable de descripcion
          const itemDataNombre = item.nombre.toUpperCase()

          const itemDataServ = item.servicio_realizado.toUpperCase()

          const itemDataDiag = item.diagnostico.toUpperCase()

          const itemDataTec = item.tecnico.toUpperCase()
          // juntarlos de titulo y descripcion
          const itemData = itemDataInv+" "+itemDataNombre+" "+itemDataServ+" "+itemDataDiag+" "+itemDataTec
          // variable de buscar
          const textData = text.toUpperCase()
          // filtrar su es verdadero o no y lo devuelve
          return itemData.indexOf(textData) > -1
      })

      this.setState({orden:newData})

    }

     // campo de nombre
     handleChangeUsuario(event) {
      this.setState({formUsuario: event.target.value});
    }

    handleChangeEquipo(event) {
      this.setState({formEquipo: event.target.value});
    }
    //campo de cantidad
    handleChangeTipo(event) {
      this.setState({formTipo: event.target.value});
    }

    handleChangeDiag(event) {
      this.setState({formDiagnostico: event.target.value});
    }

    handleChangeServicio(event) {
      this.setState({formServicio: event.target.value});
    }

    handleChangeObs(event) {
      this.setState({formObs: event.target.value});
    } 

    handleChangeTec(event) {
       this.setState({formTecnico: event.target.value});
    } 


    render() {
        
      return (
        <div class="container">

          <br/>
          <h3>Ordenes de Servicio</h3>
          <hr/>

          <input class="form-control col-md-4" placeholder="Buscar..." value={this.state.text} onChange={(text) => this.filter(text)}/>
          <br/>
          <button type="button" class="btn btn-primary pull-right" onClick={()=>this.showModalCreate()}>
            Levantar orden de servicio
          </button>

          <hr/>

          <table class="table table-bordered order-table ">
            <thead>
              <tr>
                <th>Id Orden</th>
                <th>Usuario</th>
                <th>Equipo</th>
                <th>Servicio realizado</th>
                <th>Observaciones</th>
                <th>Técnico</th>
              </tr>
            </thead>
            <tbody id="bodytable">
                {this.listData()}
            </tbody>
          </table> 
          

          {<form>
          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Registro</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div class="modal-body">
                {
                  this.state.edit?
                  <div class="form-group">
                   <label for="exampleInputEmail1">Id Orden </label>
                   <input type="number" disabled="disabled" class="form-control" value={this.state.formIdorden} />
                  </div>:''
                }
                 
                  <div class="form-group">
                   <label for="exampleInputEmail1">Usuario </label>
                   <select class="form-control" name="usuario" id="usuario" onChange={this.handleChangeUsuario}>
                   <option value="">Selecciona un usuario de la lista</option>
                     {this.renderUsuarios()}
                    </select>
                  </div>
                  <div class="form-group">
                   <label for="exampleInputEmail1">Equipo </label>
                   <select class="form-control" name="equipo" id="equipo" onChange={this.handleChangeEquipo}>
                   <option value="">Selecciona un equipo de la lista</option>
                     {this.renderEquipos()}
                    </select>
                  </div>
                  <div class="form-group">
                   <label for="exampleInputEmail1">Tipo de servicio</label>
                   
                   <input type="text" class="form-control" value={this.state.formTipo} onChange={this.handleChangeTipo} />
                  </div>
                  {this.state.edit ?
                   <div class="form-group">
                   <label for="exampleInputEmail1">Fecha</label>
                   <input disabled="disabled" type="text" class="form-control" value={this.state.formFecha}/>
                  </div>
                  :""}
                  <div class="form-group">
                   <label for="exampleInputEmail1">Diagnóstico</label>
                   <textarea type="text" class="form-control" value={this.state.formDiagnostico} onChange={this.handleChangeDiag} />
                  </div>
                  <div class="form-group">
                   <label for="exampleInputEmail1">Servicio realizado</label>
                   <textarea type="text" class="form-control" value={this.state.formServicio} onChange={this.handleChangeServicio} />
                  </div>
                  <div class="form-group">
                   <label for="exampleInputEmail1">Observaciones</label>
                   <textarea type="text" class="form-control" value={this.state.formObs} onChange={this.handleChangeObs} />
                  </div>
                  <div class="form-group">
                   <label for="exampleInputEmail1">Técnico</label>
                   <textarea type="text" class="form-control" value={this.state.formTecnico} onChange={this.handleChangeTec} />
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>

                  {
                    this.state.edit?
                    <button type="button" class="btn btn-primary" onClick={()=>this.sendNetworkUpdate()}>Actualizar</button>
                    :
                    <button type="button" class="btn btn-primary" onClick={()=>this.sendNetworkOrden()}>Guardar</button>
                   }
                </div>
              </div>
            </div>
          </div>
        </form>}
        </div>
      )
    }

    showModalEdit(data){
    
      this.setState({
        formIdorden:data.id_orden,
        formUsuario:data.id_usuario,
        formEquipo:data.id_equipo,
        formTipo: data.tip_servicio,
        formDiagnostico: data.diagnostico,
        formServicio: data.servicio_realizado,
        formObs: data.observaciones,
        formTecnico: data.tecnico,
        formFecha:data.fecha_servicio,
        edit:true
      })
      $("#exampleModal").modal("show");
    }

    showModalCreate(){
      this.setState({
        idOrden:0,
        formIdorden:"",
        formUsuario:"",
        formEquipo:"",
        formTipo: "",
        formDiagnostico: "",
        formServicio:"",
        formObs: "",
        formTecnico: "",
        edit:false
      })
      $("#exampleModal").modal("show");
    }

    sendNetworkOrden()
    {
      
      const formData = new FormData()
      formData.append('equipo',this.state.formEquipo)
      formData.append('usuario',this.state.formUsuario)
      formData.append('tipo',this.state.formTipo)
      formData.append('diagnostico',this.state.formDiagnostico)
      formData.append('servicio',this.state.formServicio)
      formData.append('observaciones',this.state.formObs)
      formData.append('tecnico',this.state.formTecnico)

      axios.post(baseUrl+'api/orden/create',formData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.message)
             // para cargar datos de nuevo
             this.loadDataOrden()
             // para cerrar el modal
             $("#exampleModal").modal("hide");
           }

       }).catch(error=>{
         alert("Error "+error)
       })

    }

    sendNetworkUpdate(){

    

      const formData = new FormData()
      formData.append('equipo',this.state.formEquipo)
      formData.append('usuario',this.state.formUsuario)
      formData.append('tipo',this.state.formTipo)
      formData.append('diagnostico',this.state.formDiagnostico)
      formData.append('servicio',this.state.formServicio)
      formData.append('observaciones',this.state.formObs)
      formData.append('tecnico',this.state.formTecnico)
      formData.append('id_orden',this.state.formIdorden)

      axios.post(baseUrl+'api/orden/update',formData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.message)
             // para cargar datos de nuevo
             this.loadDataOrden()
             // para cerrar el modal
             $("#exampleModal").modal("hide");
           }

       }).catch(error=>{
         alert("Error 456"+error)
       })

    }

    listData(){
    
        return this.state.orden.map((data)=>{
          return(
            <tr>
              <td>{data.id_orden}</td>
              <td>{data.nombre}</td>
              <td>{data.no_inventario}</td>
              <td>{data.servicio_realizado}</td>
              <td>{data.observaciones}</td>
              <td>{data.tecnico}</td>
              <td>
              {<button class="btn btn-info" onClick={()=>this.showModalEdit(data)}>Editar</button>}
              <br/>
            </td>
            </tr>
          )
  
        })
  
      }

      renderEquipos(){
       
        const {formEquipo} = this.state;

        return this.state.equipos.map((data)=>{ 
          return(
            <option value={data.id_equipo} selected = {data.id_equipo === formEquipo ? "selected":''}>{data.no_inventario}</option>
            
          )
        })
  
      }

      renderUsuarios(){
       
        const {formUsuario} = this.state;

        return this.state.usuarios.map((data)=>{ 
          return(
            <option value={data.id_usuario} selected = {data.id_usuario === formUsuario ? "selected":''}>{data.nombre}</option>
            
          )
        })
  
      }

}

export default Orden