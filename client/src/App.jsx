import { useState, useEffect, useRef } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './pages/Home/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Dresses from './pages/Dresses'
import UserDashboard from './pages/UserDashboard';
import DressDashboard from './pages/DressDashboard';
import Planning from './pages/Planning';

//* admin components
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDressDashboard from './pages/admin/AdminDressDashboard';
import AdminPackages from './pages/admin/AdminPackages';
import AdminGallery from './pages/admin/AdminGallery';

import { useAuthStore } from './store/authStore';

function App() {
  const [loading, setLoading] = useState(true);
  const cursorRef = useRef(null);

  const checkAuth = useAuthStore((s) => s.checkAuth);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const moveCursor = (e) => {
      setTimeout(() => {
        if (cursorRef.current) {
          
          cursorRef.current.style.left = `${e.clientX}px`;
          cursorRef.current.style.top = `${e.clientY}px`;
        }
      }, 100);
    };

    document.addEventListener('mousemove', moveCursor);
    return () => document.removeEventListener('mousemove', moveCursor);
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div ref={cursorRef} className="cursor-dot"></div>
        <div className="loader">
          <div className="text"><span>Loading</span></div>
          <div className="text"><span>Loading</span></div>
          <div className="text"><span>Loading</span></div>
          <div className="text"><span>Loading</span></div>
          <div className="text"><span>Loading</span></div>
          <div className="text"><span>Loading</span></div>
          <div className="text"><span>Loading</span></div>
          <div className="text"><span>Loading</span></div>
          <div className="text"><span>Loading</span></div>
          <div className="line"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div ref={cursorRef} className="cursor-dot"></div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dresses" element={<Dresses />} />

        {/* admin */}
        <Route
          path="/admin"
          element={
            isAuthenticated && isAdmin ? (
              <AdminDashboard />
            ) : ( 
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/dresses"
          element={
            isAuthenticated && isAdmin ? (
              <AdminDressDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/packages"
          element={
            isAuthenticated && isAdmin ? (
              <AdminPackages />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
          <Route
          path="/admin/gallery"
          element={
            isAuthenticated && isAdmin ? (
              <AdminGallery />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        {/* ____________ */}

        <Route
          path="/profile/:id"
          element={
            isAuthenticated ? (
              <UserDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path='/dress/:id'
          element={
            <DressDashboard />
          }
        />
        <Route path='/planning'
          element={
            <Planning />
          }
        />
      </Routes>

      
    </div>
  );
}

export default App;
