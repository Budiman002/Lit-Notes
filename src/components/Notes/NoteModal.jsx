import { useEffect } from 'react';

function NoteModal({ note, isOpen, onClose, onArchive, onUnarchive, onDelete, isArchived = false }) {
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const handleArchive = async () => {
    const action = isArchived ? 'batalkan arsip' : 'arsipkan';
    if (window.confirm(`Yakin ingin ${action} catatan "${note.title}"?`)) {
      try {
        if (isArchived) {
          await onUnarchive(note.id);
        } else {
          await onArchive(note.id);
        }
        onClose();
      } catch (error) {
        console.error('Error handling archive:', error);
        alert('Gagal mengubah status arsip catatan');
      }
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Yakin ingin menghapus catatan "${note.title}"? Tindakan ini tidak dapat dibatalkan.`)) {
      onDelete(note.id);
      onClose();
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !note) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{note.title}</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="modal-body">
          <div className="note-meta">
            <p className="note-date">
              <strong>Dibuat:</strong> {formatDate(note.createdAt)}
            </p>
            {note.updatedAt && note.updatedAt !== note.createdAt && (
              <p className="note-date">
                <strong>Diupdate:</strong> {formatDate(note.updatedAt)}
              </p>
            )}
            <p className="note-status">
              <strong>Status:</strong> {isArchived ? 'Diarsipkan' : 'Aktif'}
            </p>
          </div>
          
          <div className="note-content">
            <h3>Isi Catatan:</h3>
            <div className="note-body-full">
              {note.body.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <div className="modal-actions">
            <button
              className={`btn ${isArchived ? 'btn-success' : 'btn-secondary'}`}
              onClick={handleArchive}
            >
              {isArchived ? '📤 Batalkan Arsip' : '📥 Arsipkan'}
            </button>
            <button
              className="btn btn-danger"
              onClick={handleDelete}
            >
              🗑️ Hapus
            </button>
            <button
              className="btn btn-primary"
              onClick={onClose}
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteModal;