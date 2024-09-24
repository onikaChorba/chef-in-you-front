import React, { useEffect } from "react"
import axios from '../../../axios.ts';

export const Home = () => {

  useEffect(() => {
    axios.get('/recipes');
  }, []);

  return (
    <>Home</>
  )
}