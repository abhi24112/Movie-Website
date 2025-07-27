import { useEffect, useState } from "react";
import { Search } from "./components/Search";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite.js";
import MovieInfo from "./components/MovieInfo.jsx";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [seletedMovie, setSelectedMovie] = useState(false);
  const [seletedMovieData, setSelectedMovieData] = useState({});
  const [movieTrailer, setMovieTrailer] = useState("");

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

  // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 1 second or for 700ms.
  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTION);
      if (!response.ok) {
        throw new Error("Failed to fetch movie");
      }

      const data = await response.json(); // data of movies list

      // console.log(data);

      if (!data || !data.results) {
        setErrorMessage(data.Error || "Failed to fetch movie");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      setErrorMessage("Error fetching movies please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch trending movies
  const loadTreandingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
      console.log(movies);
    } catch (error) {
      console.log(`Error importing Trending movies: ${error}`);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTreandingMovies();
  }, []);

  // Fetching movie Trailer
  const fetchMoviesVideo = async (movie) => {
    setSelectedMovie(true);
    setSelectedMovieData(movie)
    try {
      const endpoint = movie.id
        ? `https://api.themoviedb.org/3/movie/${movie.id}/videos`
        : console.log("Movie ID is required");

      const response = await fetch(endpoint, API_OPTION);
      if (!response.ok) {
        throw new Error("Failed to fetch movie video");
      }

      const data = await response.json(); // data of movies video

      const trailerList = data.results.find(
        (v) =>
          v.official === true && v.type === "Trailer" && v.site === "YouTube"
      );

      setMovieTrailer(trailerList);
    } catch (error) {
      console.log(`Error Fetching movie video: ${error}`);
    }
  };

  // close the movie info
  function close(){
    setSelectedMovie(false);
  }

  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="/public/hero.png" alt="Hero Banner" />
            <h1>
              Find <span className="text-gradient">Movies</span> You'll Enjoy
              Without the Hassle
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          {/* Trending movies */}
          {trendingMovies.length > 0 && (
            <section className="trending">
              <h2>Trending Movies</h2>

              <ul>
                {trendingMovies.map((movie, index) => (
                  <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt={movie.title} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="all-movies">
            <h2 className="mt-[40px]">All Movies</h2>

            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={() => fetchMoviesVideo(movie)}
                  />
                ))}
              </ul>
            )}
          </section>
          {seletedMovie && movieTrailer && <MovieInfo video={movieTrailer} data={seletedMovieData}  onClick={close} />}
        </div>
      </div>
    </main>
  );
}

export default App;
