import { useState, useEffect } from 'react'

export default function Flashcard({ word, index, total, direction, onNext, onPrev, onHome }) {
  const [flipped, setFlipped] = useState(false)

  function handleNext() {
    setFlipped(false)
    setTimeout(onNext, 150)
  }

  function handlePrev() {
    setFlipped(false)
    setTimeout(onPrev, 150)
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight' && index < total - 1) handleNext()
      if (e.key === 'ArrowLeft'  && index > 0)         handlePrev()
      if (e.key === ' ')                                setFlipped(f => !f)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, total])

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
            <span className="card-lang">{direction === 'en-nl' ? 'English' : 'Nederlands'}</span>
            <span className="card-word">{direction === 'en-nl' ? word.english : word.dutch}</span>
            <span className="card-hint">Click or Space to flip · ← → to navigate</span>
          </div>
          <div className="card-back">
            <span className="card-lang">{direction === 'en-nl' ? 'Nederlands' : 'English'}</span>
            <span className="card-word">{direction === 'en-nl' ? word.dutch : word.english}</span>
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
