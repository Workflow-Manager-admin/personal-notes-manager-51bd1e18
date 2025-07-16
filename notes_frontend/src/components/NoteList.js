import React from 'react';

/**
 * NoteList displays all notes and allows selection.
 * 
 * @param {object} props 
 * @param {Array} props.notes - Array of notes.
 * @param {Function} props.onSelectNote - Select note callback.
 * @param {object|null} props.selectedNote - Currently selected note.
 * @param {boolean} props.loading - If notes are loading.
 */
function NoteList({ notes, onSelectNote, selectedNote, loading }) {
  return (
    <div
      className="NoteList"
      style={{
        borderBottom: '1px solid var(--border-color)',
        background: 'var(--bg-primary)',
        maxHeight: 250,
        overflowX: 'auto',
        display: 'flex',
        gap: 0,
        alignItems: 'stretch',
      }}
    >
      {loading ? (
        <div style={{ padding: '1.5rem', color: 'var(--text-secondary)' }}>Loading…</div>
      ) : notes.length === 0 ? (
        <div style={{ padding: '1.5rem', color: 'var(--text-secondary)' }}>No notes yet.</div>
      ) : (
        notes.map(note => (
          <button
            key={note.id}
            onClick={() => onSelectNote(note)}
            style={{
              flex: '0 0 180px',
              background: selectedNote && selectedNote.id === note.id
                ? 'var(--bg-secondary)'
                : 'var(--bg-primary)',
              fontWeight: selectedNote && selectedNote.id === note.id ? 600 : 400,
              border: 'none',
              borderRight: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              textAlign: 'left',
              padding: '1rem',
              cursor: 'pointer',
              outline: selectedNote && selectedNote.id === note.id ? '2px solid var(--button-bg)' : 'none',
              transition: 'background 0.2s, outline 0.2s',
              height: '100%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            aria-selected={selectedNote && selectedNote.id === note.id}
          >
            <div style={{ fontWeight: 600, fontSize: 16 }}>
              {note.title || <em>Untitled</em>}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
              {note.updated_at ? (new Date(note.updated_at)).toLocaleString() : ''}
            </div>
          </button>
        ))
      )}
    </div>
  );
}

export default NoteList;
