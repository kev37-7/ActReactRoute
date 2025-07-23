import React, { useEffect, useState } from 'react'
import Card from './Card'
import './AlbumsList.css'

const AlbumList = () => {
  const [albums, setAlbums] = useState([]) // guarda los albumes obtenidos de la API
  const [loading, setLoading] = useState(true) // controla si aun se estan cargando los datos
  const [search, setSearch] = useState('') // texto ingresado en la barra de busqueda

  useEffect(() => {
    // funcion asincronica que se encarga de obtener los albumes de rock desde la API de iTunes
    const fetchAlbums = async () => {
      try {
        // peticion HTTP a la API con el termino de busqueda "rock"
        const response = await fetch(
          'https://itunes.apple.com/search?term=rock&entity=album&limit=50'
        )

        const data = await response.json()

        // actualiza el estado con los albumes recibidos
        setAlbums(data.results)
      } catch (error) {
        // muestra error si falla la peticion
        console.error('error al cargar los álbumes', error)
      } finally {
        // oculta el mensaje de "cargando"
        setLoading(false)
      }
    }

    fetchAlbums() // ejecuta la funcion al montar el componente
  }, [])

  // filtra los albumes segun el texto ingresado
  const filteredAlbums = albums.filter(album =>
    album.collectionName.toLowerCase().includes(search.toLowerCase()) ||
    album.artistName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="album-list">
      <h2>álbumes de rock</h2>

      <input
        type="text"
        placeholder="buscar por nombre o artista"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {loading ? (
        <p>cargando álbumes...</p>
      ) : (
        <div className="album-container">
          {filteredAlbums.length > 0 ? (
            filteredAlbums.map((album) => (
              <Card
                key={album.collectionId}
                nombre={album.collectionName}
                artista={album.artistName}
                imagen={album.artworkUrl100}
              />
            ))
          ) : (
            <p>no se encontraron álbumes</p>
          )}
        </div>
      )}
    </div>
  )
}

export default AlbumList
