import { useState, useEffect } from 'react';
import { 
  getActiveNotes, 
  getArchivedNotes, 
  addNote, 
  archiveNote, 
  unarchiveNote, 
  deleteNote 
} from '../utils/network-data';

function useNotes() {
  const [activeNotes, setActiveNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch active notes
  const fetchActiveNotes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getActiveNotes();
      if (!result.error) {
        setActiveNotes(result.data);
      } else {
        setError('Failed to fetch active notes');
      }
    } catch (err) {
      setError('Network error while fetching active notes');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch archived notes
  const fetchArchivedNotes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getArchivedNotes();
      if (!result.error) {
        setArchivedNotes(result.data);
      } else {
        setError('Failed to fetch archived notes');
      }
    } catch (err) {
      setError('Network error while fetching archived notes');
    } finally {
      setIsLoading(false);
    }
  };

  // Add new note
  const createNote = async (noteData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await addNote(noteData);
      if (!result.error) {
        await fetchActiveNotes(); // Refresh active notes
        return { success: true, data: result.data };
      } else {
        setError('Failed to create note');
        return { success: false };
      }
    } catch (err) {
      setError('Network error while creating note');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  // Archive a note
  const archiveNoteHandler = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await archiveNote(id);
      if (!result.error) {
        await fetchActiveNotes();
        await fetchArchivedNotes();
        return { success: true };
      } else {
        setError('Failed to archive note');
        return { success: false };
      }
    } catch (err) {
      setError('Network error while archiving note');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  // Unarchive a note
  const unarchiveNoteHandler = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await unarchiveNote(id);
      if (!result.error) {
        // Refresh both lists immediately
        await Promise.all([fetchActiveNotes(), fetchArchivedNotes()]);
        return { success: true };
      } else {
        setError('Gagal membatalkan arsip catatan');
        return { success: false };
      }
    } catch (err) {
      setError('Network error while unarchiving note');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a note
  const deleteNoteHandler = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await deleteNote(id);
      if (!result.error) {
        await fetchActiveNotes();
        await fetchArchivedNotes();
        return { success: true };
      } else {
        setError('Failed to delete note');
        return { success: false };
      }
    } catch (err) {
      setError('Network error while deleting note');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveNotes();
    fetchArchivedNotes();
  }, []);

  return {
    activeNotes,
    archivedNotes,
    isLoading,
    error,
    fetchActiveNotes,
    fetchArchivedNotes,
    createNote,
    archiveNote: archiveNoteHandler,
    unarchiveNote: unarchiveNoteHandler,
    deleteNote: deleteNoteHandler,
    refreshNotes: () => {
      fetchActiveNotes();
      fetchArchivedNotes();
    }
  };
}

export default useNotes;