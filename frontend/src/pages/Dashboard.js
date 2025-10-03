 import React, { useState, useEffect, useCallback } from 'react';
import API from '../api/axios';
import NoteCard from '../components/dashboard/NoteCard';
import NoteFormModal from '../components/dashboard/NoteFormModal';
import SearchBar from '../components/dashboard/SearchBar';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Spinner from '../components/common/Spinner';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
   const [noteToEdit, setNoteToEdit] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [filters, setFilters] = useState({});
  const [successMessage, setSuccessMessage] = useState(null); 
const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchNotes = useCallback(async (currentFilters) => {
    setLoading(true);
    setError(null);
    try {
      // Build query string from filters object
      const query = new URLSearchParams(currentFilters).toString();
      // ✅ FIX: Added /api prefix
      const res = await API.get(`/api/notes?${query}`); 
      setNotes(res.data);
    } catch (err) {
      setError('Failed to fetch notes.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes(filters);
  }, [fetchNotes, filters]);

  const handleOpenCreateModal = () => {
    setNoteToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (note) => {
    setNoteToEdit(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setNoteToEdit(null);
    setIsModalOpen(false);
    setError(null); // Clear modal-specific errors
  };
  
  const handleSearch = (newFilters) => {
    // Only update filters if they actually change
    if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
        setFilters(newFilters);
    }
  };

  // Corrected handleSubmitNote function
const handleSubmitNote = async (noteData, noteId) => {
    setError(null);
    setSuccessMessage(null); // Clear any old success message
    try {
        let res;
        let message; // Variable to hold the specific message
        
        if (noteId) {
            // Update
            // ✅ FIX: Added /api prefix
            res = await API.put(`/api/notes/${noteId}`, noteData); 
            setNotes(notes.map(note => note._id === noteId ? res.data : note));
            message = 'Note updated successfully!'; // ⬅️ Set Edit message
        } else {
            // Create
            // ✅ FIX: Added /api prefix
            res = await API.post('/api/notes', noteData);
            setNotes([res.data, ...notes]);
            message = 'Note created successfully!'; // ⬅️ Set Create message
        }
        
        handleCloseModal();
        
        // ⭐ SUCCESS MESSAGE ACTION ⭐
        setSuccessMessage(message); 
        setTimeout(() => setSuccessMessage(null), 3000); // Clear after 3 seconds

    } catch (err) {
        const errorMessage = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Action failed.';
        setError(errorMessage);
        console.error(err);
    }
};

// Corrected handleDeleteNote function
const handleDeleteNote = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
        setDeletingId(noteId);
        setSuccessMessage(null); // Clear any old success message
        try {
            // ✅ FIX: Added /api prefix
            await API.delete(`/api/notes/${noteId}`); 
            setNotes(notes.filter(note => note._id !== noteId));

            // ⭐ SUCCESS MESSAGE ACTION ⭐
            setSuccessMessage('Note deleted successfully!');
            setTimeout(() => setSuccessMessage(null), 3000); // Clear after 3 seconds
            
        } catch (err) {
            setError('Failed to delete note.');
            console.error(err);
        } finally {
            setDeletingId(null);
        }
    }
};
  
  const handleToggleComplete = async (note) => {
      try {
          const updatedNote = { ...note, isCompleted: !note.isCompleted };
          // ✅ FIX: Added /api prefix
          const res = await API.put(`/api/notes/${note._id}`, updatedNote); 
          setNotes(notes.map(n => n._id === note._id ? res.data : n));
      } catch (err) {
          setError('Failed to update note status.');
          console.error(err);
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-white">My Notes Dashboard</h1>
        <Button variant="primary" size="lg" onClick={handleOpenCreateModal}>
          + Create New Note
        </Button>
      </div>
      
      <SearchBar onSearch={handleSearch} filters={filters} />

      {error && (
        <Card className="bg-red-900/30 border-danger text-danger">
          <p>{error}</p>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center py-10">
          <Spinner className="w-10 h-10" />
        </div>
      ) : notes.length === 0 ? (
        <Card className="text-center py-10 text-gray-400">
          <h2 className="text-2xl font-semibold mb-2">No Notes Found</h2>
          <p>You currently have no notes matching your filters. Click 'Create New Note' to get started!</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map(note => (
            <NoteCard 
              key={note._id} 
              note={note} 
              onEdit={handleOpenEditModal} 
              onDelete={handleDeleteNote}
              onToggleComplete={handleToggleComplete}
              deletingId={deletingId}
            />
          ))}
        </div>
      )}
      
      <NoteFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        noteToEdit={noteToEdit}
        onSubmit={handleSubmitNote}
        loading={loading} // Reusing main loading state for simplicity
        error={error} // Displaying main error in modal too
      />
    </div>
  );
};

export default Dashboard;