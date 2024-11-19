import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
// import Navigation from 'swiper';

import './carousel.style.scss';

const TrendingRecipesCarousel = () => {
  const recipes = [
    {
      id: 1,
      image: 'https://via.placeholder.com/400',
      title: 'Сніданок Шефа',
      description: 'Смачний омлет із зеленню.',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/400',
      title: 'Лазанья',
      description: 'Класична італійська страва.',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/400',
      title: 'Фруктовий Салат',
      description: 'Легкий та корисний перекус.',
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/400',
      title: 'Сніданок ',
      description: 'Смачний ',
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/400',
      title: 'Лазанья',
      description: 'Класична італійська страва.',
    },
    {
      id: 6,
      image: 'https://via.placeholder.com/400',
      title: 'Фруктовий Салат',
      description: 'Легкий та корисний перекус.',
    },
  ];

  return (
    <div className="trending-carousel">
      <h2 className="trending-carousel__title">Трендові Рецепти</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        navigation
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {recipes.map((recipe) => (
          <SwiperSlide key={recipe.id}>
            <div className="recipe-card">
              <img src={recipe.image} alt={recipe.title} className="recipe-card__image" />
              <h3 className="recipe-card__title">{recipe.title}</h3>
              <p className="recipe-card__description">{recipe.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingRecipesCarousel;
