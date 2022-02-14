import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react'
import './App.css'
import { Filter } from './components/Filter';
import { Movie } from './components/Movie';

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

  const fetchPopular = async () => {

    const data = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=64d4faa20ed24e7fad4cc9d3cf9f97f8&language=en-US&page=1');
    const movies = await data.json();
    setPopular(movies.results);
    setFiltered(movies.results);
  }

  useEffect(() => {
    fetchPopular();
  }, []);

  return (
    <div className="App">
      <Filter popular={popular} setFiltered={setFiltered} activeGenre={activeGenre} setActiveGenre={setActiveGenre} />
      <AnimatePresence>
        <motion.div layout className="popular-movies">
          {filtered.map(movie => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App
