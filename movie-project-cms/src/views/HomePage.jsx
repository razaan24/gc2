import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../api/baseUrl";
import Toastify from "toastify-js";
import { Link, useNavigate, useParams } from "react-router";
import { FaUpload } from "react-icons/fa";

export default function HomePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [movies, setMovie] = useState([]);

  async function fetchMovie() {
    try {
      const { data } = await axios.get(`${baseUrl}/apis/movie/movies`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
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

  useEffect(() => {
    fetchMovie();
  }, []);

  async function handleDelete(id) {
    try {
      const { data } = await axios.delete(
        `${baseUrl}/apis/movie/movies/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.access_token}` } }
      );

      fetchMovie();
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

  async function handleUpload(file, id) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.patch(
        `${baseUrl}/apis/movie/movies/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      fetchMovie();
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
        },
      }).showToast();
    } catch (error) {
      Toastify({
        text: error.response?.data?.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#FF0000",
        },
      }).showToast();
    }
  }

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Movie</title>
      {/* Main */}
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full object-cover z-[-1] bg-white" />
      {/* Movie Table */}
      <div className="container mx-auto my-8 p-4 max-w-6xl">
        <table className="min-w-full table-auto border-collapse border-2 border-black">
          <thead>
            <tr>
              {[
                "No",
                "Title",
                "Rating",
                "Synopsis",
                "Trailer URL",
                "Image URL",
                "Action",
              ].map((header, index) => (
                <th
                  key={index}
                  className="bg-yellow-50 border-2 border-black p-2 text-black font-mono font-bold text-center text-black"
                  style={{
                    minWidth: header === "Synopsis" ? "200px" : "120px",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => (
              <tr key={index}>
                <td className="bg-yellow-50 border-2 border-black p-2 text-black font-mono font-bold text-center">
                  {index + 1}
                </td>
                <td className="bg-yellow-50 border-2 border-black p-2 text-black font-mono font-bold text-center">
                  {movie.title}
                </td>
                <td className="bg-yellow-50 border-2 border-black p-2 text-black font-mono font-bold text-center">
                  {movie.rating}
                </td>
                <td
                  className="bg-yellow-50 border-2 border-black p-2 text-black font-mono font-bold text-center"
                  style={{
                    maxWidth: "20px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={movie.synopsis}
                >
                  {movie.synopsis}
                </td>
                <td
                  className="bg-yellow-50 border-2 border-black p-2 text-black font-mono font-bold text-center"
                  style={{
                    maxWidth: "20px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <a href={movie.trailerUrl} className="text-black">
                    {movie.trailerUrl}
                  </a>
                </td>
                <td className="bg-yellow-50 border-2 border-black p-2 text-black font-mono font-bold text-center">
                  <img
                    src={movie.imgUrl}
                    alt="img"
                    className="w-46 h-36 object-cover"
                  />
                </td>
                <td className="bg-yellow-50 border-2 border-black p-2 text-black font-mono font-bold text-center">
                  <div className="flex justify-center mt-10 w-full">
                    <a
                      className="fa-solid fa-circle-info fa-lg m-5 cursor-pointer text-black"
                      onClick={() => navigate(`/edit-movie/${movie.id}`)}
                    />
                    <a
                      className="fa-solid fa-trash fa-lg m-5 cursor-pointer text-black"
                      onClick={() => handleDelete(movie.id)}
                    />
                    <label
                      className="text-black p-2 rounded transition duration-300 cursor-pointer fa-lg"
                      title="Upload"
                      htmlFor={`upload${movie.id}`}
                    >
                      <FaUpload size={30} />
                      <input
                        id={`upload${movie.id}`}
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          handleUpload(e.target.files[0], movie.id)
                        }
                      />
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
