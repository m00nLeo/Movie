import React from "react";
import classes from "./LinkImage.module.css";
import { FaPlay, FaPlus } from "react-icons/fa";
import { BsHandThumbsUp } from "react-icons/bs";

const LinkImage = ({
  data,
  imgPath,
  fetchMovieDetail,
  setModal,
  setMovieDetail,
  setStateDetail,
  modalId,
  setModalId,
}) => {
  const imgPosterStyle = { width: "260px", height: "310px" };
  const imgBackdropStyle = {
    width: "265px",
    height: "150px",
  };
  const styles = imgPath === "backdrop" ? imgBackdropStyle : imgPosterStyle;

  let image;
  if (data.backdrop_path === null) {
    image = `https://image.tmdb.org/t/p/original/${data.poster_path}`;
  } else {
    image =
      imgPath === "poster"
        ? `https://image.tmdb.org/t/p/original/${data.poster_path}`
        : `https://image.tmdb.org/t/p/original/${data.backdrop_path}`;
  }

  const releasedDate = new Date(
    data?.first_air_date === undefined
      ? data?.release_date
      : data?.first_air_date
  );
  const releasedYear = releasedDate?.getFullYear();
  const renderTitle = data?.name
    ? data?.name
    : data?.original_name
    ? data?.original_name
    : data?.title
    ? data?.title
    : data?.original_title;

  const handleOpenMovieDetail = () => {
    if (modalId === "") {
      fetchMovieDetail(data?.id);
      setMovieDetail(data);
      setModal(true);
      setModalId(data?.id);
    } else {
      if (modalId === data.id) {
        setModal(false);
        setMovieDetail([]);
        setStateDetail([]);
        setModalId("");
      } else {
        fetchMovieDetail(data.id);
        setMovieDetail(data);
        setModalId(data?.id);
        setModal(true);
      }
    }
  };

  return (
    <React.Fragment key={data.id}>
      <div className={classes.imgBox} onClick={() => handleOpenMovieDetail()}>
        <div className={classes.imgFront}>
          <img src={image} alt={data.name} style={styles} />
        </div>

        <div className={classes.imgBack}>
          <img
            src={`${
              data.backdrop_path === null
                ? `https://image.tmdb.org/t/p/original/${data.poster_path}`
                : `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
            }`}
            alt={data.name}
            style={{ width: "265px", height: "150px", position: "relative" }}
          />
          <div className={classes.title}>
            {renderTitle?.length > 30
              ? renderTitle.substring(0, 30) + "..."
              : renderTitle}
          </div>
          <div style={{ padding: "0.8rem 0.75rem" }}>
            <div style={{ display: "flex", gap: 10, marginBottom: "0.7rem" }}>
              <button
                className={`${classes.movieIconPlay} ${classes.movieIcon}`}
              >
                <FaPlay />
              </button>
              <div className={`${classes.movieIconOther} ${classes.movieIcon}`}>
                <FaPlus />
              </div>
              <div className={`${classes.movieIconOther} ${classes.movieIcon}`}>
                <BsHandThumbsUp />
              </div>
            </div>
            <div className="" style={{ color: "white" }}>
              {/* Year */}
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                Released Year:
                <span className={classes.releasedYear}>{releasedYear}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LinkImage;
