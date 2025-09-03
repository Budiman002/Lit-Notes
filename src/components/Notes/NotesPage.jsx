import { useState } from 'react';
import AddNoteForm from './AddNoteForm';
import NotesList from './NoteList';
import NoteModal from './NoteModal';
import LoadingSpinner from '../Common/LoadingSpinner';
import useNotes from '../../hooks/useNote';

function NotesPage(){
    const [activeTab, setActiveTab] = useState('active');
    const [selectedNote, setSelectedNote] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const{
        activeNotes,
        archivedNotes,
        isLoading,
        error,
        createNote,
        archiveNote,
        unarchiveNote,
        deleteNote
    } = useNotes();

    const handleAddNote = async (noteData) => {
        return await createNote(noteData);
    };

    const handleArchiveNote = async (id) => {
        return await archiveNote(id);
    };

    const handleUnarchiveNote = async (id) => {
        return await unarchiveNote(id);
    };

    const handleDeleteNote = async (id) => {
        return await deleteNote(id);
    };

    const handleViewDetail = (note) => {
        setSelectedNote(note);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedNote(null);
    };

    return (
        <div className="notes-page">
            <div className="container">
                {/* Add Note Form */}
            <div className="add-note-section">
                <AddNoteForm 
                    onAddNote={handleAddNote}
                    isLoading={isLoading}
                />
            </div>

                {/* Error Display */}
                {error && (
                    <div className="alert alert-error">
                        {error}
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="loading-section">
                        <LoadingSpinner message="Memuat Catatan..."/>
                    </div>
                )}

                {/* Tabs */}
                <div className="notes-tabs">
                    <button className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
                    onClick={() => setActiveTab('active')}>

                        Catatan Aktif ({activeNotes.length})
                    </button>

                    <button className={`tab-btn ${activeTab === 'archived' ? 'active' : ''}`}
                    onClick={() => setActiveTab('archived')}>
                        Catatan Diarsipkan ({archivedNotes.length})
                    </button>
                </div>

                {/* Notes Content */}
                <div className="notes-content">
                    {activeTab === 'active' ? (
                        <NotesList 
                            notes={activeNotes}
                            onArchive={handleArchiveNote}
                            onUnarchive={handleUnarchiveNote}
                            onDelete={handleDeleteNote}
                            onViewDetail={handleViewDetail}
                            isArchived={false}
                            title="Catatan Aktif"
                            emptyMessage="Tidak ada catatan aktif."
                        />
                    ) : (
                        <NotesList
                        notes={archivedNotes}
                        onArchive={handleArchiveNote}
                        onUnarchive={handleUnarchiveNote}
                        onDelete={handleDeleteNote}
                        onViewDetail={handleViewDetail}
                        isArchived={true}
                        title="Catatan Diarsipkan"
                        emptyMessage="Tidak ada catatan diarsipkan."
                        />
                    )}
                </div>
            </div>
            
            {/* Modal */}
            <NoteModal
                note={selectedNote}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onArchive={handleArchiveNote}
                onUnarchive={handleUnarchiveNote}
                onDelete={handleDeleteNote}
                isArchived={selectedNote && archivedNotes.some(n => n.id === selectedNote.id)}
            />
        </div>
    );
}

export default NotesPage;