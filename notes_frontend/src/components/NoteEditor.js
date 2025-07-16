import React, { useState, useEffect } from 'react';

/**
 * NoteEditor provides UI for viewing, editing, and deleting a note.
 * 
 * @param {object} props
 * @param {object} props.note - The note to edit.
 * @param {function} props.onUpdateNote - Callback when note is updated.
 * @param {function} props.onDeleteNote - Callback when note is deleted.
 */
function NoteEditor({ note, onUpdateNote, onDeleteNote }) {
  const [title, setTitle] = useState(note.title || '');
  const [content, setContent] = useState(note.content || '');

  useEffect(() => {
    setTitle(note.title || '');
    setContent(note.content || '');
  }, [note]);

  // PUBLIC_INTERFACE
  /**
   * Handle changes and propagate update
   */
  const handleSave = () => {
    if (title.trim() === '') return; // Prevent empty titles
    onUpdateNote({ ...note, title, content });
  };

  // PUBLIC_INTERFACE
  /**
   * Immediate save on blur or Enter for instant feedback.
   */
  const handleTitleBlur = () => {
    handleSave();
  };
  const handleContentBlur = () => {
    handleSave();
  };
  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
      e.target.blur();
    }
  };
  const handleDelete = () => {
    if (window.confirm('Delete this note? This cannot be undone.')) {
      onDeleteNote(note.id);
    }
  };

  return (
    <div className="NoteEditor" style={{ padding: '2rem', height: '100%' }}>
      <input
        style={{
          fontSize: 22,
          fontWeight: 700,
          border: 'none',
          borderBottom: '2px solid var(--border-color)',
          background: 'transparent',
          color: 'var(--text-primary)',
          outline: 'none',
          marginBottom: '1rem',
          width: '100%',
        }}
        value={title}
        placeholder="Title"
        onChange={e => setTitle(e.target.value)}
        onBlur={handleTitleBlur}
        onKeyDown={handleTitleKeyDown}
      />
      <textarea
        style={{
          resize: 'vertical',
          width: '100%',
          minHeight: 180,
          border: '1px solid var(--border-color)',
          background: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          fontSize: 15,
          borderRadius: 6,
          padding: '12px',
          outline: 'none',
          marginBottom: '1rem',
          boxSizing: 'border-box',
        }}
        value={content}
        placeholder="Write something..."
        onChange={e => setContent(e.target.value)}
        onBlur={handleContentBlur}
      />
      <button
        type="button"
        onClick={handleDelete}
        style={{
          background: 'var(--button-bg)',
          color: 'var(--button-text)',
          border: 'none',
          borderRadius: 6,
          padding: '8px 20px',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          marginTop: 10,
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default NoteEditor;
