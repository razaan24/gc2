import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../api/baseUrl";
import Toastify from "toastify-js";
import Button from "./button";

export default function Form({ movie, handleSubmit, propName }) {
  const [genres, setGenre] = useState([]);
  const [title, setTitle] = useState("");
  const [genreId, setGenreId] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [rating, setRating] = useState(0);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  async function fetchGenres() {
    try {
      const { data } = await axios.get(`${baseUrl}/apis/movie/genres`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      setGenre(data.data);
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
          boxShadow: "4px 4px black",
        },
      }).showToast();
    }
  }

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setGenreId(movie.genreId);
      setRating(movie.rating);
      setSynopsis(movie.synopsis);
      setTrailerUrl(movie.trailerUrl);
      setImgUrl(movie.imgUrl);
    }
  }, [movie]);

  useEffect(() => {
    fetchGenres();
  }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();
    handleSubmit(e, title, genreId, rating, synopsis, trailerUrl, imgUrl);
  }

  return (
    <>
      {/* Background */}
      <div className="absolute top-0 left-0 w-full max-h-screen object-cover z-[-1] bg-white" />

      <div className="relative top-64 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-50 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] text-b p-8 rounded-lg shadow-lg max-w-md mt-24">
        <h2 className="text-2xl font-bold font-mono text-Black text-shadow-lg animate-pulse mb-5 text-center">
          {propName}
        </h2>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-4 flex justify-center items-center">
            <input
              type="text"
              placeholder="Movie Title"
              name="title"
              className="w-56 bg-yellow-300 border-2 border-black text-black text-sm font-mono font-bold rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] block w-full p-2.5"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="mb-4 flex justify-center items-center">
            <select
              id="genre"
              className="w-56 bg-yellow-300 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] text-black text-sm font-mono font-bold rounded-lg block w-full p-2.5"
              onChange={(e) => setGenreId(e.target.value)}
              value={genreId}
            >
              <option value="">Select Genre</option>
              {genres.map((genre) => {
                return (
                  <option value={genre.id} key={genre.id}>
                    {genre.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-4 flex justify-center items-center">
            <textarea
              placeholder="Synopsis"
              name="synopsis"
              className="w-56 bg-yellow-300 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] text-black text-sm font-mono font-bold rounded-lg block w-full p-2.5"
              onChange={(e) => setSynopsis(e.target.value)}
              value={synopsis}
            />
          </div>
          <div className="mb-4 flex justify-center items-center">
            <input
              type="number"
              placeholder="Rating (1-10)"
              name="rating"
              min={1}
              max={10}
              className="w-56 bg-yellow-300 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] text-black text-sm font-mono font-bold rounded-lg block w-full p-2.5"
              onChange={(e) => setRating(e.target.value)}
              value={rating}
            />
          </div>
          <div className="mb-4 flex justify-center items-center">
            <input
              type="text"
              placeholder="Image URL"
              name="imgUrl"
              className="w-56 bg-yellow-300 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] text-black text-sm font-mono font-bold rounded-lg block w-full p-2.5"
              onChange={(e) => setImgUrl(e.target.value)}
              value={imgUrl}
            />
          </div>
          <div className="mb-4 flex justify-center items-center">
            <input
              type="text"
              placeholder="Trailer URL"
              name="trailerUrl"
              className="w-56 bg-yellow-300 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] text-black font-mono font-bold text-sm rounded-lg block w-full p-2.5"
              onChange={(e) => setTrailerUrl(e.target.value)}
              value={trailerUrl}
            />
          </div>
          <div className="flex justify-center">
            <Button nameProp={propName} />
          </div>
        </form>
      </div>
    </>
  );
}
