import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} RockDev. Todos los derechos reservados.</p>
      <p>Diseñadopor Rock Devs</p>
    </footer>
  )
}

export default Footer
