import React from "react";
// import { CarouselBlockCSS, WrapperCSS } from "./styles";
import Carousel from "react-multi-carousel";

const CarouselItem = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel responsive={responsive}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
    </Carousel>
  );
};

export default CarouselItem;

// const Carousel = () => {
//   const [slides] = useState([
//     {
//       source: "/static/images/team/123.png",
//       title: "A",
//     },
//     {
//       source: "/static/images/team/123.png",
//       title: "B",
//     },
//     {
//       source: "/static/images/team/123.png",
//       title: "Cl",
//     },
//   ]);

//   let [currentPosition, setCurrentPosition] = useState(0);
//   let currentSlide = slides[currentPosition];

//   const arrowRightClick = () => {
//     currentPosition !== slides.length - 1
//       ? setCurrentPosition(currentPosition + 1)
//       : setCurrentPosition((currentPosition = 0));
//     currentSlide = slides[currentPosition];
//   };

//   const arrowLeftClick = () => {
//     currentPosition !== 0 // Check index length
//       ? setCurrentPosition(currentPosition - 1)
//       : setCurrentPosition((currentPosition = slides.length - 1));
//     currentSlide = slides[currentPosition];
//   };

//   return (
//     <CarouselBlockCSS>
//       <WrapperCSS>
//         <div id="slider">
//           <div className="slide">
//             <img
//               src={currentSlide.source}
//               alt={currentSlide.title}
//               title={currentSlide.title}
//               className="slider-img"
//             />
//             <div className="arrows">
//               <div id="arrow-left" onClick={arrowLeftClick}></div>
//               <div id="arrow-right" onClick={arrowRightClick}></div>
//             </div>
//           </div>
//         </div>
//       </WrapperCSS>
//     </CarouselBlockCSS>
//   );
// };

// export default Carousel;
