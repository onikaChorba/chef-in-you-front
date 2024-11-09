import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TRecipe } from "../../types/index";
import axios from '../../axios';

export const RecipeDetails = () => {
  const [data, setData] = useState<TRecipe | null>(null);
  const userData = useSelector((state: any) => state.auth.data);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`/recipes/${id}`)
        .then(res => {
          setData(res.data);
        })
        .catch(error => {
          console.warn(error);
          alert('Can not to get recipe');
        });
    }
  }, [id]);

  return (
    <>
      {data ? (
        <div>
          <h1>{data.title}: {data._id}</h1>
          <p>{data.description}</p>
          <p>{data.user}</p>
          {(data.user === userData?._id) && <button> Remove recipe</button>}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
