import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import classes from "../../styles/UI/search/Search.module.css";
import SearchForm from "./SearchForm";
import ResultList from "./ResultList";
import MovieDetail from "../browse/MovieDetail ";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Card from "../../components/Card";

const API_KEY = "9e2e17fa377f03bdb4685e6345b6896a";
const Search = ({ accessToken }) => {
  const [state, setState] = useState([]),
    [banner, setBanner] = useState([]),
    [searchState, setSearchState] = useState([]),
    [stateDetail, setStateDetail] = useState([]),
    [movieDetail, setMovieDetail] = useState([]),
    [modal, setModal] = useState(false),
    [modalId, setModalId] = useState(""),
    [inputValue, setInputValue] = useState(""),
    [query, setQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1),
    [movieListData, setMovieListData] = useState([]),
    [genreType, setGenreType] = useState(""),
    [language, setLanguage] = useState("all"),
    [mediaType, setMediaType] = useState("all"),
    [year, setYear] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  // For Banner
  const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  };

  const fetchMovieTrending = async (apiLink) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${requests[`${apiLink}`]}`
    );

    const data = await response.json();
    const results = data?.results;
    const randomBanner =
      results[Math.floor(Math.random() * results?.length - 1)];

    setIsLoading(false);
    setBanner(randomBanner);
    setState(results);
  };

  useEffect(() => {
    fetchMovieTrending("fetchTrending");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch serach by input, genre, language, page, year
  const fecthSearch = async () => {
    const response = await fetch(
      `https://movie-2a6b.onrender.com/api/movies/search?query=${inputValue}&include_adult=true&language=${language}&page=${currentPage}&genre=${genreType}&media=${mediaType}&year=${year}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    if (data?.message) {
      console.log(data?.message);
      if (data?.message === "Not found video")
        setSearchState(data?.paginatedData.result);
    } else {
      setSearchState(data?.paginatedData.result);
      setMovieListData(data?.paginatedData);
    }
  };
  useEffect(() => {
    fecthSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, genreType, mediaType, language, year]);

  // Movie Detail
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
    if (data.message) console.log(data.message);
    setStateDetail(data?.trailer);
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
        setStateDetail(data?.results[0]);
      } else {
        console.log(data?.status_message);
      }
    }
  };

  // Handle  Function
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== movieListData?.total_Pages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="">
      {/* Banner */}
      <NavBar />
      <div style={{ marginBottom: "55vh" }}>
        <div className={classes.banner}>
          <img
            src={`https://image.tmdb.org/t/p/original/${banner?.backdrop_path}`}
            alt=""
            className={classes.img}
          />
          <div className={classes.trailer_vignette}></div>
          <div className={classes.hero_vignette}></div>
        </div>

        {/* SearchForm */}
        <SearchForm
          fecthSearch={fecthSearch}
          setInputValue={setInputValue}
          inputValue={inputValue}
          setQuery={setQuery}
          setCurrentPage={setCurrentPage}
          setGenreType={setGenreType}
          setLanguage={setLanguage}
          setMediaType={setMediaType}
          setYear={setYear}
        />
      </div>

      {/* Film Results */}
      {isLoading ? (
        <Card>
          <div className="" style={{ paddingTop: 50 }}>
            <Skeleton count={8} />
          </div>
        </Card>
      ) : (
        <ResultList
          query={query}
          state={state}
          searchState={searchState}
          fetchMovieDetailOrigin={fetchMovieDetailOrigin}
          fetchMovieDetail={fetchMovieDetail}
          setModal={setModal}
          modal={modal}
          setStateDetail={setStateDetail}
          setMovieDetail={setMovieDetail}
          setModalId={setModalId}
          modalId={modalId}
          currentPage={currentPage}
          handlePagination={handlePagination}
          previousPage={previousPage}
          nextPage={nextPage}
          movieListData={movieListData}
          setCurrentPage={setCurrentPage}
          genreType={genreType}
          setGenreType={setGenreType}
          language={language}
          setLanguage={setLanguage}
          mediaType={mediaType}
          setMediaType={setMediaType}
          year={year}
          setYear={setYear}
        />
      )}

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
};

export default Search;
