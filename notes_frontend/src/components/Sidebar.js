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
      {/* Top: Brand and New Note */}
      <div style={{ width: '100%' }}>
        <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 20, textAlign: 'center' }}>
          📝 My Notes
        </div>
        <button
          style={{
            width: '80%',
            margin: '0 auto 16px auto',
            display: 'block',
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
      </div>
      
      {/* Spacer to push the toggle and footer down */}
      <div style={{ flexGrow: 1, width: '100%' }} />

      {/* Theme Toggle at bottom */}
      <button
        className="theme-toggle"
        style={{
          width: '80%',
          margin: '0 auto 16px auto',
          display: 'block',
          background: 'var(--button-bg)',
          color: 'var(--button-text)',
          border: 'none',
          borderRadius: 8,
          padding: '10px 0',
          fontWeight: 600,
          fontSize: 14,
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0,0,0,0.07)',
          position: 'relative'
        }}
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10, textAlign: 'center' }}>
        <a href="https://supabase.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>Powered by Supabase</a>
      </div>
    </aside>
  );
}

export default Sidebar;
