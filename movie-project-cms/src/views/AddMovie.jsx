import { useNavigate } from "react-router";
import axios from "axios";
import Form from "../components/Form";
import { baseUrl } from "../api/baseUrl";
import Toastify from "toastify-js";

export default function AddMovie() {
  const navigate = useNavigate();

  async function handleSubmit(
    e,
    title,
    genreId,
    rating,
    synopsis,
    trailerUrl,
    imgUrl
  ) {
    e.preventDefault();
    try {
      const body = {
        title,
        genreId: +genreId,
        rating: +rating,
        synopsis,
        trailerUrl,
        imgUrl,
      };

      const { data } = await axios.post(`${baseUrl}/apis/movie/movies`, body, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      console.log(data);

      navigate("/");
      Toastify({
        text: `Succeed add new data ${data.data.title}`,
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

  return (
    <>
      <Form handleSubmit={handleSubmit} propName="Add Movie" />
    </>
  );
}
