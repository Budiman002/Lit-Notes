import { useState } from 'react';
import useInput from '../../hooks/useInput';
import { register } from '../../utils/network-data';
import LoadingSpinner from '../Common/LoadingSpinner';

function RegisterForm({ onSwitchToLogin }) {
  const [name, onNameChange, resetName] = useInput('');
  const [email, onEmailChange, resetEmail] = useInput('');
  const [password, onPasswordChange, resetPassword] = useInput('');
  const [confirmPassword, onConfirmPasswordChange, resetConfirmPassword] = useInput('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validasi
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Semua field harus diisi');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      return;
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await register({
        name: name.trim(),
        email: email.trim(),
        password
      });

      if (!result.error) {
        setSuccess('Registrasi berhasil! Silakan login.');
        resetName();
        resetEmail();
        resetPassword();
        resetConfirmPassword();
        
        // Auto switch to login after successful registration
        setTimeout(() => {
          onSwitchToLogin();
        }, 2000);
      } else {
        setError('Registrasi gagal. Coba lagi.');
      }
    } catch (err) {
      setError('Terjadi kesalahan jaringan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2 className="auth-title">Daftar Akun Baru</h2>
      
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Nama</label>
          <input
            type="text"
            id="name"
            className="form-input"
            value={name}
            onChange={onNameChange}
            placeholder="Masukkan nama lengkap"
            disabled={isLoading}
          />
        </div>

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
            placeholder="Minimal 6 karakter"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Konfirmasi Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-input"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            placeholder="Ulangi password"
            disabled={isLoading}
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary auth-submit-btn"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner size="small" /> : 'Daftar'}
        </button>
      </form>

      <div className="auth-switch">
        <p>
          Sudah punya akun?{' '}
          <button 
            type="button" 
            className="link-btn"
            onClick={onSwitchToLogin}
            disabled={isLoading}
          >
            Masuk di sini
          </button>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;