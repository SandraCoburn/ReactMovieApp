import React from "react";
// import components for moviethumb link
import Navigation from "./elements/Navigation";
import Actors from "./elements/Actors";
import MovieInfo from "./elements/MovieInfo";
import MovieInfoBar from "./elements/MovieInfoBar";
import Grid from "./elements/Grid";
import Spinner from "./elements/Spinner";

//import movie component custom hook
import { useMovieFetch } from "./hooks/useMovieFetch";

const Movie = ({ movieId }) => {
  const [movie, loading, error] = useMovieFetch(movieId);
  console.log(movie);

  if (error) return <div>Something went wrong...</div>;
  if (loading) return <Spinner />;

  return (
    <>
      <Navigation movie={movie.original_title} />
      <MovieInfo movie={movie} />
      <MovieInfoBar
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
      />
      <Grid header="Actors">
        {movie.actors.map(actor => (
          <Actors key={actor.credit_id} actor={actor} />
        ))}
      </Grid>
    </>
  );
};

export default Movie;
