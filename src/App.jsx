import { useState } from 'react'
import ModeSelector from './components/ModeSelector'
import Flashcard from './components/Flashcard'
import MultipleChoice from './components/MultipleChoice'
import TypeAnswer from './components/TypeAnswer'
import { vocabulary, shuffle } from './data/vocabulary'
import './App.css'

export default function App() {
  const [mode, setMode]   = useState(null)
  const [words, setWords] = useState([])
  const [index, setIndex] = useState(0)

  function startMode(m) {
    setWords(shuffle(vocabulary))
    setIndex(0)
    setMode(m)
  }

  function goHome() {
    setMode(null)
    setIndex(0)
  }

  const word = words[index]

  if (!mode) return <ModeSelector onSelect={startMode} />

  const shared = {
    word,
    index,
    total: words.length,
    onNext: () => setIndex(i => Math.min(i + 1, words.length - 1)),
    onPrev: () => setIndex(i => Math.max(i - 1, 0)),
    onHome: goHome,
  }

  if (mode === 'flashcard') return <Flashcard {...shared} />
  if (mode === 'multiple')  return <MultipleChoice {...shared} allWords={vocabulary} />
  if (mode === 'type')      return <TypeAnswer {...shared} />
}
