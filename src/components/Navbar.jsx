import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { setUserLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    setUserLogin(null);
    navigate("/auth/login");
  };
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-[#7F265B]">
          Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#7F265B] transition-colors"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
