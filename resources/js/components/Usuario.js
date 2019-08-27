import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const baseUrl = "http://localhost/example/laravel-react/public/";

class Usuario extends Component {

    constructor(props){
      // variables
      super(props);
      this.state = {
        usuario:[],
        usuarioBackup:[],
        textBuscar:'',
        formNombre:'',
        formDepartamento:'',
        formArea:'',
        formCargo:'',
        formTelefono:'',
        formEmail:'',
        idUsuario:0,
        edit:false
      }
      // funciones de onchange de los campos en el formulario
      this.handleChangeNombre = this.handleChangeNombre.bind(this);
      this.handleChangeDepartamento  = this.handleChangeDepartamento.bind(this);
      this.handleChangeArea  = this.handleChangeArea.bind(this);
      this.handleChangeCargo  = this.handleChangeCargo.bind(this);
      this.handleChangeTelefono  = this.handleChangeTelefono.bind(this);
      this.handleChangeEmail  = this.handleChangeEmail.bind(this);

    }

    componentDidMount(){
      this.loadDataUsuario()
    }

    loadDataUsuario(){

      axios.get(baseUrl+'api/usuario/list').then(response=>{
          this.setState({
            usuario:response.data,
            usuarioBackup:response.data
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
      const data = this.state.usuarioBackup

      const newData = data.filter(function(item){
          // variable de titulo
          const itemDataNombre = item.nombre.toUpperCase()
          // variable de descripcion
          const itemDataDepartamento = item.departamento.toUpperCase()
          // juntarlos de titulo y descripcion
          const itemData = itemDataNombre+" "+itemDataDepartamento
          // variable de buscar
          const textData = text.toUpperCase()
          // filtrar su es verdadero o no y lo devuelve
          return itemData.indexOf(textData) > -1
      })

      this.setState({usuario:newData})

    }

    // campo de nombre
    handleChangeNombre(event) {
      this.setState({formNombre: event.target.value});
    }

    //campo de descripcion
    handleChangeDepartamento(event) {
      this.setState({formDepartamento: event.target.value});
    }

    // campo de precio
    handleChangeArea(event) {
      this.setState({formArea: event.target.value});
    }

    // campo de cantidad
    handleChangeCargo(event) {
      this.setState({formCargo: event.target.value});
    }
    // campo de cantidad
    handleChangeTelefono(event) {
      this.setState({formTelefono: event.target.value});
    }
    // campo de cantidad
    handleChangeEmail(event) {
      this.setState({formEmail: event.target.value});
    }

    render() {
        return (
          <div class="container">
            <br/>
            <h3>Registro de Usuarios</h3>
            <hr/>
            <input class="form-control col-md-4" placeholder="Buscar Usuario" value={this.state.text} onChange={(text) => this.filter(text)}/>
            <br/>
            <button type="button" class="btn btn-primary pull-right" onClick={()=>this.showModalCreate()}>
              Crear usuario
            </button>
            <hr/>
            <table class="table table-bordered order-table ">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Departamento</th>
                  <th>Area</th>
                  <th>Cargo</th>
                  <th>Telefono</th>
                  <th>Email</th>
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
                    <h5 class="modal-title" id="exampleModalLabel">Formulario de producto</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="form-group">
                     <label for="exampleInputEmail1">Nombre de usuario </label>
                     <input type="text" class="form-control" value={this.state.formNombre} onChange={this.handleChangeNombre} />
                    </div>
                    <div class="form-group">
                     <label for="exampleInputEmail1">Departamento</label>
                     <input type="text" class="form-control"  value={this.state.formDepartamento} onChange={this.handleChangeDepartamento}/>
                    </div>
                    <div class="form-group">
                     <label for="exampleInputEmail1">Area</label>
                     <input type="text" class="form-control" value={this.state.formArea} onChange={this.handleChangeArea} />
                    </div>
                    <div class="form-group">
                     <label for="exampleInputEmail1">Cargo</label>
                     <input type="text" class="form-control" value={this.state.formCargo} onChange={this.handleChangeCargo} />
                    </div>
                    <div class="form-group">
                     <label for="exampleInputEmail1">Telefono</label>
                     <input type="text" class="form-control" value={this.state.formTelefono} onChange={this.handleChangeTelefono} />
                    </div>
                    <div class="form-group">
                     <label for="exampleInputEmail1">Email</label>
                     <input type="email" class="form-control" value={this.state.formEmail} onChange={this.handleChangeEmail} />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>

                    {
                      this.state.edit?
                      <button type="button" class="btn btn-primary" onClick={()=>this.sendNetworkUpdate()}>Actualizar</button>
                      :
                      <button type="button" class="btn btn-primary" onClick={()=>this.sendNetworkProduct()}>Guardar</button>
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
      this.setState({ idUsuario:data.id_usuario })
      $("#exampleModalDelete").modal("show");
    }

    showModalEdit(data){
      //alert("mostrar modal "+JSON.stringify(data))
      this.setState({
        idUsuario:data.id_usuario,
        formNombre:data.nombre,
        formDepartamento:data.departamento,
        formArea: data.area,
        formCargo: data.cargo,
        formTelefono: data.telefono,
        formEmail: data.email,
        edit:true
      })
      $("#exampleModal").modal("show");
    }

    showModalCreate(){
      this.setState({
        idUsuario:0,
        formNombre:"",
        formDepartamento:"",
        formArea:"",
        formCargo:"",
        formTelefono:"",
        formEmail:"",
        edit:false
      })
      $("#exampleModal").modal("show");
    }

    sendNetworkProduct()
    {
      const formData = new FormData()
      formData.append('nombre',this.state.formNombre)
      formData.append('departamento',this.state.formDepartamento)
      formData.append('area',this.state.formArea)
      formData.append('cargo',this.state.formCargo)
      formData.append('telefono',this.state.formTelefono)
      formData.append('email',this.state.formEmail)

      axios.post(baseUrl+'api/usuario/create',formData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.message)
             // para cargar datos de nuevo
             this.loadDataUsuario()
             // para cerrar el modal
             $("#exampleModal").modal("hide");
           }

       }).catch(error=>{
         alert("Error "+error)
       })

    }

    sendNetworkDelete(){

      const formData = new FormData()
      formData.append('id_usuario',this.state.idUsuario)

      axios.post(baseUrl+'api/usuario/delete',formData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.message)
             // para cargar datos de nuevo
             this.loadDataUsuario()
             // para cerrar el modal
             $("#exampleModalDelete").modal("hide");
           }

       }).catch(error=>{
         alert("Error "+error)
       })

    }

    sendNetworkUpdate(){

      const formData = new FormData()
      formData.append('id_usuario',this.state.idUsuario)
      formData.append('nombre',this.state.formNombre)
      formData.append('departamento',this.state.formDepartamento)
      formData.append('area',this.state.formArea)
      formData.append('cargo',this.state.formCargo)
      formData.append('telefono',this.state.formTelefono)
      formData.append('email',this.state.formEmail)

      axios.post(baseUrl+'api/usuario/update',formData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.message)
             // para cargar datos de nuevo
             this.loadDataUsuario()
             // para cerrar el modal
             $("#exampleModal").modal("hide");
           }

       }).catch(error=>{
         alert("Error 456"+error)
       })

    }

    listData(){

      return this.state.usuario.map((data)=>{

        return(
          <tr>
            <td>{data.nombre}</td>
            <td>{data.departamento}</td>
            <td>{data.area}</td>
            <td>{data.cargo}</td>
            <td>{data.telefono}</td>
            <td>{data.email}</td>
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


export default Usuario
/*if (document.getElementById('usuario')) {
    ReactDOM.render(<Usuario />, document.getElementById('usuario'));
}*/
