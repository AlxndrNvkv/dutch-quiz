import { useState } from 'react'

export default function Flashcard({ word, index, total, onNext, onPrev, onHome }) {
  const [flipped, setFlipped] = useState(false)

  function handleNext() {
    setFlipped(false)
    setTimeout(onNext, 150)
  }

  function handlePrev() {
    setFlipped(false)
    setTimeout(onPrev, 150)
  }

  return (
    <div className="quiz-screen">
      <div className="quiz-header">
        <button className="back-btn" onClick={onHome}>← Modes</button>
        <span className="counter">{index + 1} / {total}</span>
        <span className="mode-label">Flashcards</span>
      </div>

      <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(f => !f)}>
        <div className="card-inner">
          <div className="card-front">
            <span className="card-lang">English</span>
            <span className="card-word">{word.english}</span>
            <span className="card-hint">Click to flip</span>
          </div>
          <div className="card-back">
            <span className="card-lang">Nederlands</span>
            <span className="card-word">{word.dutch}</span>
          </div>
        </div>
      </div>

      <div className="nav-buttons">
        <button className="nav-btn" onClick={handlePrev} disabled={index === 0}>← Previous</button>
        <button className="nav-btn primary" onClick={handleNext} disabled={index === total - 1}>Next →</button>
      </div>
    </div>
  )
}
