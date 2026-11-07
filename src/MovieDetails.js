import { useEffect, useState } from "react";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { useKey } from "./hooks/useKey";

const API_KEY = "ad1a1bdc";

export default function MovieDetails({ movieId, onMovieClose, onAddWatched }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movie, setMovie] = useState({});
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    ReleasedDate: realeasedDate,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newMovie = {
      imdbID: movieId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
    };

    onAddWatched(newMovie);
    onMovieClose();
  }

  useKey("Escape", onMovieClose);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error("Failed to fetch movie data");
        }

        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getMovieDetails();
  }, [movieId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie| ${title}`;

    return () => (document.title = "usePopcorn");
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage errMsg={error} />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onMovieClose}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {realeasedDate} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <button className="btn-add" onClick={handleAdd}>
                + Add to list
              </button>
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
