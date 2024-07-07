import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Navbar.css';
import logo from './logo.png';

const Navbar = ({ onSearch }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="nav">
      <Link to="/">
        <img className="nav__logo" src={logo} alt="Logo" />
      </Link>
      <form className="nav__search" onSubmit={(e) => e.preventDefault()}>
        <input
          className="nav__search-field"
          type="text"
          placeholder="Search"
          onChange={onSearch}
        />
        <Link className="nav__filter-btn" to="/filter">Filter</Link>
      </form>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
