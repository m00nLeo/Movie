import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import CarouselMovie from "../../components/CarouselMovie";
import LinkImage from "../../components/Movie/LinkImage";
import classes from "../../styles/UI/browse/CarouselMovieType.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CarouselMovieType = ({
  authAxios,
  request,
  title,
  setStateDetail,
  fetchMovieDetail,
  setModal,
  setMovieDetail,
  modalId,
  setModalId,
}) => {
  const [movieData, setMoiveData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [movieListData, setMovieListData] = useState([]);
  const genre = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];
  const [option, setOption] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovie = async (request) => {
    if (request === "discover") {
      if (option !== "") {
        const response = await authAxios.get(
          `/api/movies/${request}?page=${currentPage}&genre=${option}`
        );
        const { data } = await response;
        if (data.message) console.log(data.message);
        setIsLoading(false);
        setMovieListData(data);
        setMoiveData(data?.paginatedData.result);
      }
    } else {
      const response = await authAxios.get(
        `/api/movies/${request}?page=${currentPage}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST",
          },
        }
      );

      const { data } = await response;
      if (data.message) console.log(data.message);
      setIsLoading(false);
      setMovieListData(data);
      setMoiveData(data?.result);
    }
  };

  useEffect(() => {
    fetchMovie(request);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, option]);

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
    <div className={isLoading ? classes.isLoading: classes.main}>
      <Card>
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Title */}
          <p
            style={{
              color: "white",
              borderLeft: "0.2rem solid firebrick",
              paddingLeft: "0.5rem",
              fontSize: "1.3rem",
              fontWeight: "bold",
            }}
          >
            {title ? (
              title
            ) : (
              <span>
                Movie type{" "}
                <span
                  style={{
                    textTransform: "capitalize",
                    color: "wheat",
                  }}
                  className={option !== "" ? classes.main_box : ""}
                >
                  {option}
                  {option !== "" ? (
                    <>
                      <span className={`${classes.bar} ${classes.top}`}></span>
                      <span
                        className={`${classes.bar} ${classes.right}`}
                      ></span>
                      <span
                        className={`${classes.bar} ${classes.bottom}`}
                      ></span>
                      <span className={`${classes.bar} ${classes.left}`}></span>
                    </>
                  ) : (
                    <></>
                  )}
                </span>
              </span>
            )}
          </p>

          {/* Select Genre */}
          {request === "discover" ? (
            <div className={classes.select}>
              <select
                onChange={(e) => {
                  setOption(e.target.value);
                  setCurrentPage(1);
                }}
                defaultValue="start"
                className={classes.selectedType}
              >
                <option value="start" disabled>
                  Choose movie type
                </option>
                {genre?.map((genreType) => (
                  <option
                    value={genreType.name}
                    key={genreType.id}
                    className={classes.option}
                  >
                    {genreType.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <></>
          )}

          {/* Pagination */}
          {request !== "discover" ? (
            <div style={{ display: "flex" }} className={classes.pagination}>
              <button onClick={previousPage} disabled={currentPage === 1}>
                &laquo;
              </button>

              {currentPage === 1 ? (
                <></>
              ) : (
                <button onClick={previousPage}>{currentPage - 1}</button>
              )}

              <button
                onClick={() => handlePagination(currentPage)}
                disabled
                className={classes.activeButton}
              >
                {currentPage}
              </button>

              {currentPage >= movieListData?.total_Pages ? (
                <></>
              ) : (
                <button onClick={nextPage}>{currentPage + 1}</button>
              )}
              <button
                onClick={nextPage}
                disabled={currentPage >= movieListData?.total_Pages}
              >
                &raquo;
              </button>
            </div>
          ) : option === "" ? (
            <></>
          ) : (
            <div style={{ display: "flex" }} className={classes.pagination}>
              <button onClick={previousPage} disabled={currentPage === 1}>
                &laquo;
              </button>

              {currentPage === 1 ? (
                <></>
              ) : (
                <button onClick={previousPage}>{currentPage - 1}</button>
              )}

              <button
                onClick={() => handlePagination(currentPage)}
                disabled
                className={classes.activeButton}
              >
                {currentPage}
              </button>

              {currentPage >= movieListData.paginatedData?.total_Pages ? (
                <></>
              ) : (
                <button onClick={nextPage}>{currentPage + 1}</button>
              )}
              <button
                onClick={nextPage}
                disabled={
                  currentPage >= movieListData.paginatedData?.total_Pages
                }
              >
                &raquo;
              </button>
            </div>
          )}
        </div>
      </Card>

      {/* Movie lists / Carousel */}
      <div style={{ transform: "translate(0, -35%)", height: 10 }}>
        {request !== "discover" ? (
          isLoading ? (
            <Card>
              <Skeleton count={5} />
            </Card>
          ) : (
            <CarouselMovie fluid={false}>
              {movieData?.map((data) => (
                <LinkImage
                  data={data}
                  key={data?.id}
                  imgPath={"backdrop"}
                  setModal={setModal}
                  setMovieDetail={setMovieDetail}
                  setStateDetail={setStateDetail}
                  fetchMovieDetail={fetchMovieDetail}
                  setModalId={setModalId}
                  modalId={modalId}
                />
              ))}
            </CarouselMovie>
          )
        ) : option === "" ? (
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#fff",
              fontSize: 24,
              padding: 50,
            }}
          >
            Please, Choose your favourite movie genre{" "}
            <span role="img" aria-label="FilmGenre">
              🍿
            </span>
          </p>
        ) : (
          <CarouselMovie fluid={false}>
            {movieData?.map((data) => (
              <LinkImage
                data={data}
                key={data?.id}
                imgPath={"backdrop"}
                setModal={setModal}
                setMovieDetail={setMovieDetail}
                setStateDetail={setStateDetail}
                fetchMovieDetail={fetchMovieDetail}
                setModalId={setModalId}
                modalId={modalId}
              />
            ))}
          </CarouselMovie>
        )}
      </div>
    </div>
  );
};

export default CarouselMovieType;
