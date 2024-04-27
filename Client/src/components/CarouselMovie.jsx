import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import classes from "../styles/UI/CarouselMovie.module.css";

const CarouselMovie = (props) => {
  return (
    <>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode
        className=""
        containerClass={
          props.fluid ? classes.containerOrigin : classes.containerList
        }
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={0}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          mobile: {
            breakpoint: {
              max: 900,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 120,
          },
          tablet: {
            breakpoint: {
              max: 1200,
              min: 900,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
          laptop_desktop: {
            breakpoint: {
              max: 1500,
              min: 1200,
            },
            items: 3,
            partialVisibilityGutter: 60,
          },
          monitor_desktop: {
            breakpoint: {
              max: 2000,
              min: 1500,
            },
            items: 4,
            partialVisibilityGutter: 0,
          },
          monitor_4k_desktop: {
            breakpoint: {
              max: 3840,
              min: 2000,
            },
            items: 6,
            partialVisibilityGutter: 0,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={3}
        swipeable
      >
        {props.children}
      </Carousel>
    </>
  );
};

export default CarouselMovie;
