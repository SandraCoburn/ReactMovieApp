import React, { useState } from "react";
import {
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POPULAR_BASE_URL,
  SEARCH_BASE_URL
} from "../config";

//import components
import Grid from "./elements/Grid";
import HeroImage from "./elements/HeroImage";
import LoadMoreBtn from "./elements/LoadMoreBtn";
import MovieThumb from "./elements/MovieThumb";
import SearchBar from "./elements/SearchBar";
import Spinner from "./elements/Spinner";

// we import our custom hook here:
import { useHomeFetch } from "./hooks/useHomeFetch";
//if there is no image it will show another pic:
import NoImage from "./images/no_image.jpg";

const Home = () => {
  //This will load  the moviethumb with pics:
  const [searchTerm, setSearchTerm] = useState("");
  const [{ state, loading, error }, fetchMovies] = useHomeFetch(searchTerm);
  console.log(state);

  //callback for the search movie component:
  const searchMovies = search => {
    const endpoint = search ? SEARCH_BASE_URL + search : POPULAR_BASE_URL;
    setSearchTerm(search);
    fetchMovies(endpoint);
  };

  // callback for onclick button:
  const loadMoreMovies = () => {
    const searchEndPoint = `${SEARCH_BASE_URL}${searchTerm}&page=${state.currentPage +
      1}`;
    const popularEndPoint = `${POPULAR_BASE_URL}&page=${state.currentPage + 1}`;
    const ednpoint = searchTerm ? searchEndPoint : popularEndPoint;

    fetchMovies(ednpoint);
  };

  if (error) return <div>Something went wrong</div>;
  if (!state.movies[0]) return <Spinner />;

  return (
    <>
      {!searchTerm && (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`}
          title={state.heroImage.original_title}
          text={state.heroImage.overview}
        />
      )}
      <SearchBar callback={searchMovies} />
      <Grid header={searchTerm ? "Search Result" : "Popular Movies"}>
        {state.movies.map(movie => (
          <MovieThumb
            key={movie.id}
            clickable
            image={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.poster_path}`
                : NoImage
            }
            movieId={movie.id}
            movieName={movie.original_title}
          />
        ))}
      </Grid>
      {loading && <Spinner />}
      {state.currentPage < state.totalPages && !loading && (
        <LoadMoreBtn text="Load More" callback={loadMoreMovies} />
      )}
    </>
  );
};

export default Home;
