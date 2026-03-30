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

export default function TypeAnswer({ word, index, total, onNext, onPrev, onHome }) {
  const [input, setInput]   = useState('')
  const [result, setResult] = useState(null) // null | 'correct' | 'wrong'
  const inputRef = useRef()

  useEffect(() => {
    setInput('')
    setResult(null)
    inputRef.current?.focus()
  }, [word])

  function check() {
    if (!input.trim()) return
    setResult(isCorrect(input, word) ? 'correct' : 'wrong')
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
        <span className="card-lang">English</span>
        <span className="question-word">{word.english}</span>
      </div>

      <div className="type-area">
        <input
          ref={inputRef}
          className={`type-input ${result === 'correct' ? 'input-correct' : result === 'wrong' ? 'input-wrong' : ''}`}
          type="text"
          placeholder="Type the Dutch word..."
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
          {result === 'correct' ? '✓ Correct!' : `✗ The answer is: ${word.dutch}`}
        </div>
      )}

      <div className="nav-buttons">
        <button className="nav-btn" onClick={handlePrev} disabled={index === 0}>← Previous</button>
        <button className="nav-btn primary" onClick={handleNext} disabled={index === total - 1}>Next →</button>
      </div>
    </div>
  )
}
