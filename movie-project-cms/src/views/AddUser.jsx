import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Toastify from "toastify-js";
import Button from "../components/button";

export default function AddUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(
    e,
    username,
    email,
    password,
    phoneNumber,
    address
  ) {
    e.preventDefault();
    try {
      const body = { username, email, password, phoneNumber, address };

      const { data } = await axios.post(
        "https://h8-phase2-gc.vercel.app/apis/add-user",
        body,
        { headers: { Authorization: `Bearer ${localStorage.access_token}` } }
      );

      console.log(data);

      navigate("/");
      Toastify({
        text: `Succeed add new data ${data.data.email}`,
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
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Add User</title>
      {/* Main */}
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full object-cover z-[-1] bg-yellow-50" />

      <div className="absolute top-64 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-300 text-white p-8 rounded-lg shadow-lg max-w-md mt-24 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
        <h2 className="text-2xl font-bold text-black font-mono font-bold text-shadow-lg animate-pulse mb-5 text-center">
          Add User
        </h2>
        <form
          onSubmit={(e) =>
            handleSubmit(e, username, email, password, phoneNumber, address)
          }
        >
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              id="username"
              placeholder="username"
              className="flex-2 p-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-md text-sm bg-white text-black font-mono font-bold w-40"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="email"
              id="email"
              className="flex-1 p-4 rounded-md text-sm border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-white text-black font-mono- font-bold w-40"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex gap-4 mb-4">
            <input
              type="password"
              placeholder="password"
              id="password"
              className="flex-1 p-4 rounded-md text-sm border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-white text-black font-mono font-bold w-40  "
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="phoneNumber"
              placeholder="phoneNumber"
              id="phoneNumber"
              className="flex-2 p-4 rounded-md text-sm border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-white text-black font-mono font-bold w-40"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <input
              type="address"
              placeholder="address"
              id="address"
              className="flex justify-center items-center p-4 w-64 mx-auto rounded-md text-sm border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-white text-black font-mono font-bold"
              onChange={(e) => setAddress(e.target.value)}
            />

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button nameProp="Submit" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
