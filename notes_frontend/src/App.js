import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import { createClient } from '@supabase/supabase-js';

// PUBLIC_INTERFACE
/**
 * Main App component for the Notes application.
 * Handles theme, Supabase connection, and rendering layout.
 */
function App() {
  const [theme, setTheme] = useState('light');
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(false);

  // Supabase client initialization from .env vars
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Fetch notes on startup
  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line
  }, []);

  // PUBLIC_INTERFACE
  /**
   * Toggle between light and dark themes.
   */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // PUBLIC_INTERFACE
  /**
   * Fetches notes from Supabase and updates state.
   */
  const fetchNotes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('updated_at', { ascending: false });
    if (!error) {
      setNotes(data);
      if (data.length > 0 && !selectedNote) {
        setSelectedNote(data[0]);
      }
    }
    setLoading(false);
  };

  // PUBLIC_INTERFACE
  /**
   * Create a new note and select it.
   */
  const handleCreateNote = async () => {
    const { data, error } = await supabase
      .from('notes')
      .insert([
        {
          title: 'Untitled Note',
          content: '',
        },
      ])
      .select();
    if (!error && data && data.length > 0) {
      setNotes([data[0], ...notes]);
      setSelectedNote(data[0]);
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Update a note both locally and in Supabase.
   * @param {object} updatedNote - The updated note object.
   */
  const handleUpdateNote = async (updatedNote) => {
    setNotes(notes =>
      notes.map(note => (note.id === updatedNote.id ? updatedNote : note))
    );
    setSelectedNote(updatedNote);
    await supabase
      .from('notes')
      .update({
        title: updatedNote.title,
        content: updatedNote.content,
        updated_at: new Date().toISOString(),
      })
      .eq('id', updatedNote.id);
    fetchNotes(); // To ensure order is preserved
  };

  // PUBLIC_INTERFACE
  /**
   * Delete a note from Supabase and update local state.
   * @param {number} id - The ID of the note to delete.
   */
  const handleDeleteNote = async (id) => {
    await supabase.from('notes').delete().eq('id', id);
    const filtered = notes.filter(note => note.id !== id);
    setNotes(filtered);
    if (filtered.length > 0) {
      setSelectedNote(filtered[0]);
    } else {
      setSelectedNote(null);
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Select a note for viewing/editing.
   * @param {object} note - The note to select.
   */
  const handleSelectNote = (note) => {
    setSelectedNote(note);
  };

  return (
    <div className="NotesApp-Root" style={{ display: 'flex', height: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <Sidebar
        onCreateNote={handleCreateNote}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main className="MainContainer" style={{ flex: 1, background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column' }}>
        <NoteList
          notes={notes}
          onSelectNote={handleSelectNote}
          selectedNote={selectedNote}
          loading={loading}
        />
        <div style={{ flex: 1, padding: 0, margin: 0 }}>
          {selectedNote ? (
            <NoteEditor
              note={selectedNote}
              onUpdateNote={handleUpdateNote}
              onDeleteNote={handleDeleteNote}
            />
          ) : (
            <div style={{ padding: '2rem', color: 'var(--text-secondary)' }}>
              <em>No note selected.</em>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
