import React from 'react';
import './Header.css';

const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            <h1 className="header-title">🎫 Ticket Support System</h1>
            <p className="header-subtitle">Manage and track customer complaints efficiently</p>
          </div>
          
          {user && (
            <div className="header-right">
              <div className="user-info">
                <div className="user-details">
                  <span className="user-name">
                    Hello, {user.name}
                  </span>
                  <span className="user-email">
                    {user.email}
                  </span>
                </div>
                <button onClick={onLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;