import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import Origin from "./Origin";
import CarouselMovieType from "./CarouselMovieType";
import MovieDetail from "./MovieDetail ";

const API_KEY = process.env.REACT_APP_API_KEY;

function Browse({ authAxios, accessToken }) {
  const [banner, setBanner] = useState([]);
  const [stateDetail, setStateDetail] = useState([]);
  const [movieDetail, setMovieDetail] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalId, setModalId] = useState("");

  const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
  };

  // For Banner
  const fetchMovie = async (apiLink) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${requests[`${apiLink}`]}`
    );

    const data = await response.json();
    const results = data?.results;
    const randomBanner =
      results[Math.floor(Math.random() * results?.length - 1)];

    setBanner(randomBanner);
  };

  useEffect(() => {
    fetchMovie("fetchTrending");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // For Top-rated, Trending and Genre Movie Detail
  const fetchMovieDetail = async (film_id) => {
    const res = await fetch(
      `https://movie-2a6b.onrender.com/api/movies/video`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ film_id }),
      }
    );

    const data = await res.json();
    if (data.message) {
      console.log(data.message);
    } else setStateDetail(data?.trailer);
  };

  // Fetch Origin Detail
  const fetchMovieDetailOrigin = async (film_id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${film_id}/videos?api_key=${API_KEY}
          `
    );

    const data = await response.json();

    if (data.status_message) {
      console.log(data?.status_message);
    } else {
      if (data?.results.length > 0) {
        const { results } = data;
        const foundMovie = results
          .filter((film) => film.official === true)
          ?.filter((film) => (film.site = "YouTube"));

        const trailerList =
          foundMovie?.filter((film) => film.type === "Trailer") ||
          foundMovie?.filter((film) => film.type === "Featurette") ||
          foundMovie?.filter((film) => film.type === "Teaser");

        let trailer;
        if (trailerList?.length > 1) {
          trailer = trailerList.sort((soonerReleased, lastedReleased) => {
            return lastedReleased?.published_at - soonerReleased?.published_at;
          })[0];
        } else trailer = trailerList[0];

        setStateDetail(trailer);
      } else {
        console.log(data?.status_message);
      }
    }
  };

  return (
    <div className="">
      <div style={{ marginBottom: "55vh" }}>
        <Banner randomBanner={banner} />
      </div>

      {/* Movie Carousel */}
      <div style={{ display: "flex", flexDirection: "column", gap: 70 }}>
        {/* Origin */}
        <Origin
          requests={requests}
          imgPath={"poster"}
          fetchMovieDetailOrigin={fetchMovieDetailOrigin}
          setModal={setModal}
          modal={modal}
          setStateDetail={setStateDetail}
          setMovieDetail={setMovieDetail}
          setModalId={setModalId}
          modalId={modalId}
        />

        {/* Trending */}
        <CarouselMovieType
          authAxios={authAxios}
          request={"trending"}
          title={"Trending"}
          fetchMovieDetail={fetchMovieDetail}
          setModal={setModal}
          modal={modal}
          setStateDetail={setStateDetail}
          setMovieDetail={setMovieDetail}
          setModalId={setModalId}
          modalId={modalId}
        />

        {/* Top Rated */}
        <CarouselMovieType
          authAxios={authAxios}
          request={"top-rate"}
          title={"Top Rated"}
          fetchMovieDetail={fetchMovieDetail}
          setModal={setModal}
          modal={modal}
          setStateDetail={setStateDetail}
          setMovieDetail={setMovieDetail}
          setModalId={setModalId}
          modalId={modalId}
        />

        {/* Chose Genre Movies */}
        <CarouselMovieType
          authAxios={authAxios}
          request={"discover"}
          fetchMovieDetail={fetchMovieDetail}
          setModal={setModal}
          modal={modal}
          setStateDetail={setStateDetail}
          setMovieDetail={setMovieDetail}
          setModalId={setModalId}
          modalId={modalId}
        />
      </div>

      {/* Movie Detail Modal */}
      <div className="">
        <MovieDetail
          data={stateDetail}
          movieDetail={movieDetail}
          setModal={setModal}
          setStateDetail={setStateDetail}
          modal={modal}
          setModalId={setModalId}
        />
      </div>
    </div>
  );
}

export default Browse;
