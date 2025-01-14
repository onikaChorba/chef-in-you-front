import React, { useState } from "react";
import styles from './home.module.scss';
import { Button } from "../../components/button/button";
import TrendingRecipesCarousel from "../../components/carousel/carousel";
import cookies from '../../assets/icons/cookie.png';

export const Home = ({ recipes }: any) => {
  const [showPrivacy, setShowPrivacy] = useState(true);
  return (
    <>
      <div className={styles.hero} style={{ minHeight: showPrivacy ? 'calc(100vh - 65.5px - 130px)' : 'calc(100vh - 65.5px)' }}>
        <div className={styles.hero__textblock}>
          <h1 className="poppins-black">Your Daily Dish <br />
            A <span>Food</span> Journey
          </h1>
          <p className="poppins-medium">
            Discover new flavors, savor beloved classics, and explore the art of cooking with us. From easy weeknight meals to gourmet creations, we bring you recipes, tips, and inspiration for every occasion. Let’s make every meal an adventure in taste!
          </p>
          <Button text="Sign up" textStyle="" />
          <p className="poppins-regular">Do you have an account? <span>Log in</span></p>
        </div>
        <div className={styles.hero__animation}>
          <TrendingRecipesCarousel recipes={recipes} />
        </div>
      </div>
      {
        showPrivacy && <div className={styles.privacy}>
          <div className={styles.privacy__info}>
            <div className={styles['privacy__info-header']}><img src={cookies} alt="cookies" width={20} /><h3 className='heading__3'> We value your privacy</h3></div>
            <p className="text">We use cookies to make your browsing experience sweeter! Cookies help us analyze traffic and show you personalized content. By clicking "accept all" you are giving us permission to treat you to a cookie or two. To read our full Cookie Policy.</p>
          </div>
          <div className={styles.privacy__buttons}>
            <Button text="Accept all" textStyle="" onClick={() => setShowPrivacy(false)} className={styles['privacy__buttons-primary']} />
            <button className={`${styles['privacy__buttons-secondary']} text`} onClick={() => setShowPrivacy(false)}> Reject all</button>
          </div>
        </div>
      }
    </>
  );
};
