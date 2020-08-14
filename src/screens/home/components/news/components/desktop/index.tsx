import React from "react";
import Carousel from "react-multi-carousel";
import { CarouselCSS } from "./styles";
import { dummyData } from "../carousel_item/config";
import Post from "../carousel_item/news_posts";
// import { Next } from "@icons";

const { main, blogs } = dummyData;

const CarouselBlogPosts = () => {
  return (
    <CarouselCSS>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container"
        //   customLeftArrow={<Next />}
        //   customRightArrow={<Next />}
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 3,
            partialVisibilityGutter: 40,
          },
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        <Post main post={main} />
        {blogs.map((x, i) => (
          <Post key={i} post={x} />
        ))}
      </Carousel>
    </CarouselCSS>
  );
};

export default CarouselBlogPosts;
