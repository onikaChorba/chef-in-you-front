import React from 'react';
import styles from './carousel.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const TrendingRecipesCarousel = ({ recipes }: any) => {
  if (!Array.isArray(recipes)) {
    return <div>No recipes available</div>;
  }

  return (
    <div className={styles["trending-carousel"]}>
      <h2 className={styles["trending-carousel__title"]}>Trending Recipes</h2>
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
        loop={recipes.length > 3}
      >
        {recipes && recipes.map((recipe: any, index) => (
          <SwiperSlide key={index}>
            <div className={styles["recipe-card"]}>
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className={styles["recipe-card__image"]}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingRecipesCarousel;
