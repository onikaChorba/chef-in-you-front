import React, { useState } from "react";
import styles from './home.module.scss';
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/button";
import TrendingRecipesCarousel from "../../components/carousel/carousel";
import { AddRecipe } from "../addRecipe/addRecipe";
import cookies from '../../assets/icons/cookie.png';
import heroImg from '../../assets/imgs/hero-img.png';
import userAvatar from '../../assets/icons/user-avatar.png'
import womanAvatar from '../../assets/icons/woman-avatar.png'

const CommentBlock = ({ style, user, icon, text }: any) => {
  return (
    <div className={styles.commentBlock} style={style}>
      <div>
        <img src={icon} alt="user" width={70} height={'auto'} />
      </div>
      <div>
        <p className={`${styles.commentBlock__title} poppins-bold text`}>{user}</p>
        <p className={`${styles.commentBlock__text} text`}>{text}</p>
      </div>
    </div>
  )
}

export const Home = ({ recipes }: any) => {
  const navigate = useNavigate();
  const [showPrivacy, setShowPrivacy] = useState(true);
  return (
    <>
      <section>
        <div className={styles.hero} style={{ minHeight: showPrivacy ? 'calc(100vh - 65.5px - 130px)' : 'calc(100vh - 65.5px)' }}>
          <div className={styles.hero__animation}>
            <TrendingRecipesCarousel recipes={recipes.items} />
          </div>
          <div className={styles.hero__textblock}>
            <div className={styles['hero__textblock-text']}>
              <h1 className="poppins-black">Your Daily Dish <br />
                A <span>Food</span> Journey
              </h1>
              <p className="poppins-medium">
                Discover new flavors, savor beloved classics, and explore the art of cooking with us. From easy weeknight meals to gourmet creations, we bring you recipes, tips, and inspiration for every occasion. Let’s make every meal an adventure in taste!
              </p>
              <Button text="Sign up" textStyle="" onClick={() => navigate('/registration')} />
              <p className="poppins-regular">Do you have an account? <button onClick={() => navigate('/login')}><span className="poppins-bold">Log in</span></button></p>
            </div>
            <div className={styles['hero__textblock-img']}>
              <img src={heroImg} width="50%" alt="hero img" />
              <CommentBlock
                user="Jon Johnson"
                icon={userAvatar}
                text="Wow, this recipe is a flawor explosion in my mouth! very deliclous."
                style={{
                  position: 'absolute',
                  bottom: '230px',
                  right: '0px'
                }} />
              <CommentBlock
                user="Kati Milano"
                icon={womanAvatar}
                text="I love this site. I can find a lot of recipes"
                style={{
                  position: 'absolute',
                  bottom: '130px',
                  left: '50px'
                }} />
            </div>
          </div>
        </div>
        {
          showPrivacy && <div className={styles.privacy}>
            <div className={styles.privacy__info}>
              <div className={styles['privacy__info-header']}><img src={cookies} alt="cookies" width={20} /><h3 className='heading__3'> We value your privacy</h3></div>
              <p className="text">We use cookies to make your browsing experience sweeter! Cookies help us analyze traffic and show you personalized content. By clicking "accept all" you are giving us permission to treat you to a cookie or two. To read our full Cookie Policy.</p>
            </div>
            <div className={styles.privacy__buttons}>
              <Button text="Accept all" textStyle="poppins-bold" onClick={() => setShowPrivacy(false)} className={styles['privacy__buttons-primary']} />
              <button className={`${styles['privacy__buttons-secondary']} text`} onClick={() => setShowPrivacy(false)}> Reject all</button>
            </div>
          </div>
        }
      </section>
      <section>
        <AddRecipe />
      </section>
    </>
  );
};
