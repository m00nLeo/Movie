import React, { useEffect, useState } from "react";
import CarouselMovie from "../../components/CarouselMovie";
import LinkImage from "../../components/Movie/LinkImage";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Card from "../../components/Card";

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
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovie = async (apiLink) => {
    const response = await fetch(
      `https://api.themoviedb.org/3${requests[`${apiLink}`]}`
    );

    const data = await response.json();
    setIsLoading(false);
    setState(data?.results);
  };

  useEffect(() => {
    fetchMovie("fetchTrending");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{ color: "white", paddingTop: "20vh" }}>
      {isLoading ? (
        <Card>
          <Skeleton count={8} />
        </Card>
      ) : (
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
      )}
    </div>
  );
};

export default Origin;
