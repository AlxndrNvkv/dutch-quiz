function formatMonth(m) {
  const [year, month] = m.split('-')
  return new Date(year, month - 1).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

const PRESETS = [
  { id: 'all',     label: 'All words' },
  { id: 'latest',  label: 'Latest session' },
  { id: 'last3',   label: 'Last 3 months' },
  { id: 'last6',   label: 'Last 6 months' },
  { id: 'custom',  label: 'Custom range' },
]

export default function ModeSelector({
  onSelect,
  filter, onFilterChange,
  customFrom, onCustomFromChange,
  customTo,   onCustomToChange,
  filteredCount, allMonths,
}) {
  return (
    <div className="mode-selector">
      <div className="logo">🇳🇱</div>
      <h1>Dutch Speaking Club</h1>
      <p className="subtitle">
        {filteredCount} word{filteredCount !== 1 ? 's' : ''} ready to study
      </p>
      {allMonths.length > 0 && (
        <p className="vocab-updated">
          Updated: {formatMonth(allMonths[allMonths.length - 1])}
        </p>
      )}
      <p className="direction-badge">English → Dutch</p>

      <div className="filter-section">
        <div className="filter-label">Study set</div>
        <div className="filter-presets">
          {PRESETS.map(p => (
            <button
              key={p.id}
              className={`filter-preset${filter === p.id ? ' active' : ''}`}
              onClick={() => onFilterChange(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>

        {filter === 'custom' && (
          <div className="filter-custom">
            <label>From</label>
            <select value={customFrom} onChange={e => onCustomFromChange(e.target.value)}>
              <option value="">earliest</option>
              {allMonths.map(m => (
                <option key={m} value={m}>{formatMonth(m)}</option>
              ))}
            </select>
            <label>to</label>
            <select value={customTo} onChange={e => onCustomToChange(e.target.value)}>
              <option value="">latest</option>
              {allMonths.map(m => (
                <option key={m} value={m}>{formatMonth(m)}</option>
              ))}
            </select>
          </div>
        )}
      </div>

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
