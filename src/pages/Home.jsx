import React, { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'
import '../css/Home.css'
import { searchMovies, getPopularMovies } from '../services/api'

function Home() {

    const [searchInput, setSearchInput] = useState("")
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const handleSearch = async (e) => {
        e.preventDefault()
        console.log(!searchInput.trim());

        if (!searchInput.trim()) return
        if (loading) return

        setLoading(true)

        try {
            const moviesResult = await searchMovies(searchInput)
            setMovies(moviesResult)
            setError(null)
        } catch (error) {
            console.log(error);

            setError("Failed to load movies...")
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        const loadPpularmovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                console.log(popularMovies);

                setMovies(popularMovies)
            } catch (error) {
                console.log(error.message);
                setError("Failed to load moavies...")
            } finally {
                setLoading(false)
            }
        }
        loadPpularmovies()
    }, [])

    return (
        <div className='home'>

            <form onSubmit={handleSearch} className='search-form'>
                <input type="text" placeholder='Search for movies...' className='search-input' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                <button type='submit' className='search-button'>Search</button>
            </form>

            {error && <div className='error-message'>{error}</div>}

            {loading ? (
                <div className='loading'>Loading...</div>
            ) : (
                <div className='movies-grid'>
                    {
                        movies.map((movie) =>
                            movie.title.toLowerCase().startsWith(searchInput) &&
                            (
                                <MovieCard movie={movie} key={movie.id} />
                            )
                        )
                    }
                </div>
            )}

        </div>
    )
}

export default Home
