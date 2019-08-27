import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => (
    
  <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
    <div className='container'>
        
            <Link className='navbar-brand' to="/usuario">
                Usuario
            </Link>
            
            <Link className='navbar-brand' to="/equipo">
                Equipo
            </Link>
            
            <Link className='navbar-brand' to="/orden">
                Orden de Servicio
            </Link>

            <Link className='navbar-brand' to="/grafica">
                Gráfica
            </Link>
        </div>
        
  </nav>
)

export default Header