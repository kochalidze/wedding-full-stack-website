import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { useAuthStore } from '../store/authStore';

//* import icons
import { FaRegUser } from "react-icons/fa";

//* import styles
import './componentsStyle/Navbar.css';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userDashboardNavigate = useNavigate();

  const homeNavigate = useNavigate();

  const goToProfile = () => {
    if (!user?.id) return;
    userDashboardNavigate(`/profile/${user.id}`);
  };

  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isAdmin = useAuthStore((s) => s.isAdmin);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = useMemo(() => {
    const baseItems = [
      { to: '/', label: 'მთავარი' },
      { to: '/dresses', label: 'კაბები' },
      { to: '/gallery', label: 'გალერეა' },
      { to: '/decorations', label: 'დეკორაციები' },
      { to: '/about', label: 'ჩვენს შესახებ' },
      { to: '/contact', label: 'კონტაქტი' },
    ];

    if (isAuthenticated && isAdmin) {
      return [
        ...baseItems,
        { to: '/admin', label: 'ადმინი' },
      ];
    }

    return baseItems;
  }, [isAuthenticated, isAdmin]);

  return (
    <div className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
      <h1 className="navbar-title" onClick={() => homeNavigate('/')}>
        Wedding
      </h1>

      <button
        type="button"
        className={`burger-menu ${isMenuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className="nav-links">
        {navItems.map((item) => (
        //   <li key={item.to}>
        //     <Link to={item.to} onClick={closeMenu}>
        //       {item.label}
        //     </Link>
        //   </li>
		<li key={item.to}>
			<NavLink
				to={item.to}
				onClick={closeMenu}
				className={({ isActive }) => (isActive ? 'active' : '')}
			>
				{item.label}
			</NavLink>
		</li>
        ))}
      </ul>

      <div className="nav-buttons">
        {isAuthenticated ? (
          <div className="user-profile-section">
            <div className="profile-circle">

              <FaRegUser
                size={'25px'}
                className='user-icon'
                onClick={goToProfile}
              />
            </div>

            {/* <div className="user-info-dropdown">
              <span className="user-email">{user?.email}</span>
            </div> */}
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/register" className="nav-button">
              რეგისტრაცია
            </Link>
            <Link to="/login" className="nav-button">
              შესვლა
            </Link>
          </div>
        )}
         {/* <div className="auth-buttons">
            <Link to="/register" className="nav-button">
              რეგისტრაცია
            </Link>
            <Link to="/login" className="nav-button">
              შესვლა
            </Link>
          </div> */}
      </div>
    </div>
  );
}

export default NavBar;