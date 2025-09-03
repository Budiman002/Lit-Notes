import NoteItem from './NoteItem';

function NotesList({
    notes,
    onArchive,
    onUnarchive,
    onDelete,
    onViewDetail,
    isArchived = false,
    title,
    emptyMessage,
}) {
    if (notes.length === 0) {
        return(
            <div className="notes-section">
                <h2 className="section-title">{title}</h2>
                <div className="empty-state">
                    <p className="empty-message">{emptyMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="notes-section">
            <h2 className="section-title">
                {title} ({notes.length})
            </h2>
            <div className="notes-grid">
                {notes.map((note) => (
                    <NoteItem
                        key={note.id}
                        note={note}
                        onArchive={onArchive}
                        onUnarchive={onUnarchive}
                        onDelete={onDelete}
                        onViewDetail={onViewDetail}
                        isArchived={isArchived}
                    />
                ))}
            </div>
        </div>
    );
}

export default NotesList;