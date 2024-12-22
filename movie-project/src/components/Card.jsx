import { useNavigate } from "react-router";

export default function Card({ movie }) {
  const navigate = useNavigate();

  return (
    <div
      className="w-60 h-60 bg-cover bg-center text-black p-6 rounded-lg shadow-lg flex flex-col justify-center items-center border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]"
      style={{
        backgroundImage: `url(${movie.imgUrl})`,
      }}
    >
      <div className="w-full text-center">
        <h2 className="py-2 px-4 border-2 border-black font-mono font-bold rounded-lg text-sm font-medium text-black bg-white hover:bg-yellow-400 shadow-[4px_4px_0px_rgba(0,0,0,1)] mb-24">
          {movie.title || "Movie Title"}
        </h2>
        <button
          className="py-2 px-4 border-2 border-black rounded-lg font-mono font-bold text-sm font-medium text-black bg-yellow-400 hover:bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)]"
          onClick={() => {
            navigate(`/${movie.id}`);
          }}
        >
          Open
        </button>
      </div>
    </div>
  );
}
