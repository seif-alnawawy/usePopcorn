import AllMovies from "./AllMovies";
import WatchedMovies from "./WatchedMovies";
import NavBar from "./NavBar";
import { useState } from "react";
import ListBox from "./ListBox";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import Logo from "./Logo";
import Search from "./Search";
import NumResults from "./NumResults";
import Summary from "./Summary";
import MovieDetails from "./MovieDetails";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const { movies, isLoading, error } = useMovies(query);

  const [watchedMovies, setWatchedMovies] = useLocalStorageState(
    "watchedMovies",
    [],
  );

  function handleMovieSelect(movieId) {
    setSelectedMovieId((id) => (id === movieId ? null : movieId));
  }
  function handleMovieClose() {
    setSelectedMovieId(null);
  }

  function handleAddWatched(movie) {
    setWatchedMovies((watched) => [...watched, movie]);
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} onChange={(e) => setQuery(e.target.value)} />
        <NumResults moviesLength={movies.length} />
      </NavBar>

      <main className="main">
        <ListBox>
          {isLoading && <Loading />}
          {error ? (
            <ErrorMessage errMsg={error} />
          ) : (
            <AllMovies movies={movies} onMovieSelect={handleMovieSelect} />
          )}
        </ListBox>
        <ListBox>
          {selectedMovieId ? (
            <MovieDetails
              movieId={selectedMovieId}
              onMovieClose={handleMovieClose}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <Summary watched={watchedMovies} />
              <WatchedMovies watchedMovies={watchedMovies} />
            </>
          )}
        </ListBox>
      </main>
    </>
  );
}
