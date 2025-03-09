/* eslint-disable jsx-a11y/no-distracting-elements */

import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Categorys = () => {
  const { categorys } = useSelector((state) => state.home);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 12,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 12,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 3,
    },
  };

  return (
    <div className="w-[87%] mx-auto relative">
      <Carousel
        autoPlay={true}
        infinite={true}
        arrows={true}
        responsive={responsive}
        transitionDuration={500}
      >
        {categorys.map((c, i) => (
          <Link
            className="block text-center"
            key={i}
            to={`/products?category=${c.name}`}
          >
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 border border-gray-300">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-2 w-[90%]">
                <span
                  className="text-sm sm:text-base font-medium text-white truncate block relative"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {c.name.length > 15 ? (
                    <marquee
                      behavior="scroll"
                      direction="left"
                      scrollamount="3"
                      className="truncate"
                    >
                      {c.name}
                    </marquee>
                  ) : (
                    c.name
                  )}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Categorys;
