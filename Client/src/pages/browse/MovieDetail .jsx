import React from "react";
import classes from "../../styles/UI/browse/MovieDetail.module.css";
import Card from "../../components/Card";
import YouTube from "react-youtube";
import { PiCaretDoubleDownDuotone } from "react-icons/pi";

const MovieDetail = ({
  data,
  movieDetail,
  setModal,
  modal,
  setStateDetail,
  setModalId,
}) => {
  // Youtube Video size option
  const opts = {
    height: "300",
    width: "575",
    playerVars: {
      autoplay: 1,
    },
  };

  // Film title
  let renderTitle;
  if (movieDetail?.name && movieDetail?.original_name) {
    renderTitle =
      movieDetail?.name === movieDetail?.original_name
        ? movieDetail?.name
        : `${movieDetail?.name} (${movieDetail?.original_name})`;
  } else {
    renderTitle =
      movieDetail?.title === movieDetail?.original_title
        ? movieDetail?.title
        : `${movieDetail?.title} (${movieDetail?.original_title})`;
  }
  return (
    <div
      className={`${classes.detail} ${!modal ? classes.close : classes.open}`}
    >
      <Card>
        {/* Close Modal Button */}
        <div
          className={classes.closeModal}
          onClick={() => {
            setModal(false);
            setStateDetail([]);
            setModalId("");
          }}
        >
          <PiCaretDoubleDownDuotone />
        </div>

        {/* Movie Information  */}
        <div className={classes.detailContent}>
          <div className="">
            {/* Title */}
            <div className={classes.title}>{renderTitle}</div>

            {/* Date */}
            <div
              style={{
                fontWeight: "500",
                fontSize: "1rem",
                paddingBottom: "0.2rem",
              }}
            >
              Release Date:{" "}
              {movieDetail?.first_air_date === undefined
                ? movieDetail?.release_date
                : movieDetail?.first_air_date}
            </div>

            {/* Vote */}
            <div
              style={{
                fontWeight: "500",
                fontSize: "1rem",
                paddingBottom: "1.5rem",
              }}
            >
              Audience Vote: {movieDetail.vote_average}/10
            </div>

            {/* Overview */}
            <div
              style={{
                fontWeight: "400",
                fontSize: "0.9rem",
                textAlign: "justify",
              }}
            >
              {movieDetail.overview}
            </div>
          </div>

          {/* Youtube trailer */}
          <div className="">
            {!data?.key ? (
              <>
                <img
                  src={
                    movieDetail?.backdrop_path === null
                      ? "https://yoast.com/app/uploads/2015/08/404_error_checking_FI.png"
                      : `https://image.tmdb.org/t/p/original/${movieDetail?.backdrop_path}`
                  }
                  alt={
                    movieDetail?.backdrop_path === null
                      ? "Image not Found"
                      : renderTitle
                  }
                  style={{
                    height: "320px",
                    width: "567px",
                  }}
                />
              </>
            ) : (
              <YouTube videoId={data?.key} opts={opts} />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MovieDetail;
