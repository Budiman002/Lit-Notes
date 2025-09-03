import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            <h1 className="app-title">📱Notes App</h1>
            {isAuthenticated && user && (
              <span className="user-greeting">Hello, {user.name}!</span>
            )}
          </div>
          
          <div className="header-right">
            <button 
              className="theme-toggle btn btn-secondary"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            
            {isAuthenticated && (
              <button 
                className="btn btn-danger logout-btn"
                onClick={logout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;