import { useState } from 'react'
import './App.css'
import alzarData from './data/alzar_66_full.json'
import CardsList from './components/CardsList'

function App() {
  const allCards = alzarData.cards
  const [cards, setCards] = useState([])
  const [theme, setTheme] = useState('light') // 'light' или 'dark'

  const showOneRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * allCards.length)
    setCards([allCards[randomIndex]])
  }

  const showThreeRandomCards = () => {
    const shuffled = [...allCards].sort(() => Math.random() - 0.5)
    setCards(shuffled.slice(0, 3))
  }

  const resetToStart = () => {
    setCards([])
  }

  const hasCard = cards.length > 0
  const isLight = theme === 'light'

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className={`app-root app-root-${theme}`}>
      <div className={`app-card app-card-${theme}`}>
        {/* Тоггл темы */}
        <div className="app-theme-toggle">
          <button
            className="theme-toggle-button"
            onClick={toggleTheme}
            aria-label="Переключить тему"
          >
            {isLight ? '🌙' : '☀️'}
          </button>
        </div>

        {!hasCard && (
          <>
            <h1 className="app-title">Космические карты Алзара</h1>
            <p className="app-subtitle">
              Нажми, чтобы вытянуть одну карту или три и посмотреть на свой текущий узел цикла.
            </p>

            <div className="app-buttons">
              <button className="app-button" onClick={showOneRandomCard}>
                Вытянуть 1 карту
              </button>
            </div>

            <div className="app-buttons" style={{ marginTop: '8px' }}>
              <button
                className="app-button app-button-secondary"
                onClick={showThreeRandomCards}
              >
                Вытянуть 3 карты
              </button>
            </div>
          </>
        )}

        {hasCard && (
          <>
            <CardsList cards={cards} />

            <div className="app-buttons">
              <button
                className="app-button app-button-secondary"
                onClick={resetToStart}
              >
                Назад
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
