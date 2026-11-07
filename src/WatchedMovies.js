import WatchedMovie from "./WatchedMovie";

export default function WatchedMovies({ watchedMovies }) {
  return (
    <ul className="list">
      {watchedMovies.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
