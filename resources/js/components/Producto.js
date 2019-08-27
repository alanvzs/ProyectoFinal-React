import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const baseUrl = "http://localhost/example/laravel-react/public/";

export default class Producto extends Component {

    constructor(props){
      // variables
      super(props);
      this.state = {
        producto:[],
        productoBackup:[],
        textBuscar:'',
        formNombre:'',
        formDescripcion:'',
        formPrecio:'',
        formCantidad:'',
        idProducto:0,
        edit:false
      }
      // funciones de onchange de los campos en el formulario
      this.handleChangeNombre = this.handleChangeNombre.bind(this);
      this.handleChangeDescp  = this.handleChangeDescp.bind(this);
      this.handleChangePreci  = this.handleChangePreci.bind(this);
      this.handleChangeCant  = this.handleChangeCant.bind(this);

    }

    componentDidMount(){
      this.loadDataProduct()
    }

    loadDataProduct(){

      axios.get(baseUrl+'api/producto/list').then(response=>{
          this.setState({
            producto:response.data,
            productoBackup:response.data
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
      const data = this.state.productoBackup

      const newData = data.filter(function(item){
          // variable de titulo
          const itemDataTitulo = item.titulo.toUpperCase()
          // variable de descripcion
          const itemDataDescp = item.descripcion.toUpperCase()
          // juntarlos de titulo y descripcion
          const itemData = itemDataTitulo+" "+itemDataDescp
          // variable de buscar
          const textData = text.toUpperCase()
          // filtrar su es verdadero o no y lo devuelve
          return itemData.indexOf(textData) > -1
      })

      this.setState({producto:newData})

    }

    // campo de nombre
    handleChangeNombre(event) {
      this.setState({formNombre: event.target.value});
    }

    //campo de descripcion
    handleChangeDescp(event) {
      this.setState({formDescripcion: event.target.value});
    }

    // campo de precio
    handleChangePreci(event) {
      this.setState({formPrecio: event.target.value});
    }

    // campo de cantidad
    handleChangeCant(event) {
      this.setState({formCantidad: event.target.value});
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
                  <th>Producto</th>
                  <th>Descripcion</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Acciones</th>
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
                     <label for="exampleInputEmail1">Nombre de producto </label>
                     <input type="text" class="form-control" value={this.state.formNombre} onChange={this.handleChangeNombre} />
                    </div>
                    <div class="form-group">
                     <label for="exampleInputEmail1">Descripcion de producto</label>
                     <textarea class="form-control" rows="3" value={this.state.formDescripcion} onChange={this.handleChangeDescp}></textarea>
                    </div>
                    <div class="form-group">
                     <label for="exampleInputEmail1">Precio</label>
                     <input type="number" class="form-control" value={this.state.formPrecio} onChange={this.handleChangePreci} />
                    </div>
                    <div class="form-group">
                     <label for="exampleInputEmail1">Cantidad</label>
                     <input type="number" class="form-control" value={this.state.formCantidad} onChange={this.handleChangeCant} />
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
      this.setState({ idProducto:data.id })
      $("#exampleModalDelete").modal("show");
    }

    showModalEdit(data){
      //alert("mostrar modal "+JSON.stringify(data))
      this.setState({
        idProducto:data.id,
        formNombre:data.titulo,
        formDescripcion:data.descripcion,
        formPrecio: data.precio,
        formCantidad: data.cantidad,
        edit:true
      })
      $("#exampleModal").modal("show");
    }

    showModalCreate(){
      this.setState({
        idProducto:0,
        formNombre:"",
        formDescripcion:"",
        formPrecio:"",
        formCantidad:"",
        edit:false
      })
      $("#exampleModal").modal("show");
    }

    sendNetworkProduct()
    {
      const formData = new FormData()
      formData.append('nombre',this.state.formNombre)
      formData.append('descripcion',this.state.formDescripcion)
      formData.append('precio',this.state.formPrecio)
      formData.append('cantidad',this.state.formCantidad)

      axios.post(baseUrl+'api/producto/create',formData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.message)
             // para cargar datos de nuevo
             this.loadDataProduct()
             // para cerrar el modal
             $("#exampleModal").modal("hide");
           }

       }).catch(error=>{
         alert("Error "+error)
       })

    }

    sendNetworkDelete(){

      const formData = new FormData()
      formData.append('id',this.state.idProducto)

      axios.post(baseUrl+'api/producto/delete',formData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.message)
             // para cargar datos de nuevo
             this.loadDataProduct()
             // para cerrar el modal
             $("#exampleModalDelete").modal("hide");
           }

       }).catch(error=>{
         alert("Error "+error)
       })

    }

    sendNetworkUpdate(){

      const formData = new FormData()
      formData.append('id',this.state.idProducto)
      formData.append('nombre',this.state.formNombre)
      formData.append('descripcion',this.state.formDescripcion)
      formData.append('precio',this.state.formPrecio)
      formData.append('cantidad',this.state.formCantidad)

      axios.post(baseUrl+'api/producto/update',formData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.message)
             // para cargar datos de nuevo
             this.loadDataProduct()
             // para cerrar el modal
             $("#exampleModal").modal("hide");
           }

       }).catch(error=>{
         alert("Error 456"+error)
       })

    }

    listData(){

      return this.state.producto.map((data)=>{

        return(
          <tr>
            <td>{data.titulo}</td>
            <td>{data.descripcion}</td>
            <td>{data.precio}</td>
            <td>{data.cantidad}</td>
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

if (document.getElementById('producto')) {
    ReactDOM.render(<Producto />, document.getElementById('producto'));
}
