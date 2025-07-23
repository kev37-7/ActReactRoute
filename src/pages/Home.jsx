import React from 'react'
import { useNavigate } from 'react-router-dom' // hook para la navegacion
import './Home.css'

const Home = () => {
  const navigate = useNavigate() // se inicializa el hook de navegación

  // esta funcion se ejecuta al hacer clic en el boton y redirige a /albumes
  const handleNavigate = () => {
    navigate('/albumes')
  }

  return (
    <div className="home">
      <h1>Bienvenido al portal de Álbumes de Rock</h1>
      <p>Explora nuestra colección de álbumes clásicos de rock.</p>

      {/* al hacer clic navega a la sección de albumes */}
      <button onClick={handleNavigate}>Ver Álbumes</button>
    </div>
  )
}

export default Home
