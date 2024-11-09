import React from "react";
import styles from './home.module.scss';
import { Button } from "../../button/button";

export const Home = () => {
  return (
    <div className={styles.hero}>
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
        Animation
      </div>
    </div>
  );
};
