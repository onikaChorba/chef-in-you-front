import React, { useState } from "react";
import styles from './home.module.scss';
import { Button } from "../../components/button/button";
import TrendingRecipesCarousel from "../../components/carousel/carousel";
import { AddRecipe } from "../addRecipe/addRecipe";
import { RecipeCard } from "../../components/recipe/recipeCard/recipeCard";
import { Input } from "../../components/input/input";
import cookie from '../../assets/icons/cookie.svg'
import Images from "../../images";

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

interface IHome {
  recipes: any,
  tags: any,
  setShowLoginForm: (showLoginForm: boolean) => void,
  setShowRegForm: (showRegForm: boolean) => void
}

export const Home = ({ recipes, tags, setShowLoginForm, setShowRegForm }: IHome) => {
  const [showPrivacy, setShowPrivacy] = useState(true);

  const tagImages: Record<string, string> = {
    pizza: Images.pizza,
    italian: Images.pasta,
    vegetarian: Images.vegeterian,
    "stir-fry": Images.stirFry,
    asian: Images.azian,
    cookies: Images.cookies,
    dessert: Images.dessert,
    baking: Images.baking,
  };

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
              <Button text="Sign up" textStyle="" onClick={() => setShowRegForm(true)} />
              <p className="poppins-regular">Do you have an account? <button onClick={() => setShowLoginForm(true)}><span className="poppins-bold">Log in</span></button></p>
            </div>
            <div className={styles['hero__textblock-img']}>
              <img src={Images.heroImg} width="50%" alt="hero img" />
              <CommentBlock
                user="Jon Johnson"
                icon={Images.userAvatar}
                text="Wow, this recipe is a flawor explosion in my mouth! very deliclous."
                style={{
                  position: 'absolute',
                  bottom: '230px',
                  right: '0px'
                }} />
              <CommentBlock
                user="Kati Milano"
                icon={Images.womanAvatar}
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
              <div className={styles['privacy__info-header']}>
                <img src={cookie} alt="cookies" width={20} />
                <h3 className='heading__3'> We value your privacy</h3>
              </div>
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
        <AddRecipe setShowRegForm={setShowRegForm} />
      </section>
      <section className={styles.recipes}>
        <div className={styles.recipes__title}>
          <h2 className="poppins-extrabold">Trending Recipe</h2>
          <Button text="View more" textStyle="poppins-bold" buttonStyle="button-link" />
        </div>
        <div className={styles.recipes__list}>
          {recipes.items.slice(0, 4).map((recipe: any, index: number) => (
            <RecipeCard recipe={recipe} key={index} />
          ))}
        </div>
      </section>
      <section className={styles.letsStayInTouch}>
        <div className={styles.letsStayInTouch__block}>
          <h2 className="poppins-bold">Let`s Stay In Touch!</h2>
          <p className="text">Join our newsletter, so that we rech out to you with our news and offers</p>
          <Input name="email" placeholder="Enter Your Email" id="emailSubscribe" />
          <Button text="Subscribe" textStyle="" />
        </div>
      </section>
      <section className={styles.popularCategories}>
        <div className={styles.popularCategories__title}>
          <h2 className="poppins-extrabold">Popular Categories</h2>
          <Button text="View more" textStyle="poppins-bold" buttonStyle="button-link" />
        </div>
        <div className={styles.popularCategories__bloks}>
          {
            tags && tags.items.tags.map((tag: any, index: number) => (
              <div key={index} className={styles.popularCategories__blok}>
                <div className={styles['popularCategories__blok-img']}>
                  <img src={tagImages[tag.toLowerCase()]} alt={tag} />
                </div>
                <p className={`${styles['popularCategories__blok-tag']} poppins-semibold`}>{tag}</p>
              </div>
            ))
          }
        </div>
      </section>
    </>
  );
};
