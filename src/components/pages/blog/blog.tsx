import React from "react";
import styles from './blog.module.scss';
import articleTop from '../../../assets/imgs/article-top.png'
import cheesecake from '../../../assets/imgs/cheesecake.jpeg'
import impact from '../../../assets/imgs/impact.jpg'
import { Button } from "../../button/button";
export const Blog = () => {
  return (
    <div className={styles.blog}>
      <h2 className={`${styles.blog__title} poppins-extrabold`}>Blog</h2>
      <div className={styles["article-top"]}>
        <div className={`${styles["article"]}`}>
          <div className={`${styles["article__data"]} poppins-light`} >on September 19, 2032</div>
          <h3 className={`${styles["article__title"]} poppins-semibold`}>Classic New York_style Cheesecake Recipe</h3>
          <p className={`${styles["article__text"]} poppins-regular`}>A Classic New York-style Cheesecake is the ultimate dessert for special occasions or any time you’re craving something indulgent. Known for its rich, creamy texture and slightly tangy flavor, this cheesecake is baked to perfection with a buttery graham cracker crust. The key to mastering this recipe lies in balancing the sweetness of cream cheese, sugar, and vanilla with the smoothness of sour cream and eggs.
            <br /><br />
            Once baked, it’s chilled to develop its signature dense yet velvety consistency. You can serve it plain or dress it up with fresh fruit, whipped cream, or a drizzle of chocolate or caramel sauce. Whether you’re a cheesecake connoisseur or trying it for the first time, this recipe is sure to impress. Prepare for rave reviews at your next gathering!
          </p>
          <Button className="primary" text="Read more" textStyle="" />
        </div>
        <div className={styles["article-top__img"]}>
          <img src={articleTop} alt="food" />
        </div>
      </div>

      <div className={styles.articles}>
        <div className={styles['article-block']}>
          <div className={styles["article-block__img"]}>
            <img src={cheesecake} alt="food" />
          </div>
          <div className={`${styles["article-block__data"]} poppins-light`} >on September 19, 2032</div>
          <h3 className={`${styles["article-block__title"]} poppins-semibold`}>Classic New York_style Cheesecake Recipe</h3>
          <p className={`${styles["article-block__text"]} poppins-regular`}>A Classic New York-style Cheesecake is the ultimate dessert for special occasions or any time you’re craving something indulgent. Known for its rich, creamy texture and slightly tangy flavor, this cheesecake is baked to perfection with a buttery graham cracker crust. The key to mastering this recipe lies in balancing the sweetness of cream cheese, sugar, and vanilla with the smoothness of sour cream and eggs.
          </p>
          <Button className="button-link" text="Read more" textStyle="" />
        </div>
        <div className={styles['article-block']}>
          <div className={styles["article-block__img"]}>
            <img src={impact} alt="food" />
          </div>
          <div className={`${styles["article-block__data"]} poppins-light`} >on December 25, 2024</div>
          <h3 className={`${styles["article-block__title"]} poppins-semibold`}>The Surprising Effects of Sugar on Mental Health</h3>
          <p className={`${styles["article-block__text"]} poppins-regular`}>
            Sugar, often a staple in our daily diets, can have profound effects on mental health. Studies show that high sugar intake may lead to mood swings, anxiety, and even depression by affecting the body’s insulin levels and brain chemistry. While sweet treats can provide a temporary boost of energy, their long-term impact on mental well-being is less sweet.
          </p>
          <Button className="button-link" text="Read more" textStyle="" />
        </div>
      </div>
    </div>
  );

}