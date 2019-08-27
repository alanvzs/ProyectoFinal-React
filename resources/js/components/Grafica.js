import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import produce from 'immer/dist/immer';
import SimpleBarChart from './Grafica/SimpleBarChart';


const baseUrl = "http://localhost/example/laravel-react/public/";

class Grafica extends Component {

    constructor(props){
      // variables
      super(props);
      this.state = {
        responseStatus:[],
        responseServices:[],
        data:{
            headers:["estado","cantidad"],
            rows:{summary:[]}
        },
        data2:{
          headers:["estado","cantidad"],
          rows:{summary2:[]}
      },
      }

    }

    componentDidMount(){
      this.loadDataGraficaStatus()
      this.loadDataGraficaServicio()
    }

    loadDataGraficaStatus(){
        axios.get(baseUrl+'api/grafica/getGraficaStatus').then(response=>{
            this.setState({
              responseStatus:response.data
            })
            console.log('status',response.data);
           
            let array = [];
            this.state.responseStatus.forEach((item, i) => {
                const element = {
                    estado: item.estado,
                    cantidad: item.cantidad
                };
                array = array.concat(element);
            });
            console.log('array',array);
            const nextState = produce(this.state, (draft) => {
                draft.data.rows.summary = array;
            });
            this.setState(nextState);      

         }).catch(error=>{
           alert("Error "+error)
         })
      }


      loadDataGraficaServicio(){
        axios.get(baseUrl+'api/grafica/getGraficaServicio').then(response=>{
            this.setState({
              responseServices:response.data
            })
            console.log('servicios',response.data);
           
            let array = [];
            this.state.responseServices.forEach((item, i) => {
                const element = {
                     estado: item.tip_servicio,
                    cantidad: item.cantidad
                };
                array = array.concat(element);
            });
            console.log('array',array);
            const nextState = produce(this.state, (draft) => {
                draft.data2.rows.summary2 = array;
            });
            this.setState(nextState);      

         }).catch(error=>{
           alert("Error "+error)
         })
      }

      render() {

        return (
          <div class="container">
                <br/>
                <h3>Graficas</h3>
                <hr/>
                <div>
                  <SimpleBarChart newData={this.state.data.rows.summary} 
                          label={"estado"} llaves={"cantidad"} 
                          fill={["rgba(200,0,0,.3)", "rgba(0, 200, 0, .3)"]} 
                          alto={400} ancho={600} />
                 </div>
                 <div> 
                  <SimpleBarChart newData={this.state.data2.rows.summary2} 
                          label={"estado"} llaves={"cantidad"} 
                          fill={["rgba(200,0,0,.3)", "rgba(0, 200, 0, .3)"]} 
                          alto={400} ancho={600} />        
                </div>
                <hr/>
            </div>

            )

        }

}

export default Grafica
