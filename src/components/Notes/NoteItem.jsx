function NoteItem({ note, onArchive, onUnarchive, onDelete, isArchived = false, onViewDetail }) {
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
      } catch (error) {
        console.error('Error handling archive:', error);
        alert('Gagal mengubah status arsip catatan');
      }
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Yakin ingin menghapus catatan "${note.title}"? Tindakan ini tidak dapat dibatalkan.`)) {
      onDelete(note.id);
    }
  };

  return (
    <div className="note-item card" onClick={() => onViewDetail && onViewDetail(note)}>
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-actions">
          <button
            className={`btn ${isArchived ? 'btn-success' : 'btn-secondary'}`}
            onClick={(e) => { e.stopPropagation(); handleArchive(); }}
            title={isArchived ? 'Batalkan arsip' : 'Arsipkan catatan'}
          >
            {isArchived ? '📤' : '📥'}
          </button>
          <button
            className="btn btn-danger"
            onClick={(e) => { e.stopPropagation(); handleDelete(); }}
            title="Hapus catatan"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div className="note-meta">
        <small className="note-date">
          Dibuat: {formatDate(note.createdAt)}
        </small>
      </div>
      
      <div className="note-body">
        <p>{note.body}</p>
      </div>
    </div>
  );
}

export default NoteItem;