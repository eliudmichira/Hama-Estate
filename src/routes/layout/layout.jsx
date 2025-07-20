import Navbar from "../../components/navbar/Navbar";
import { Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";
  
  return (
    <div className="layout min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">  
      {!hideNavbar && (
        <div className="navbar">
          <Navbar />
        </div>
      )}
      <div className={hideNavbar ? "content no-padding-top" : "content"}>
        <Outlet />
      </div>    
    </div>
  );
}

function RequireAuth() {
  const { currentUser, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="layout min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <div className="content flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  return !currentUser ? (
    <Navigate to="/login" replace />
  ) : (
    <div className="layout min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">  
      <div className="navbar">
        <Navbar />
      </div>  
      <div className="content">
        <Outlet />
      </div>    
    </div>
  );
}

export { Layout, RequireAuth };