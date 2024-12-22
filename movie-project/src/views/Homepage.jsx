import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import Main from "../components/Background";
import { useNavigate } from "react-router";

function Homepage() {
  const navigate = useNavigate();
  const [movies, setMovie] = useState([]);
  const [genres, setGenre] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  async function fecthMovie() {
    try {
      let url = `https://h8-phase2-gc.vercel.app/apis/pub/movie/movies?q=${search}&i=${filter}&limit=8&page=${page}`;
      if (sort) {
        url += `&sort=${sort}`;
      }
      const { data } = await axios.get(url);
      // console.log(data.data.query);
      setTotalPages(data.data.pagination.totalPage);
      setMovie(data.data.query);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchGenre() {
    try {
      const { data } = await axios.get(
        `https://h8-phase2-gc.vercel.app/apis/pub/movie/genres`
      );
      // console.log(data);
      setGenre(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  function getPagination() {
    const rangeSize = 10;
    const startPage = Math.floor((page - 1) / rangeSize) * rangeSize + 1;
    const endPage = Math.min(startPage + rangeSize - 1, totalPages);

    let temp = [];
    for (let i = startPage; i <= endPage; i++) {
      temp.push(i);
    }

    return temp;
  }

  const pagination = getPagination();

  useEffect(() => {
    fetchGenre();
  }, []);
  useEffect(() => {
    fecthMovie();
  }, [search, filter, page, sort]);

  useEffect(() => {
    console.log(totalPages, page);
  });
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Movie</title>
      {/* Main */}
      <body className="relative min-h-screen bg-transparent pt-8 ">
        {/* Navbar */}
        <div className="sticky top-0 z-10 flex items-center h-20 p-2.5 mx-36 bg-yellow-400 border-2 border-black rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] justify-center font-mono text-3xl font-bold">
          <div className="flex justify-center items-center space-x-12">
            {/* Home */}
            <div>
              <a
                onClick={() => {
                  navigate("/");
                }}
                className="w-full py-2.5 px-6 border-2 border-black rounded-lg text-sm font-medium text-black bg-white hover:bg-yellow-400 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
              >
                Home
              </a>
            </div>

            {/* Search bar */}
            <div className="bg-transparent flex space-x-4 items-center">
              <form className="bg-none max-w-sm mx-auto">
                <input
                  type="text"
                  id="search"
                  className="w-full py-2.5 px-8 border-2 border-black rounded-lg text-sm font-medium text-black bg-white hover:bg-yellow-400 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                  placeholder="Search Movie"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
            </div>

            {/* Genre filter */}
            <div>
              <select
                id="filter"
                className="py-2.5 px-2 border-2 border-black rounded-lg text-sm font-medium text-black bg-white hover:bg-yellow-400 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
              >
                <option value="" selected="" disabled="">
                  Select Genre
                </option>
                {genres.map((genre) => {
                  return (
                    <option className="text-black" key={genre.id}>
                      {genre.name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Sorting */}
            <div>
              <select
                id="sort"
                className="py-2.5 px-6 border-2 border-black rounded-lg text-sm font-medium text-black bg-white hover:bg-yellow-400 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                onChange={(e) => setSort(e.target.value)}
                value={sort}
              >
                <option value="" selected="" disabled="">
                  Sort
                </option>
                <option value="DESC">DESC</option>
                <option value="ASC">ASC</option>
              </select>
            </div>
          </div>
        </div>

        {/* Background Video */}
        <Main />

        {/* Centered Card */}
        <div className="relative ">
          <img
            src="https://i.pinimg.com/736x/fe/b2/96/feb2966ea94c5f2d48381a1e2957bb2c.jpg"
            alt="img"
            className="absolute border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] top-36 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-5 backdrop-blur-md text-white rounded-lg shadow-lg max-w-lg w-[500px] h-auto"
          />
          <a
            className="absolute top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-2 px-4 border-2 border-black rounded-lg font-mono font-bold text-sm font-medium text-black bg-yellow-400 hover:bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)]"
            href="https://youtu.be/uhkDkurK0Zg?si=sFC3zUKnBcm66iQj"
          >
            Watch Now
          </a>
        </div>

        <div className="mt-64 grid grid-cols-1 md:grid-cols-4 lg:grid-cols- gap-6 mt-[300px] p-6 mx-10">
          {movies.map((movie) => {
            return <Card key={movie.id} movie={movie} />;
          })}
        </div>

        <div className="flex flex-col items-center mt-4">
          {/* Page Numbers */}

          {/* Previous and Next Buttons */}
          <div className="flex space-x-4 mt-2 mb-10">
            <button
              className="w-full mt-5 py-2 px-4 border-2 border-black rounded-lg text-sm font-medium text-Black bg-yellow-400 hover:bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)]"
              onClick={() => setPage(page - 1)}
              disabled={page == 1}
            >
              Previous
            </button>
            {/* INI PREVIOUS ^^  */}

            <div className="flex space-x-2">
              {pagination.map((pageNumber) => (
                <button
                  key={pageNumber}
                  className={`w-full mt-5 py-2 px-4 border-2 border-black rounded-lg text-sm font-medium text-Black bg-white hover:bg-yellow-400 shadow-[4px_4px_0px_rgba(0,0,0,1)] ${
                    pageNumber === page
                      ? "bg-yellow-400 text-black border-black"
                      : "border-black text-black"
                  } rounded`}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            <button
              className="w-full mt-5 py-2 px-4 border-2 border-black rounded-lg text-sm font-medium text-Black bg-yellow-400 hover:bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)]"
              disabled={page == totalPages}
              onClick={() =>
                page !== totalPages ? setPage(page + 1) : setPage(1)
              }
            >
              Next
            </button>
          </div>
        </div>
      </body>
    </>
  );
}
export default Homepage;
