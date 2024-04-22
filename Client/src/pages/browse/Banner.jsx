import React from "react";
import Card from "../../components/Card";
import classes from "../../styles/UI/browse/Banner.module.css";
import { FaPlay } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

const Banner = ({ randomBanner }) => {
  const renderTitle =
    randomBanner?.original_title === undefined
      ? randomBanner?.name
      : randomBanner?.original_title;
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
            renderTitle?.length > 40
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
              width: "900px",
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
            <button>
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
