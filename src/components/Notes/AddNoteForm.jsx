import { useState } from 'react';
import useInput from '../../hooks/useInput';
import LoadingSpinner from '../Common/LoadingSpinner';

function AddNoteForm({ onAddNote, isLoading }) {
  const [title, onTitleChange, resetTitle] = useInput('');
  const [body, onBodyChange, resetBody] = useInput('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validasi
    if (!title.trim()) {
      setError('Judul catatan harus diisi');
      return;
    }

    if (!body.trim()) {
      setError('Isi catatan harus diisi');
      return;
    }

    const result = await onAddNote({
      title: title.trim(),
      body: body.trim()
    });

    if (result.success) {
      resetTitle();
      resetBody();
      setError('');
    } else {
      setError('Gagal menambah catatan');
    }
  };

  return (
    <div className="add-note-form">
      <h3 className="form-title">Tambah Catatan Baru</h3>
      
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="noteTitle" className="form-label">Judul</label>
          <input
            type="text"
            id="noteTitle"
            className="form-input"
            value={title}
            onChange={onTitleChange}
            placeholder="Masukkan judul catatan"
            disabled={isLoading}
            maxLength={50}
          />
          <small className="char-count">{title.length}/50</small>
        </div>

        <div className="form-group">
          <label htmlFor="noteBody" className="form-label">Isi Catatan</label>
          <textarea
            id="noteBody"
            className="form-input form-textarea"
            value={body}
            onChange={onBodyChange}
            placeholder="Tulis isi catatan di sini..."
            disabled={isLoading}
            rows={6}
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isLoading || !title.trim() || !body.trim()}
        >
          {isLoading ? <LoadingSpinner size="small" /> : 'Tambah Catatan'}
        </button>
      </form>
    </div>
  );
}

export default AddNoteForm;