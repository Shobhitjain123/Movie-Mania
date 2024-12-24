import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {

    const [favorite, setFavorite] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem('favorites')
        if(storedFavs) setFavorite(JSON.parse(favorite))
    }, [])

    useEffect(() => {
        localStorage.setItem('favorite', JSON.stringify(favorite))
    }, [favorite])

    const addToFavorite = (movie) => {
        setFavorite(prev => [...prev, movie])
    }

    const deleteFromFavorite = (movieId) => {
        setFavorite(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorite = (movieId) => {
        return favorite.some(movie => movie.id === movieId)
    }

    return <MovieContext.Provider value = {{favorite, addToFavorite, deleteFromFavorite, isFavorite}}>
        {children}
    </MovieContext.Provider>
}