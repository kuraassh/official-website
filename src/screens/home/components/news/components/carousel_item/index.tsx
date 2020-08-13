import React, { useState } from "react";
import { CarouselBlockCSS, WrapperCSS } from "./styles";

const Carousel = () => {
  const [slides] = useState([
    {
      source: "/static/images/team/123.png",
      title: "A",
    },
    {
      source: "/static/images/team/123.png",
      title: "B",
    },
    {
      source: "/static/images/team/123.png",
      title: "Cl",
    },
  ]);

  let [currentPosition, setCurrentPosition] = useState(0);
  let currentSlide = slides[currentPosition];

  const arrowRightClick = () => {
    currentPosition !== slides.length - 1
      ? setCurrentPosition(currentPosition + 1)
      : setCurrentPosition((currentPosition = 0));
    currentSlide = slides[currentPosition];
  };

  const arrowLeftClick = () => {
    currentPosition !== 0 // Check index length
      ? setCurrentPosition(currentPosition - 1)
      : setCurrentPosition((currentPosition = slides.length - 1));
    currentSlide = slides[currentPosition];
  };

  return (
    <CarouselBlockCSS>
      <WrapperCSS>
        <div id="slider">
          <div className="slide">
            <img
              src={currentSlide.source}
              alt={currentSlide.title}
              title={currentSlide.title}
              className="slider-img"
            />
            <div className="arrows">
              <div id="arrow-left" onClick={arrowLeftClick}></div>
              <div id="arrow-right" onClick={arrowRightClick}></div>
            </div>
          </div>
        </div>
      </WrapperCSS>
    </CarouselBlockCSS>
  );
};

export default Carousel;
