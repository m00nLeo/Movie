import React, { useState } from "react";
import CarouselMovie from "../../components/CarouselMovie";
import Card from "../../components/Card";
import LinkImage from "../../components/Movie/LinkImage";
import classes from "../../styles/UI/search/ResultList.module.css";

const ResultList = ({
  state,
  searchState,
  query,
  fetchMovieDetailOrigin,
  fetchMovieDetail,
  setModal,
  modal,
  setMovieDetail,
  modalId,
  setModalId,
  currentPage,
  handlePagination,
  previousPage,
  nextPage,
  movieListData,
  setCurrentPage,
  genreType,
  setGenreType,
  language,
  setLanguage,
  mediaType,
  setMediaType,
  year,
  setYear,
}) => {
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
  console.log(genreType);
  const mediaTypeOption = ["All", "Movie", "TV", "Person"];

  const languageOption = ["all", "en", "ja", "ko"];

  // Input Year function
  const [tempYear, setTempYear] = useState(0);

  const handleKeyDown = (event) => {
    if (event?.key === "Enter") {
      setYear(tempYear);
    }
  };
  return (
    <div className={classes.searchResults} style={{ color: "white" }}>
      {/* Recomended Title */}
      <Card>
        <div
          style={{
            color: "white",
            fontSize: "1.3rem",
            fontWeight: "bold",
            marginBottom: "12vh",
          }}
        >
          Recommemded&nbsp;
          {searchState?.length <= 0 ? (
            <></>
          ) : (
            <span>({searchState?.length})</span>
          )}
        </div>
      </Card>

      {/* Search Results */}
      <div style={{ transform: "translate(0, -35%)" }}>
        {query === "" ? (
          <div className="" style={{ height: "300px" }}>
            {/* Dont input any query */}
            <CarouselMovie>
              {state.map((data) => (
                <LinkImage
                  data={data}
                  key={data?.id}
                  imgPath={"backdrop"}
                  setModal={setModal}
                  modal={modal}
                  setMovieDetail={setMovieDetail}
                  fetchMovieDetail={fetchMovieDetailOrigin}
                  setModalId={setModalId}
                  modalId={modalId}
                />
              ))}
            </CarouselMovie>
          </div>
        ) : (
          <>
            {searchState?.length <= 0 ? (
              <>
                {/* If it couldn't found any film that meet the criteria */}
                <div
                  className=""
                  style={{
                    width: "100vw",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 20,
                    maxWidth: "1380px",
                    transform: "translate(0%, 70%)",
                  }}
                >
                  {/* Genre Option */}
                  <div className={classes.select}>
                    <select
                      onChange={(e) => {
                        setGenreType(e.target.value);
                        setCurrentPage(1);
                      }}
                      defaultValue={genreType === "" ? "start" : genreType}
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

                  {/* Language Option */}
                  <div className={classes.select}>
                    <select
                      onChange={(e) => {
                        setLanguage(e.target.value);
                        setCurrentPage(1);
                      }}
                      defaultValue={language}
                      className={classes.selectedType}
                    >
                      {languageOption?.map((language) => (
                        <option
                          value={language}
                          key={language}
                          className={classes.option}
                        >
                          {language === "all"
                            ? "All"
                            : language === "en"
                            ? "English"
                            : language === "ja"
                            ? "Japanese"
                            : "Korean"}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Media Option */}
                  <div className={classes.select}>
                    <select
                      onChange={(e) => {
                        setMediaType(e.target.value);
                        setCurrentPage(1);
                      }}
                      defaultValue={mediaType}
                      className={classes.selectedType}
                    >
                      {mediaTypeOption?.map((media) => (
                        <option
                          value={media}
                          key={media}
                          className={classes.option}
                        >
                          {media}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Choose Movie Year Option */}
                  <div className="">
                    <input
                      type="number"
                      name="year"
                      id="year"
                      placeholder={year}
                      step="1"
                      min={1900}
                      max={new Date().getFullYear()}
                      onChange={(e) => {
                        e.preventDefault();
                        setTempYear(e.target.value);
                      }}
                      className={classes.input}
                      onKeyDown={handleKeyDown}
                    />
                  </div>

                  {/* Pagination */}
                  <div className={classes.pagination}>
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
                </div>

                {/* Not Found Message */}
                <div
                  style={{
                    textAlign: "center",
                    width: "100%",
                    padding: "6rem 24rem",
                    fontSize: "1.8rem",
                  }}
                >
                  {/* Not found */}
                  Sorry, we currently don't have the "{query}" movie available!
                  <br />
                  You might want to try another movie 👉👈
                  <br />
                  Or just change/clear the current film filter
                </div>
              </>
            ) : (
              <>
                {/* Search Parameters */}
                <div className={classes.searchState}>
                  {/* Genre Option */}
                  <div className={classes.select}>
                    <select
                      onChange={(e) => {
                        setGenreType(e.target.value);
                        setCurrentPage(1);
                      }}
                      defaultValue={"start"}
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

                  {/* Language Option */}
                  <div className={classes.select}>
                    <select
                      onChange={(e) => {
                        setLanguage(e.target.value);
                        setCurrentPage(1);
                      }}
                      defaultValue="start"
                      className={classes.selectedType}
                    >
                      <option value="start" disabled>
                        Choose movie language
                      </option>
                      {languageOption?.map((language) => (
                        <option
                          value={language}
                          key={language}
                          className={classes.option}
                        >
                          {language === "all"
                            ? "All"
                            : language === "en"
                            ? "English"
                            : language === "ja"
                            ? "Japanese"
                            : "Korean"}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Media Option */}
                  <div className={classes.select}>
                    <select
                      onChange={(e) => {
                        setMediaType(e.target.value);
                        setCurrentPage(1);
                      }}
                      defaultValue="all"
                      className={classes.selectedType}
                    >
                      {mediaTypeOption?.map((media) => (
                        <option
                          value={media}
                          key={media}
                          className={classes.option}
                        >
                          {media}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Choose Movie Year Option */}
                  <div className="">
                    <input
                      type="number"
                      name="year"
                      id="year"
                      placeholder="Year released"
                      step="1"
                      min={1900}
                      max={new Date().getFullYear()}
                      onChange={(e) => {
                        e.preventDefault();
                        setTempYear(e.target.value);
                      }}
                      className={classes.input}
                      onKeyDown={handleKeyDown}
                    />
                  </div>

                  {/* Pagination */}
                  <div className={classes.pagination}>
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
                </div>

                {/* Film Search Results */}
                <Card>
                  <div className={classes.resultsList}>
                    {searchState?.map((data, i) => (
                      <LinkImage
                        data={data}
                        key={data?.id * i}
                        imgPath={"poster"}
                        setModal={setModal}
                        modal={modal}
                        setMovieDetail={setMovieDetail}
                        fetchMovieDetail={fetchMovieDetail}
                        setModalId={setModalId}
                        modalId={modalId}
                      />
                    ))}
                  </div>
                </Card>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ResultList;
