import { useState, useRef, useEffect } from 'react'

function normalize(str) {
  return str.trim().toLowerCase()
    .replace(/[éèê]/g, 'e').replace(/[äà]/g, 'a').replace(/[ïî]/g, 'i')
    .replace(/[öô]/g, 'o').replace(/[ü]/g, 'u')
}

function isCorrect(input, word) {
  const userAnswer = normalize(input)
  // Accept any of the comma-separated answers
  const accepted = word.dutch.split(',').map(s => normalize(s.trim()))
  return accepted.some(a => a === userAnswer)
}

export default function TypeAnswer({ word, index, total, direction, onNext, onPrev, onHome }) {
  const [input, setInput]   = useState('')
  const [result, setResult] = useState(null) // null | 'correct' | 'wrong'
  const inputRef = useRef()

  useEffect(() => {
    setInput('')
    setResult(null)
    inputRef.current?.focus()
  }, [word])

  useEffect(() => {
    function onKey(e) {
      if (!result) return
      if (e.key === 'ArrowLeft'  && index > 0)         handlePrev()
      if (e.key === 'ArrowRight' && index < total - 1) handleNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [result, index, total])

  function check() {
    if (!input.trim()) return
    const answerField = direction === 'en-nl' ? 'dutch' : 'english'
    const accepted = word[answerField].split(',').map(s => normalize(s.trim()))
    setResult(accepted.some(a => a === normalize(input)) ? 'correct' : 'wrong')
  }

  function handleNext() {
    setInput('')
    setResult(null)
    onNext()
  }

  function handlePrev() {
    setInput('')
    setResult(null)
    onPrev()
  }

  return (
    <div className="quiz-screen">
      <div className="quiz-header">
        <button className="back-btn" onClick={onHome}>← Modes</button>
        <span className="counter">{index + 1} / {total}</span>
        <span className="mode-label">Type the Answer</span>
      </div>

      <div className="question-card">
        <span className="card-lang">{direction === 'en-nl' ? 'English' : 'Nederlands'}</span>
        <span className="question-word">{direction === 'en-nl' ? word.english : word.dutch}</span>
        <span className="card-hint">Enter to check · ← → to navigate after answering</span>
      </div>

      <div className="type-area">
        <input
          ref={inputRef}
          className={`type-input ${result === 'correct' ? 'input-correct' : result === 'wrong' ? 'input-wrong' : ''}`}
          type="text"
          placeholder={direction === 'en-nl' ? 'Type the Dutch word...' : 'Type the English word...'}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') result ? handleNext() : check() }}
          disabled={!!result}
        />
        {!result && (
          <button className="check-btn" onClick={check} disabled={!input.trim()}>Check</button>
        )}
      </div>

      {result && (
        <div className={`feedback ${result === 'correct' ? 'feedback-correct' : 'feedback-wrong'}`}>
          {result === 'correct' ? '✓ Correct!' : `✗ The answer is: ${direction === 'en-nl' ? word.dutch : word.english}`}
        </div>
      )}

      <div className="nav-buttons">
        <button className="nav-btn" onClick={handlePrev} disabled={index === 0}>← Previous</button>
        <button className="nav-btn primary" onClick={handleNext} disabled={index === total - 1}>Next →</button>
      </div>
    </div>
  )
}
