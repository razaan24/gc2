import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Toastify from "toastify-js";
import Navbar from "../components/Navbar";
import Button from "../components/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.access_token) {
      Toastify({
        text: "You already logged in",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true, //
        style: {
          background: "#F87171",
          color: "#000000",
        },
      }).showToast();
      navigate("/");
    }
  }, [navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://h8-phase2-gc.vercel.app/apis/login`,
        { email, password }
      );

      localStorage.setItem("access_token", data.data.access_token);

      navigate("/");
      Toastify({
        text: "Login success",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#ffd60a",
          color: "#000000",
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
          color: "#000000",
        },
      }).showToast();
    }
  }

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Login</title>
      {/* Main */}
      <div className="min-h-screen bg-transparent">
        {/* Background */}
        <div className="absolute top-0 left-0 w-full h-full object-cover z-[-1] bg-yellow-50" />

        {/* Login */}
        <div className="absolute top-52 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-300 text-white p-8 rounded-lg shadow-lg max-w-md mt-24 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-bold text-black text-shadow-lg animate-pulse mb-5 text-center">
            Login
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                placeholder="email address"
                className="w-80 p-4 mb-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-md text-sm bg-white text-black"
                autoComplete="current-email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="password"
                id="password"
                className="w-80 p-4 mb-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-md text-sm bg-white text-black"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <Button nameProp="Submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
