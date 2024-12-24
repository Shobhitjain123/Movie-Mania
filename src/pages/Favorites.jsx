import React from 'react'
import '../css/Favorites.css'

import { useMovieContext } from '../context/MovieContext'
import MovieCard from '../components/MovieCard'

function Favorites() {

    const { favorite } = useMovieContext()
    return favorite.length > 0 ? (

        <div className='favorites'>
            <h2>Your favorites</h2>
            <div className='movies-grid'>
                {
                    favorite.map((favMovie) => (
                        <MovieCard movie={favMovie} key={favMovie.id}/>
                    ))
                }
            </div>
        </div>
        
    ) : (
        <div className='favorites-empty'>
            <h2>No Favorite Movies yet..</h2>
            <p>Start adding movies to your favorite list</p>
        </div>
    )




}

export default Favorites
