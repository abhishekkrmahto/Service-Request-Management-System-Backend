import { useState } from "react";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import ServicemanPage from "./pages/ServicemanPage";
import UserPage from "./pages/UserPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("user"); // "home" | "admin" | "serviceman" | "user"
  const [loggedInRole, setLoggedInRole] = useState(null);

  const handleLogin = (role) => {
    setLoggedInRole(role);
    if (role === "admin") setCurrentPage("admin");
    else if (role === "serviceman") setCurrentPage("serviceman");
    else setCurrentPage("user");
  };

  const handleLogout = () => {
    setLoggedInRole(null);
    setCurrentPage("home");
  };

  return (
    <>
      {currentPage === "home" && <HomePage onLogin={handleLogin} />}
      {currentPage === "admin" && <AdminPage onLogout={handleLogout} />}
      {currentPage === "serviceman" && <ServicemanPage onLogout={handleLogout} />}
      {currentPage === "user" && <UserPage onLogout={handleLogout} />}
    </>
  );
}
