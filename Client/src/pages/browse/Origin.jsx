import React, { useEffect, useState } from "react";
import CarouselMovie from "../../components/CarouselMovie";
import LinkImage from "../../components/Movie/LinkImage";

const Origin = ({
  requests,
  imgPath,
  fetchMovieDetailOrigin,
  setModal,
  modal,
  setMovieDetail,
  setStateDetail,
  modalId,
  setModalId,
}) => {
  const [state, setState] = useState([]);

  const fetchMovie = async (apiLink) => {
    const response = await fetch(
      `https://api.themoviedb.org/3${requests[`${apiLink}`]}`
    );

    const data = await response.json();
    setState(data?.results);
  };

  useEffect(() => {
    fetchMovie("fetchTrending");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{ color: "white", paddingTop: "20vh" }}>
      <CarouselMovie fluid={true}>
        {state?.map((data) => (
          <LinkImage
            data={data}
            key={data?.id}
            imgPath={imgPath}
            setModal={setModal}
            modal={modal}
            setMovieDetail={setMovieDetail}
            fetchMovieDetail={fetchMovieDetailOrigin}
            setStateDetail={setStateDetail}
            setModalId={setModalId}
            modalId={modalId}
          />
        ))}
      </CarouselMovie>
    </div>
  );
};

export default Origin;
