import { useState, useEffect } from 'react'
import { getWrongOptions, shuffle } from '../data/vocabulary'

export default function MultipleChoice({ word, allWords, index, total, onNext, onPrev, onHome }) {
  const [options, setOptions]   = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const wrongs = getWrongOptions(word, allWords)
    setOptions(shuffle([word.dutch, ...wrongs]))
    setSelected(null)
  }, [word])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowLeft'  && index > 0)                    handlePrev()
      if (e.key === 'ArrowRight' && selected && index < total - 1) handleNext()
      const n = parseInt(e.key)
      if (n >= 1 && n <= options.length) pick(options[n - 1])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, total, selected, options])

  function pick(option) {
    if (selected) return
    setSelected(option)
  }

  function handleNext() {
    setSelected(null)
    onNext()
  }

  function handlePrev() {
    setSelected(null)
    onPrev()
  }

  function optionClass(opt) {
    if (!selected) return 'option'
    if (opt === word.dutch) return 'option correct'
    if (opt === selected) return 'option wrong'
    return 'option dimmed'
  }

  return (
    <div className="quiz-screen">
      <div className="quiz-header">
        <button className="back-btn" onClick={onHome}>← Modes</button>
        <span className="counter">{index + 1} / {total}</span>
        <span className="mode-label">Multiple Choice</span>
      </div>

      <div className="question-card">
        <span className="card-lang">English</span>
        <span className="question-word">{word.english}</span>
      </div>

      <div className="options-grid">
        {options.map((opt) => (
          <button key={opt} className={optionClass(opt)} onClick={() => pick(opt)}>
            {opt}
            {selected && opt === word.dutch && <span className="tick"> ✓</span>}
            {selected && opt === selected && opt !== word.dutch && <span className="cross"> ✗</span>}
          </button>
        ))}
      </div>

      {selected && (
        <div className={`feedback ${selected === word.dutch ? 'feedback-correct' : 'feedback-wrong'}`}>
          {selected === word.dutch ? '✓ Correct!' : `✗ The answer is: ${word.dutch}`}
        </div>
      )}

      <div className="nav-buttons">
        <button className="nav-btn" onClick={handlePrev} disabled={index === 0}>← Previous</button>
        <button className="nav-btn primary" onClick={handleNext} disabled={index === total - 1}>Next →</button>
      </div>
    </div>
  )
}
