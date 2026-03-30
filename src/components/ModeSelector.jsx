export default function ModeSelector({ onSelect }) {
  return (
    <div className="mode-selector">
      <div className="logo">🇳🇱</div>
      <h1>Dutch Speaking Club</h1>
      <p className="subtitle">150+ words from the EPAM Dutch Speaking Club sessions</p>
      <p className="direction-badge">English → Dutch</p>

      <div className="mode-cards">
        <button className="mode-card" onClick={() => onSelect('flashcard')}>
          <span className="mode-icon">🃏</span>
          <span className="mode-title">Flashcards</span>
          <span className="mode-desc">Flip the card to reveal the Dutch word</span>
        </button>
        <button className="mode-card" onClick={() => onSelect('multiple')}>
          <span className="mode-icon">🎯</span>
          <span className="mode-title">Multiple Choice</span>
          <span className="mode-desc">Pick the correct Dutch translation from 4 options</span>
        </button>
        <button className="mode-card" onClick={() => onSelect('type')}>
          <span className="mode-icon">✍️</span>
          <span className="mode-title">Type the Answer</span>
          <span className="mode-desc">Type the Dutch translation yourself</span>
        </button>
      </div>
    </div>
  )
}
