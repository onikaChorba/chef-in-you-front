import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import './carousel.style.scss';

const TrendingRecipesCarousel = ({ recipes }: any) => {
  if (!Array.isArray(recipes)) {
    return <div>No recipes available</div>;
  }

  return (
    <div className="trending-carousel">
      <h2 className="trending-carousel__title">Trending Recipes</h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        centeredSlides={true}
        navigation
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        autoplay={{
          delay: 100,
          disableOnInteraction: false,
        }}
        speed={2000}
        loop
      >
        {recipes && recipes.map((recipe: any) => (
          <SwiperSlide key={recipe.id}>
            <div className="recipe-card">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="recipe-card__image"
              />
              {/* <h3 className="recipe-card__title">{recipe.title}</h3>
              <p className="recipe-card__description">{recipe.description}</p> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingRecipesCarousel;
