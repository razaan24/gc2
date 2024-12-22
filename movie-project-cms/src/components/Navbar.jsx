import { NavLink, useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <>
      <div className="sticky flex  justify-center items center gap-8 top-0 z-10 flex items-center h-20 p-2.5 mx-36 bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] font-mono text-3xl font-bold">
        {/* Home */}
        <div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "flex items-center py-2.5 px-4 border-2 border-black font-mono font-bold text-2xl f-black rounded-lg text-sm font-medium text-yellow-300 bg-white  shadow-[4px_4px_0px_rgba(0,0,0,1)] "
                : "flex items-center py-2.5 px-4 border-2 border-black rounded-lg text-sm font-medium text-black font-mono font-bold font-2xl bg-yellow-300  shadow-[4px_4px_0px_rgba(0,0,0,1)]"
            }
          >
            <span>Home</span>
          </NavLink>
        </div>

        {/* Add User */}
        <div>
          <NavLink
            to="/add-user"
            className={({ isActive }) =>
              isActive
                ? "flex items-center py-2 px-6 border-2 border-black rounded-lg text-sm font-medium text-yellow-300 font-mono font-bold font-2xl bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                : "flex items-center py-2 px-6 border-2 border-black rounded-lg text-sm font-medium text-black font-mono font-bold font-2xl bg-yellow-300  shadow-[4px_4px_0px_rgba(0,0,0,1)]"
            }
          >
            <span>Add-User</span>
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/add-movie"
            className={({ isActive }) =>
              isActive
                ? "flex items-center py-2 px-6 border-2 border-black rounded-lg text-sm font-medium text-yellow-300 font-mono font-bold font-2xl bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                : "flex items-center py-2 px-6 border-2 border-black rounded-lg text-sm font-medium text-black font-mono font-bold font-2xl bg-yellow-300  shadow-[4px_4px_0px_rgba(0,0,0,1)]"
            }
          >
            <span>Add-Movie</span>
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/genres"
            className={({ isActive }) =>
              isActive
                ? "flex items-center py-2 px-6 border-2 border-black rounded-lg text-sm font-medium text-yellow-300 font-mono font-bold font-2xl bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                : "flex items-center py-2 px-6 border-2 border-black rounded-lg text-sm font-medium text-black font-mono font-bold font-2xl bg-yellow-300  shadow-[4px_4px_0px_rgba(0,0,0,1)]"
            }
          >
            <span>List-Genre</span>
          </NavLink>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="flex items-center py-2.5 px-4 border-2 border-black rounded-lg text-sm font-medium text-black font-mono font-bold font-2xl bg-yellow-300  shadow-[4px_4px_0px_rgba(0,0,0,1)]"
          >
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
