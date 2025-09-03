import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import AuthPage from './components/Auth/AuthPage';
import NotesPage from './components/Notes/NotesPage';
import PrivateRoute from './components/Common/PrivateRoute';
import LoadingSpinner from './components/Common/LoadingSpinner';
import './styles/index.css';
import './styles/theme.css';
import './styles/components.css';

function AppContent(){
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading){
    return(
    <div className="app-loading">
      <LoadingSpinner size="large" message="Memuat Aplikasi..." />
    </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {isAuthenticated ? (
          <PrivateRoute>
            <NotesPage />
          </PrivateRoute>
        ): (
         < AuthPage />
        )}
      </main>
    </div>
  );
}

function App(){
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;