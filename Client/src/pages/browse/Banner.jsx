import React from "react";
import Card from "../../components/Card";
import classes from "../../styles/UI/browse/Banner.module.css";
import { FaPlay } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

const Banner = ({
  randomBanner,
  fetchMovieDetailOrigin,
  setModal,
  setModalId,
  setMovieDetail,
}) => {
  // Film title
  let renderTitle;
  if (randomBanner?.name && randomBanner?.original_name) {
    renderTitle =
      randomBanner?.name === randomBanner?.original_name
        ? randomBanner?.name
        : `${randomBanner?.name} (${randomBanner?.original_name})`;
  } else {
    renderTitle =
      randomBanner?.title === randomBanner?.original_title
        ? randomBanner?.title
        : `${randomBanner?.title} (${randomBanner?.original_title})`;
  }
  return (
    <div className={classes.banner}>
      <img
        src={`https://image.tmdb.org/t/p/original/${randomBanner?.backdrop_path}`}
        alt=""
        className={classes.img}
      />
      <div className={classes.trailer_vignette}></div>
      <div className={classes.hero_vignette}></div>
      <Card>
        <div
          className={`${
            renderTitle?.length > 27
              ? classes.movieDetailLongTitle
              : classes.movieDetail
          }`}
        >
          {/* Title */}
          <div
            style={{
              fontSize: 50,
              fontWeight: "bold",
              marginBottom: "2rem",
            }}
          >
            {renderTitle}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 18,
              fontWeight: "lighter",
              marginBottom: "2rem",
            }}
          >
            {randomBanner?.overview?.length > 200
              ? randomBanner?.overview.substring(0, 200) + "..."
              : randomBanner?.overview}
          </div>
          {/* Button */}
          <div className={classes.btn}>
            <button>
              <FaPlay />
              Play
            </button>
            <button
              onClick={() => {
                setMovieDetail(randomBanner);
                setModalId(randomBanner?.id);
                setModal(true);
                fetchMovieDetailOrigin(randomBanner.id);
              }}
            >
              <IoMdInformationCircleOutline />
              Other Information
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Banner;
