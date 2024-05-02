const Movie = require("../models/movie");
const Genre = require("../models/genre");
const Video = require("../models/video");

const { paginate } = require("../utils/Paging");
const { query } = require("express");

exports.getTrendingMoive = (req, res, next) => {
  const currentPage = parseInt(req.query.page) || 1;
  const trendingMovies = Movie.all().sort((lowTrendMovie, highTrendMovie) => {
    return highTrendMovie?.popularity - lowTrendMovie?.popularity;
  });
  const paginatedData = paginate(trendingMovies, currentPage);

  if (paginatedData) res.status(200).json(paginatedData);
};

exports.getTopRatedMoive = (req, res, next) => {
  const currentPage = parseInt(req.query.page) || 1;
  const ratedMovies = Movie.all().sort((lowRatedMovie, highRatedMovie) => {
    return highRatedMovie?.vote_average - lowRatedMovie?.vote_average;
  });
  const paginatedData = paginate(ratedMovies, currentPage);

  if (paginatedData) res.status(200).json(paginatedData);
};

exports.getGenre = (req, res, next) => {
  const currentPage = parseInt(req.query.page) || 20;
  const selectedGenre = req.query.genre;
  const genre = Genre.all();
  const selectedGenreId = genre.find((gen) => gen.name === selectedGenre)?.id;
  const genreType = Movie.all().filter((movie) =>
    movie.genre_ids.some((e) => e === selectedGenreId)
  );

  const paginatedData = paginate(genreType, currentPage, selectedGenreId);

  if (selectedGenre !== "") {
    if (paginatedData && selectedGenreId) {
      res.status(200).json({ paginatedData, genre });
    }
  } else {
    if (selectedGenre === "") {
      res.status(400).json({ message: "Not found gerne parram" });
    } else if (!selectedGenreId) {
      res.status(400).json({ message: "Not found that gerne id" });
    }
  }
};

exports.postTrailerMoive = (req, res, next) => {
  const filmId = req.body.film_id;

  const foundMovie = Video.all()
    .find((film) => film.id === filmId)
    ?.videos.filter((film) => film.official === true)
    ?.filter((film) => (film.site = "YouTube"));

  if (!filmId) {
    res.status(400).json({ message: "Not found film_id parram" });
  }

  if (!foundMovie) {
    res.status(404).json({ message: "Not found video" });
  } else {
    const trailerList =
      foundMovie?.filter((film) => film.type === "Trailer") ||
      foundMovie?.filter((film) => film.type === "Featurette") ||
      foundMovie?.filter((film) => film.type === "Teaser") ||
      foundMovie?.filter((film) => film.type === "Clip");

    let trailer;
    if (trailerList?.length > 1) {
      trailer = trailerList.sort((soonerReleased, lastedReleased) => {
        return lastedReleased?.published_at - soonerReleased?.published_at;
      })[0];
    } else trailer = trailerList[0];
    res.status(200).json({ trailer });
  }
};

exports.postSearch = (req, res, next) => {
  const currentPage = parseInt(req.query.page) || 1;
  const selectedGenre = req.query.genre;
  const selectedLang = req.query.language;
  const selectedMedia = req.query.media?.toLowerCase();
  const selectedYear = Number(req.query.year);

  const inputValue = req.query.query;
  const regex = new RegExp(
    "\\b(" + inputValue.split("/n").join("|") + ")\\b",
    "gi"
  );
  const genre = Genre.all();
  const selectedGenreId = genre.find((gen) => gen.name === selectedGenre)?.id;

  const foundFilmTitle =
    Movie.all().filter((film) =>
      regex.test(film?.name.toLowerCase().split(" "))
    ) || [];

  const foundFilmOverview =
    Movie.all().filter((film) =>
      regex.test(film?.overview.toLowerCase().split(" "))
    ) || [];

  const doppelganger = foundFilmOverview.filter((movie) =>
    foundFilmTitle.find((e) => e.id === movie.id)
  );
  for (let i = 0; i < foundFilmOverview.length; i++) {
    for (let j = 0; j < doppelganger.length; j++) {
      if (foundFilmOverview[i] === doppelganger[j]) {
        foundFilmOverview.splice(i, 1);
      }
    }
  }

  let titleResults;
  let overviewResults;
  let foundFilms;

  if (selectedGenre !== "") {
    titleResults = foundFilmTitle.filter((movie) =>
      movie.genre_ids.some((e) => e === selectedGenreId)
    );

    overviewResults = foundFilmOverview.filter((movie) =>
      movie.genre_ids.some((e) => e === selectedGenreId)
    );

    if (selectedLang !== "all") {
      titleResults = titleResults?.filter(
        (movie) => movie.original_language === selectedLang
      );
      overviewResults = overviewResults?.filter(
        (movie) => movie.original_language === selectedLang
      );

      if (selectedMedia !== "all") {
        titleResults = titleResults?.filter(
          (movie) => movie.media_type === selectedMedia
        );
        overviewResults = overviewResults?.filter(
          (movie) => movie.media_type === selectedMedia
        );

        if (selectedYear !== 0 && `${selectedYear}`.length >= 4) {
          titleResults = titleResults?.filter(
            (movie) =>
              new Date(
                movie?.first_air_date === undefined
                  ? movie?.release_date
                  : movie?.first_air_date
              ).getFullYear() === selectedYear
          );
          overviewResults = overviewResults?.filter(
            (movie) =>
              new Date(
                movie?.first_air_date === undefined
                  ? movie?.release_date
                  : movie?.first_air_date
              ).getFullYear() === selectedYear
          );
        }
      }
    }
  }

  if (selectedLang !== "all") {
    titleResults = (titleResults ? titleResults : foundFilmTitle)?.filter(
      (movie) => movie.original_language === selectedLang
    );

    overviewResults = (
      overviewResults ? overviewResults : foundFilmOverview
    )?.filter((movie) => movie.original_language === selectedLang);
  }

  if (selectedMedia !== "all") {
    titleResults = (titleResults ? titleResults : foundFilmTitle)?.filter(
      (movie) => movie.media_type === selectedMedia
    );

    overviewResults = (
      overviewResults ? overviewResults : foundFilmOverview
    )?.filter((movie) => movie.media_type === selectedMedia);
  }

  if (selectedYear !== 0 && `${selectedYear}`.length >= 4) {
    titleResults = (titleResults ? titleResults : foundFilmTitle)?.filter(
      (movie) =>
        new Date(
          movie?.first_air_date === undefined
            ? movie?.release_date
            : movie?.first_air_date
        ).getFullYear() === selectedYear
    );

    overviewResults = (
      overviewResults ? overviewResults : foundFilmOverview
    )?.filter(
      (movie) =>
        new Date(
          movie?.first_air_date === undefined
            ? movie?.release_date
            : movie?.first_air_date
        ).getFullYear() === selectedYear
    );
  }
  if (titleResults || overviewResults) {
    if (titleResults?.length >= 1 || overviewResults?.length >= 1) {
      foundFilms = [...titleResults, ...overviewResults];
    } else {
      foundFilms = [];
    }
  } else {
    foundFilms = [...foundFilmTitle, ...foundFilmOverview];
  }

  const paginatedData = paginate(foundFilms, currentPage);

  if (inputValue) {
    if (foundFilms?.length >= 1) {
      res.status(200).json({ paginatedData });
    } else {
      res.status(200).json({ paginatedData, message: "Not found video" });
    }
  } else {
    res.status(400).json({ message: "Not found keyword parram" });
  }
};
