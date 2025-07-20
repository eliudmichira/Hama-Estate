import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { SocketContextProvider } from './context/SocketContext';
import { LanguageProvider } from './lib/i18n.jsx';
import { Layout } from './routes/layout/layout';
import HomePage from './routes/homePage/HomePage';
import ListPage from './routes/listPage/listPage';
import PropertyDetails from './routes/propertyDetails/propertyDetails';
import Login from './routes/login/login';
import Register from './routes/register/register';
import ProfilePage from './routes/profilePage/ProfilePage';
import ProfileUpdatePage from './routes/profileUpdatePage/profileUpdatePage';
import NewPostPage from './routes/newPostPage/newPostPage';
import ContactPage from './routes/contact/contact';
import Dashboard from './routes/dashboard/dashboard';
import Favorites from './routes/favorites/favorites';
import SettingsPage from './routes/settings/settings';
import AdminPanel from './routes/admin/AdminPanel';
import AddProperty from './routes/properties/AddProperty';
import Messages from './routes/messages/Messages';
import AboutPage from './routes/about/AboutPage';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ThemeProvider>
          <SocketContextProvider>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="list" element={<ListPage />} />
                  <Route path="property/:id" element={<PropertyDetails />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="profile/update" element={<ProfileUpdatePage />} />
                  <Route path="new-post" element={<NewPostPage />} />
                  <Route path="add" element={<NewPostPage />} />
                  <Route path="properties/add" element={<AddProperty />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="admin" element={<AdminPanel />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="about" element={<AboutPage />} />
                </Route>
              </Routes>
            </Router>
          </SocketContextProvider>
        </ThemeProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;