import React, { useEffect, useState } from 'react'
import Card from './Card'
import './AlbumsList.css'

const AlbumList = () => {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        // busca releases etiquetados como "rock" en todas las regiones
        const response = await fetch(
          'https://musicbrainz.org/ws/2/release?query=tag:rock&limit=50&fmt=json'
        )
        const data = await response.json()
        setAlbums(data.releases || [])
      } catch (err) {
        console.error('error al cargar albumes', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAlbums()
  }, [])

  const filtered = albums.filter(al =>
    al.title.toLowerCase().includes(search.toLowerCase()) ||
    (al['artist-credit'] && al['artist-credit'][0].name.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="album-list">
      <h2>álbumes de rock</h2>
      <input
        type="text"
        placeholder="buscar por álbum o artista"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-input"
      />
      {loading ? (
        <p>cargando álbumes...</p>
      ) : (
        <div className="album-container">
          {filtered.length ? (
            filtered.map((al, idx) => {
              // intenta obtener imagen del Cover Art Archive
              const coverUrl = `https://coverartarchive.org/release/${al.id}/front-250.jpg`
              return (
                <Card
                  key={al.id}
                  nombre={al.title}
                  artista={al['artist-credit'][0].name}
                  imagen={coverUrl}
                />
              )
            })
          ) : (
            <p>no se encontraron álbumes</p>
          )}
        </div>
      )}
    </div>
  )
}

export default AlbumList
