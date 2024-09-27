import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from '../../axios.ts';

export const RecipeDetails = () => {
  const [data, setData] = useState<any>(null);
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
          <p>{data.text}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
