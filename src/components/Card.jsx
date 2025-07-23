import React from 'react'
import './Card.css'

const Card = ({ nombre, artista, imagen }) => {
  return (
    // contenedor principal de la tarjeta del album
    <div className="card">
      <img src={imagen} alt={nombre} />{/* muestra la imagen del album usando la url recibida por props */}
      <h3>{nombre}</h3>{/* muestra el nombre del album */}
      <p>{artista}</p>{/* muestra el nombre del artista */}
    </div>
  )
}

export default Card
