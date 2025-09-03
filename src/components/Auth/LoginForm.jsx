import { useState } from 'react';
import useInput from '../../hooks/useInput';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../Common/LoadingSpinner';

function LoginForm({ onSwitchToRegister }) {
  const [email, onEmailChange, resetEmail] = useInput('');
  const [password, onPasswordChange, resetPassword] = useInput('');
  
  const { login, isLoading } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validasi
    if (!email.trim() || !password.trim()) {
      setError('Email dan password harus diisi');
      return;
    }

    const result = await login({
      email: email.trim(),
      password
    });

    if (!result.success) {
      setError('Email atau password salah');
      resetPassword();
    } else {
      // Login berhasil, AuthContext akan handle redirect
      resetEmail();
      resetPassword();
    }
  };

  return (
    <div className="auth-form">
      <h2 className="auth-title">Masuk ke Akun</h2>
      
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={onEmailChange}
            placeholder="contoh@email.com"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={onPasswordChange}
            placeholder="Masukkan password"
            disabled={isLoading}
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary auth-submit-btn"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner size="small" /> : 'Masuk'}
        </button>
      </form>

      <div className="auth-switch">
        <p>
          Belum punya akun?{' '}
          <button 
            type="button" 
            className="link-btn"
            onClick={onSwitchToRegister}
            disabled={isLoading}
          >
            Daftar di sini
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;