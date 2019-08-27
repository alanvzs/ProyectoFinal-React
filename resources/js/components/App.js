import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Producto from './Producto'
import Usuario from './Usuario'
import Equipo from './Equipo'
import Orden from './Orden'
import Grafica from './Grafica'

class App extends Component {
  render () {
    return (
        <BrowserRouter>
      
          <div>
            <Header />
            <Switch>
              <Route path='/producto' component={Producto} />
              <Route path='/usuario' component={Usuario} />
              <Route path='/equipo' component={Equipo} />
              <Route path='/orden' component={Orden} />
              <Route path='/grafica' component={Grafica} />
            </Switch>
          </div>
        </BrowserRouter>
    )

  }
}

ReactDOM.render(<App />, document.getElementById('app'))