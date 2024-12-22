import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

export default function DetailPage() {
  const navigate = useNavigate();
  const [movies, setMovie] = useState({});
  const { id } = useParams();

  async function fetchMovie() {
    try {
      const { data } = await axios.get(
        `https://h8-phase2-gc.vercel.app/apis/pub/movie/movies/${id}`
      );

      setMovie(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Movie</title>
      {/* Main */}
      <div className="min-h-screen bg-transparent">
        {/* Navbar */}

        {/* Background  */}
        <div
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
          style={{
            backgroundImage: `url(${movies.imgUrl})`,
          }}
        ></div>

        {/* Centered Card */}
        <div className="absolute p-8 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-5 backdrop-blur-md text-white rounded-lg shadow-lg max-w-4xl flex items-center overflow-hidden">
          {/* Image Section */}
          <div
            className="w-52 h-64 bg-cover bg-center text-white p-5 rounded-lg shadow-lg flex flex-col justify-end border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]"
            style={{
              backgroundImage: `url(${movies.imgUrl})`,
            }}
          >
            <a
              href={movies.trailerUrl}
              className="mt-2 px-2 py-2 bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] text-black rounded-lg shadow font-mono font-bold hover:bg-white transition block text-center hover:text-black"
            >
              Watch Trailer
            </a>
            <h2 className="text-center text-white text-lg font-bold mt-1">
              ⭐ {movies.rating}
            </h2>
          </div>
          {/* Text Section */}
          <div className="w-1/2 pl-8 overflow-hidden">
            <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
              {movies.title}
            </h1>
            <p className="mb-6 text-center md:text-left">{movies.synopsis}</p>
            <div className="flex justify-center md:justify-start">
              <a
                onClick={() => {
                  navigate("/");
                }}
                className="py-2.5 px-6 border-2 ml-32  border-black rounded-lg text-sm font-medium font-mono font-bold text-black bg-white hover:bg-yellow-400 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
              >
                Back
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
