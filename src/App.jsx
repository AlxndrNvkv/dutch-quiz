import { useState, useMemo } from 'react'
import ModeSelector from './components/ModeSelector'
import Flashcard from './components/Flashcard'
import MultipleChoice from './components/MultipleChoice'
import TypeAnswer from './components/TypeAnswer'
import { vocabulary, shuffle } from './data/vocabulary'
import './App.css'

const ALL_MONTHS = [...new Set(vocabulary.map(w => w.month))].sort()

function applyFilter(vocab, filter, customFrom, customTo) {
  if (filter === 'all') return vocab
  const latest = ALL_MONTHS.at(-1)
  if (filter === 'latest') return vocab.filter(w => w.month === latest)
  if (filter === 'last3') {
    const cutoff = ALL_MONTHS[Math.max(0, ALL_MONTHS.length - 3)]
    return vocab.filter(w => w.month >= cutoff)
  }
  if (filter === 'last6') {
    const cutoff = ALL_MONTHS[Math.max(0, ALL_MONTHS.length - 6)]
    return vocab.filter(w => w.month >= cutoff)
  }
  if (filter === 'custom') {
    return vocab.filter(w =>
      (!customFrom || w.month >= customFrom) &&
      (!customTo   || w.month <= customTo)
    )
  }
  return vocab
}

export default function App() {
  const [mode, setMode]           = useState(null)
  const [words, setWords]         = useState([])
  const [index, setIndex]         = useState(0)
  const [filter, setFilter]       = useState('all')
  const [customFrom, setCustomFrom] = useState('')
  const [customTo,   setCustomTo]   = useState('')

  const filteredVocabulary = useMemo(
    () => applyFilter(vocabulary, filter, customFrom, customTo),
    [filter, customFrom, customTo]
  )

  function startMode(m) {
    setWords(shuffle(filteredVocabulary))
    setIndex(0)
    setMode(m)
  }

  function goHome() {
    setMode(null)
    setIndex(0)
  }

  const word = words[index]

  if (!mode) return (
    <ModeSelector
      onSelect={startMode}
      filter={filter}
      onFilterChange={setFilter}
      customFrom={customFrom}
      onCustomFromChange={setCustomFrom}
      customTo={customTo}
      onCustomToChange={setCustomTo}
      filteredCount={filteredVocabulary.length}
      allMonths={ALL_MONTHS}
    />
  )

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
