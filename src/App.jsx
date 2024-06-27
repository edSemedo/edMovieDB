import { useEffect, useState } from "react";
import SearchIcon from '../src/search.svg';
import MovieCard from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (titles) => {
    const API_KEY = import.meta.env.VITE_APP_API_KEY;
    const response = await fetch(`http://www.omdbapi.com?apikey=${API_KEY}&s=${titles}`);
    const data = await response.json();
    
    setMovies(data.Search);
  }

  useEffect(() => {
    // fetch the movies
    searchMovies('spiderman');
  },[])

  return (
    <div className="app">
      <h1>Movie Gourmet</h1>
      <div className="search">
        <input 
          placeholder="Procurar por Filmes" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <img 
          src={SearchIcon} 
          alt="search" 
          onClick={() => searchMovies(searchTerm)} 
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie1={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Não há Filmes para mostrar</h2>
        </div>
      )}
    </div>
  )
}

export default App;
