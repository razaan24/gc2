import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { baseUrl } from "../api/baseUrl";
import Toastify from "toastify-js";
import Form from "../components/form";

export default function EditMovie() {
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const navigate = useNavigate("");

  async function fetchMovie() {
    try {
      const { data } = await axios.get(`${baseUrl}/apis/movie/movies/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      setMovie(data.data);
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#F87171",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
        },
      }).showToast();
    }
  }

  async function handleSubmit(
    e,
    title,
    genreId,
    rating,
    synopsis,
    trailerUrl,
    imageUrl
  ) {
    e.preventDefault();
    try {
      const body = {
        title,
        genreId: +genreId,
        rating: +rating,
        synopsis: synopsis.toString(),
        trailerUrl,
        imageUrl,
      };
      const { data } = await axios.put(
        `${baseUrl}/apis/movie/movies/${id}`,
        body,
        { headers: { Authorization: `Bearer ${localStorage.access_token}` } }
      );

      navigate("/");
      Toastify({
        text: data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#ffd60a",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
        },
      }).showToast();
    } catch (error) {
      console.log(error);

      Toastify({
        text: error.response.data.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#F87171",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
        },
      }).showToast();
    }
  }

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <>
      <Form movie={movie} handleSubmit={handleSubmit} propName="Edit Movie" />
    </>
  );
}
