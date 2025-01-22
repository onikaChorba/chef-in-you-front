import React, { useState } from "react";
import styles from './footer.module.scss'
import { Input } from "../input/input";
import logo from '../../assets/icons/logo.png';
import google from "../../assets/icons/google.svg";
import twiter from "../../assets/icons/twitter.svg";
import instagram from "../../assets/icons/instagram.svg";
import linkedIn from "../../assets/icons/linkedin.svg";
import { Button } from "../button/button";
import arrow from "../../assets/icons/arrow-down.svg";

function Links(props: any) {
  const [isAddList, setIsAddList] = useState(false);
  const onClickArrowList = () => {
    setIsAddList(!isAddList);
  };

  return (
    <div className={styles['footer-link']}>
      <article className={styles['footer-link__header']} onClick={onClickArrowList}>
        <div className={styles['footer-link__title']}>{props.title}</div>
        <button className={styles["footer-link__arrow"]}>
          <img src={arrow} alt="arrow" height={30}></img>
        </button>
      </article >
      <ul
        className={styles['footer-link__list']}
        style={isAddList ? { display: "block" } : { display: "none" }}
      >
        {props.li}
      </ul>
    </div>
  );
}
function Footer({
  setShowSubscribeForm,
  showSubscribeForm,
}: {
  setShowSubscribeForm: (showSubscribeForm: boolean) => void;
  showSubscribeForm: boolean;
}) {
  const data = {
    linkQuick1: [
      { href: "/", text: "Home" },
      { href: "/recipes", text: "Recipes" },
      { href: "/blog", text: "Blog" },
    ],
    linkQuick2: [
      { href: "#", text: "Share Recipe" },
      { href: "#", text: "About Us" },
      { href: "#", text: "Contact" },
    ],
    linkLegal: [
      { href: "#", text: "How it Works" },
      { href: "#", text: "Term" },
      { href: "#", text: "Privacy Policy" },
    ],
  }
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer__subscribe}>
          <div className={styles.footer__logo}>
            <img src={logo} alt="logo" className={styles["footer__logo-img"]} />
            <p className={styles['poppins-bold']}>Chef in you</p>
          </div>
          <p className={styles.footer__info}>Discover the joy of cooking with Chef in You – your trusted companion for creating delicious meals, step by step.</p>
          <div className={styles["footer__social-icons"]}>
            <a href="https://www.google.com.ua/?hl=ua">
              <img src={google} alt="icon" className={styles["icon-subscribe"]} />
            </a>
            <a href="https://twitter.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoidWsifQ%3D%3D%22%7D">
              <img src={twiter} alt="icon" className={styles["icon-subscribe"]} />
            </a>
            <a href="https://www.instagram.com">
              <img src={instagram} alt="icon" className={styles["icon-subscribe"]} />
            </a>
            <a href="https://www.linkedin.com/feed/">
              <img src={linkedIn} alt="icon" className={styles["icon-subscribe"]} />
            </a>
          </div>
        </div>
        <Links
          title="Quick links"
          li={data.linkQuick1.map((el, key) => (
            <a href={el.href} className={styles['footer__link-item']} key={key.toString()}>
              {el.text}
            </a>
          ))}
        />
        <Links
          title="Quick links"
          li={data.linkQuick2.map((el, key) => (
            <a href={el.href} className={styles['footer__link-item']} key={key.toString()}>
              {el.text}
            </a>
          ))}
        />
        <Links
          title="Legal"
          li={data.linkLegal.map((el, key) => (
            <a href={el.href} className={styles['footer__link-item']} key={key.toString()}>
              {el.text}
            </a>
          ))}
        />
        <div className={styles.footer__form}>
          <div className={styles['footer__form-title']}> News letter</div>
          <p className={styles['footer__form-description']}> Subscribe to our news letter to get more free tip</p>
          <Input name="email" placeholder="Enter Your Email" id="emailToSubscribe" />
          <Button text="Subscribe" textStyle="poppins-semibold" buttonStyle="button-secondary" onClick={() => setShowSubscribeForm(!showSubscribeForm)} />
        </div>
      </div>
      <div className={styles.footer__autor}>Copyright © 2024. Created with love.</div>
    </footer>
  );
}
export default Footer;