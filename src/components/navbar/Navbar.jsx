import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from '../../context/ThemeContext';
import { 
  Building2, Menu, X, User, LogOut, Settings, 
  Moon, Sun, Plus, Search, ChevronRight 
} from "lucide-react";

const Navbar = () => {
  const auth = useAuth();
  const { currentUser, signOut, getUserDisplayName, getUserAvatar, getUserRole, loading } = auth || {};
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [avatarLoading, setAvatarLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.altKey && e.key === 'h') navigate('/');
      if (e.altKey && e.key === 'p' && currentUser) navigate('/profile');
      if (e.altKey && e.key === 'l') navigate('/list');
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate, currentUser]);

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchOpen && !event.target.closest('.search-container')) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

  // Don't render until auth context is ready
  if (loading || !auth) {
    return (
      <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-32 rounded"></div>
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-24 rounded"></div>
          </div>
        </div>
      </nav>
    );
  }

  // Only calculate isAdmin if we have the necessary functions
  const isAdmin = getUserRole ? getUserRole() === 'admin' : false;

  const handleLogout = () => {
    try {
      signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-20 backdrop-blur-xl bg-white/80 dark:bg-gray-800/90 border-b border-white/30 dark:border-gray-700 shadow-lg z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
          <span className="hidden md:block text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent dark:from-gray-100 dark:via-blue-200 dark:to-purple-200">
            Hama Estate
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/list" label="Properties" />
          <NavLink href="/about" label="About" />
          {currentUser && <NavLink href="/dashboard" label="Dashboard" />}
          <NavLink href="/contact" label="Contact" />
          {isAdmin && <NavLink href="/admin" label="Admin Panel" />}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="search-container relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700 transition-all duration-300"
            >
              <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            
            {searchOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors dark:bg-gray-700 dark:text-white"
                    autoFocus
                  />
                </div>
                <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  Press Enter to search
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700 transition-all duration-300"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>

          {/* Add Property Quick Action (for authenticated users) */}
          {currentUser && (
            <Link 
              to="/properties/add" 
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden lg:inline">Add Property</span>
            </Link>
          )}

          {/* User Menu */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={getUserAvatar() || `https://via.placeholder.com/32x32/6366f1/ffffff?text=${getUserDisplayName()?.charAt(0) || 'U'}`}
                    className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                    alt="User avatar"
                  />
                  {avatarLoading && (
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                  )}
                  {notifications > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications}
                    </div>
                  )}
                </div>
                <span className="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-200">
                  {getUserDisplayName()}
                </span>
              </button>

              {/* Dropdown Menu */}
              {open && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{getUserDisplayName()}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser.email}</p>
                  </div>
                  
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200"
                    >
                      <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Profile</span>
                    </Link>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-green-50 dark:hover:bg-gray-700 transition-all duration-200"
                    >
                      <Building2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Dashboard</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200"
                    >
                      <Settings className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Settings</span>
                    </Link>
                    {currentUser && (
                      <Link
                        to="/properties/add"
                        className="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-green-50 dark:hover:bg-gray-700 transition-all duration-200"
                      >
                        <Plus className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Add Property</span>
                      </Link>
                    )}
                    {isAdmin && (
                      <>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                        <Link
                          to="/admin"
                          className="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-purple-50 dark:hover:bg-gray-700 transition-all duration-200"
                        >
                          <Building2 className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-600">Admin Panel</span>
                        </Link>
                      </>
                    )}
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-red-50 dark:hover:bg-gray-700 transition-all duration-200 w-full text-left"
                    >
                      <LogOut className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-600">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-600 text-white text-sm font-semibold rounded-md shadow-md hover:shadow-lg hover:bg-blue-700 transition-all duration-200"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="hidden md:block px-3 py-1.5 md:px-4 md:py-2 bg-emerald-600 text-white text-sm font-semibold rounded-md shadow-md hover:shadow-lg hover:bg-emerald-700 transition-all duration-200"
              >
                Sign up
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {open ? (
              <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white dark:bg-gray-900/95 border-t border-gray-200/30 dark:border-gray-800 shadow-xl z-50 animate-in slide-in-from-top-2 duration-300">
          <div className="p-6 space-y-3">
            <MobileNavLink href="/list" label="Properties" onClick={() => setOpen(false)} />
            <MobileNavLink href="/about" label="About" onClick={() => setOpen(false)} />
            {currentUser && <MobileNavLink href="/dashboard" label="Dashboard" onClick={() => setOpen(false)} />}
            <MobileNavLink href="/contact" label="Contact" onClick={() => setOpen(false)} />
            {isAdmin && <MobileNavLink href="/admin" label="Admin Panel" onClick={() => setOpen(false)} />}

            {currentUser && (
              <Link
                to="/properties/add"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-600 text-white text-sm font-semibold rounded-md shadow-md hover:shadow-lg hover:bg-green-700 transition-all duration-200"
                onClick={() => setOpen(false)}
              >
                <Plus className="w-4 h-4" />
                <span>Add Property</span>
              </Link>
            )}

            {currentUser ? (
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                  <div className="relative">
                    <img
                      src={getUserAvatar() || `https://via.placeholder.com/40x40/6366f1/ffffff?text=${getUserDisplayName()?.charAt(0) || 'U'}`}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                      alt="User avatar"
                    />
                    {avatarLoading && (
                      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{getUserDisplayName()}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser.email}</p>
                    {notifications > 0 && (
                      <p className="text-xs text-red-500 font-medium">{notifications} new notifications</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="w-full px-4 py-3 bg-red-600 text-white text-sm font-semibold rounded-md shadow-md hover:shadow-lg hover:bg-red-700 transition-all duration-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-4 space-y-3">
                <Link
                  to="/login"
                  className="block w-full px-4 py-3 bg-blue-600 text-white text-sm font-semibold rounded-md shadow-md hover:shadow-lg hover:bg-blue-700 transition-all duration-200"
                  onClick={() => setOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="block w-full px-4 py-3 bg-emerald-600 text-white text-sm font-semibold rounded-md shadow-md hover:shadow-lg hover:bg-emerald-700 transition-all duration-200"
                  onClick={() => setOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, label }) {
  return (
    <Link
      to={href}
      className="relative px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group"
    >
      {label}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300" />
    </Link>
  );
}

function MobileNavLink({ href, label, onClick }) {
  return (
    <Link
      to={href}
      className="block px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-all duration-200"
      onClick={onClick}
    >
      {label}
    </Link>
  );
}

export default Navbar;