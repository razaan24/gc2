import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../api/baseUrl";
import Toastify from "toastify-js";

export default function GenrePage() {
  const [genres, setGenre] = useState([]);

  async function fecthGenre() {
    try {
      const { data } = await axios.get(`${baseUrl}/apis/movie/genres`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
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
          boxShadow: "2px 2px black",
        },
      }).showToast();
    }
  }

  useEffect(() => {
    fecthGenre();
  }, []);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Genre</title>
      {/* Main */}
      <div className="min-h-screen bg-transparent">
        {/* Background */}
        <div className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" />
        {/* Movie Table */}
        <div className="container mx-auto my-8 p-4 max-w-6xl">
          <table className="min-w-full table-auto border-collapse border-2 border-black">
            <thead>
              <tr>
                {["No", "Name"].map((header, index) => (
                  <th
                    key={index}
                    className="bg-yellow-50 border-2 border-black p-1 text-black font-mono font-bold text-center"
                    style={{
                      minWidth: header === "Name" ? "150px" : "80px",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {genres.map((genre, index) => (
                <tr key={index}>
                  <td className=" bg-yellow-50 border-2 border-black p-1 text-black font-mono font-bold text-center">
                    {index + 1}
                  </td>
                  <td className=" bg-yellow-50 border-2 border-black p-1 text-black font-mono font-bold text-center">
                    {genre.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
