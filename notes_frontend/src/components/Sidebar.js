import React from 'react';

/**
 * Sidebar navigation for the notes app.
 * Provides create note and theme toggling.
 * 
 * @param {object} props 
 * @param {function} props.onCreateNote - Callback to create a note.
 * @param {string} props.theme - Current theme.
 * @param {function} props.toggleTheme - Callback to toggle theme.
 */
function Sidebar({ onCreateNote, theme, toggleTheme }) {
  return (
    <aside
      className="Sidebar"
      style={{
        width: 220,
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-color)',
        padding: '1rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 20 }}>
        📝 My Notes
      </div>
      <button
        style={{
          width: '80%',
          marginBottom: 16,
          background: 'var(--button-bg)',
          color: 'var(--button-text)',
          border: 'none',
          borderRadius: 6,
          padding: '10px 0',
          fontWeight: 600,
          fontSize: 15,
          cursor: 'pointer',
        }}
        onClick={onCreateNote}
        aria-label="Create a new note"
      >
        + New Note
      </button>
      <button
        className="theme-toggle"
        style={{ marginTop: 'auto', marginBottom: 20, width: '80%' }}
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 'auto', marginBottom: 10 }}>
        <a href="https://supabase.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>Powered by Supabase</a>
      </div>
    </aside>
  );
}

export default Sidebar;
