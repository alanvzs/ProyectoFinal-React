import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const baseUrl = "http://localhost:8000/";

class Equipo extends Component {

    constructor(props){
      // variables
      super(props);
      this.state = {
        equipo:[],
        equipoBackup:[],
        textBuscar:'',
        formNo_inventario:'',
        formMarca:'',
        formModelo:'',
        formProcesador:'',
        formRam:'',
        formHd:'',
        formEstado:'',
        formSis_oper:'',
        formOfimatica:'',
        formAntivirus:'',
        idEquipo:0,
        edit:false
      }
      // funciones de onchange de los campos en el formulario
      this.handleChangeNo_inventario = this.handleChangeNo_inventario.bind(this);
      this.handleChangeMarca  = this.handleChangeMarca.bind(this);
      this.handleChangeModelo  = this.handleChangeModelo.bind(this);
      this.handleChangeProcesador  = this.handleChangeProcesador.bind(this);
      this.handleChangeRam  = this.handleChangeRam.bind(this);
      this.handleChangeHd  = this.handleChangeHd.bind(this);
      this.handleChangeEstado  = this.handleChangeEstado.bind(this);
      this.handleChangeSis_oper  = this.handleChangeSis_oper.bind(this);
      this.handleChangeOfimatica  = this.handleChangeOfimatica.bind(this);
      this.handleChangeAntivirus  = this.handleChangeAntivirus.bind(this);
      

    }

    componentDidMount(){
      this.loadDataEquipo()
    }

    loadDataEquipo(){

      axios.get(baseUrl+'api/equipo/list').then(response=>{
          this.setState({
            equipo:response.data,
            equipoBackup:response.data
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
      const data = this.state.equipoBackup

      const newData = data.filter(function(item){
          // variable de titulo
          const itemDataNo_inventario = item.nombre.toUpperCase()
          // variable de descripcion
          const itemDataMarca = item.departamento.toUpperCase()
          // juntarlos de titulo y descripcion
          const itemData = itemDataNo_inventario+" "+itemDataMarca
          // variable de buscar
          const textData = text.toUpperCase()
          // filtrar su es verdadero o no y lo devuelve
          return itemData.indexOf(textData) > -1
      })

      this.setState({equipo:newData})

    }

    // campo de nombre
    handleChangeNo_inventario(event) {
      this.setState({formNo_inventario: event.target.value});
    }

    //campo de descripcion
    handleChangeMarca(event) {
      this.setState({formMarca: event.target.value});
    }

    // campo de precio
    handleChangeModelo(event) {
      this.setState({formModelo: event.target.value});
    }

    // campo de cantidad
    handleChangeProcesador(event) {
      this.setState({formProcesador: event.target.value});
    }
    // campo de cantidad
    handleChangeRam(event) {
      this.setState({formRam: event.target.value});
    }
    // campo de cantidad
    handleChangeHd(event) {
      this.setState({formHd: event.target.value});
    }
    handleChangeEstado(event) {
      this.setState({formEstado: event.target.value});
    }
    handleChangeSis_oper(event) {
      this.setState({formSis_oper: event.target.value});
    }
    handleChangeOfimatica(event) {
      this.setState({formOfimatica: event.target.value});
    }
    handleChangeAntivirus(event) {
      this.setState({formAntivirus: event.target.value});
    }

    render() {
        return (
          <div class="container">
            <br/>
            <h3>Registro de Equipos de Computo</h3>
            <hr/>
            <input class="form-control col-md-4" placeholder="Buscar Equipo" value={this.state.text} onChange={(text) => this.filter(text)}/>
            <br/>
            <button type="button" class="btn btn-primary pull-right" onClick={()=>this.showModalCreate()}>
              Crear Equipo de Computo
            </button>
            <hr/>
            <table class="table table-bordered order-table ">
              <thead>
                <tr>
                  <th>No. Inventario(SICIPO)</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Procesador</th>
                  <th>Memoria RAM</th>
                  <th>Capacidad de Disco Duro</th>
                  <th>Estado</th>
                  <th>Sistema Operativo</th>
                  <th>Software Ofimatico</th>
                  <th>Software Antivirus</th>
                </tr>
              </thead>
              <tbody id="bodytable">
                  {this.listData()}
              </tbody>
            </table>

            <div class="modal fade" id="exampleModalDelete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">

                <div class="modal-content">

                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Eliminar</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <p>Esta seguro desea de eliminar un registro?</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" onClick={()=>this.sendNetworkDelete()}>Eliminar</button>
                  </div>
                </div>

              </div>
            </div>


            <form>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Formulario de Equipo</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="form-group">
                     <label for="exampleInputEmail1">No. Inventario(SICIPO) </label>
                     <input type="text" class="form-control" value={this.state.formNo_inventario} onChange={this.handleChangeNo_inventario} />
                    </div>
                    <div class="form-group">
                     <label for="exampleInputEmail1">Marca</label>
                     <input type="text" class="form-control"  value={this.state.formMarca} onChange={this.handleChangeMarca}/>
                    </div>
                    <div class="form-group">
                     <label for="exampleInputEmail1">Modelo</label>
                     <input type="text" class="form-control" value={this.state.formModelo} onChange={this.handleChangeModelo} />
                    </div>
                    <div class="form-group">
                     <label for="exampleInputEmail1">Procesador</label>
                     <input type="text" class="form-control" value={this.state.formProcesador} onChange={this.handleChangeProcesador} />
                    </div>
                    <div class="form-group">
                     <label for="exampleInputEmail1">Memoria RAM</label>
                     <input type="text" class="form-control" value={this.state.formRam} onChange={this.handleChangeRam} />
                    </div>
                    <div class="form-group">
                     <label for="exampleInputEmail1">Disco Duro</label>
                     <input type="text" class="form-control" value={this.state.formHd} onChange={this.handleChangeHd} />
                    </div>
                    <div class="form-group">
                    <label for="exampleInputEmail1">Estado</label>
                    <input type="text" class="form-control" value={this.state.formEstado} onChange={this.handleChangeEstado} />
                   </div>
                   <div class="form-group">
                   <label for="exampleInputEmail1">Sistema Operativo</label>
                   <input type="text" class="form-control" value={this.state.formSis_oper} onChange={this.handleChangeSis_oper} />
                  </div>
                  <div class="form-group">
                  <label for="exampleInputEmail1">Software Ofimatico</label>
                  <input type="text" class="form-control" value={this.state.formOfimatica} onChange={this.handleChangeOfimatica} />
                 </div>
                 <div class="form-group">
                 <label for="exampleInputEmail1">Software Antivirus</label>
                 <input type="text" class="form-control" value={this.state.formAntivirus} onChange={this.handleChangeAntivirus} />
                </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    {
                      this.state.edit?
                      <button type="button" class="btn btn-primary" onClick={()=>this.sendNetworkUpdate()}>Actualizar</button>
                      :
                      <button type="button" class="btn btn-primary" onClick={()=>this.sendNetworkEquipo()}>Guardar</button>
                    }
                    </div>
                  </div>
                </div>
              </div>
              </form>
  
  
            </div>
          );
      } 
    

    showModalDelete(data){ 
      // id seleccionado para eliminar
      this.setState({ idEquipo:data.id_equipo })
      $("#exampleModalDelete").modal("show");
    }

    showModalEdit(data){
      //alert("mostrar modal "+JSON.stringify(data))
      this.setState({
        idEquipo:data.id_equipo,
        formNo_inventario:data.no_inventario,
        formMarca:data.marca,
        formModelo: data.modelo,
        formProcesador: data.procesador,
        formRam: data.ram,
        formHd: data.hd,
        formEstado: data.estado,
        formSis_oper: data.sis_oper,
        formOfimatica: data.ofimatica,
        formAntivirus: data.antivirus,
        edit:true
      })
      $("#exampleModal").modal("show");
    }

    showModalCreate(){
      this.setState({
        idEquipo:0,
        formNo_inventario:"",
        formMarca:"",
        formModelo:"",
        formProcesador:"",
        formRam:"",
        formHd:"",
        formEstado:"",
        formSis_oper:"",
        formOfimatica:"",
        formAntivirus:"",
        edit:false
      })
      $("#exampleModal").modal("show");
    }

    sendNetworkEquipo()
    {
      const formData = new FormData()
      formData.append('no_inventario',this.state.formNo_inventario)
      formData.append('marca',this.state.formMarca)
      formData.append('modelo',this.state.formModelo)
      formData.append('procesador',this.state.formProcesador)
      formData.append('ram',this.state.formRam)
      formData.append('hd',this.state.formHd)
      formData.append('estado',this.state.formEstado)
      formData.append('sis_oper',this.state.formSis_oper)
      formData.append('ofimatica',this.state.formOfimatica)
      formData.append('antivirus',this.state.formAntivirus)

      axios.post(baseUrl+'api/equipo/create',formData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.message)
             // para cargar datos de nuevo
             this.loadDataEquipo()
             // para cerrar el modal
             $("#exampleModal").modal("hide");
           }

       }).catch(error=>{
         alert("Error "+error)
       })

    }

    sendNetworkDelete(){

      const formData = new FormData()
      formData.append('id_equipo',this.state.idEquipo)

      axios.post(baseUrl+'api/equipo/delete',formData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.message)
             // para cargar datos de nuevo
             this.loadDataEquipo()
             // para cerrar el modal
             $("#exampleModalDelete").modal("hide");
           }

       }).catch(error=>{
         alert("Error "+error)
       })

    }

    sendNetworkUpdate(){

      const formData = new FormData()
      formData.append('id_equipo',this.state.idEquipo)
      formData.append('no_inventario',this.state.formNo_inventario)
      formData.append('marca',this.state.formMarca)
      formData.append('modelo',this.state.formModelo)
      formData.append('procesador',this.state.formProcesador)
      formData.append('ram',this.state.formRam)
      formData.append('hd',this.state.formHd)
      formData.append('estado',this.state.formEstado)
      formData.append('sis_oper',this.state.formSis_oper)
      formData.append('ofimatica',this.state.formOfimatica)
      formData.append('antivirus',this.state.formAntivirus)

      axios.post(baseUrl+'api/equipo/update',formData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.message)
             // para cargar datos de nuevo
             this.loadDataEquipo()
             // para cerrar el modal
             $("#exampleModal").modal("hide");
           }

       }).catch(error=>{
         alert("Error 456"+error)
       })

    }

    listData(){

      return this.state.equipo.map((data)=>{

        return(
          <tr>
            <td>{data.no_inventario}</td>
            <td>{data.marca}</td>
            <td>{data.modelo}</td>
            <td>{data.procesador}</td>
            <td>{data.ram}</td>
            <td>{data.hd}</td>
            <td>{data.estado}</td>
            <td>{data.sis_oper}</td>
            <td>{data.ofimatica}</td>
            <td>{data.antivirus}</td>
            <td>
              <button class="btn btn-info" onClick={()=>this.showModalEdit(data)}>Editar</button>
              <br/>
              <button class="btn btn-danger" onClick={()=>this.showModalDelete(data)}>Eliminar</button>
            </td>
          </tr>
        )

      })

    }
}
export default Equipo
