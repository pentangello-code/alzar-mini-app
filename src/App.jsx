import { useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import cardsData from './data/cards.json'
import './App.css'


function App() {
  const [currentCard, setCurrentCard] = useState(null)
  const [showDetails, setShowDetails] = useState(false)


  const allCards = cardsData.cards


  const handleDrawCard = () => {
    const randomIndex = Math.floor(Math.random() * allCards.length)
    const card = allCards[randomIndex]
    setCurrentCard(card)
    setShowDetails(false)
  }


  const handleShowDetails = () => {
    setShowDetails(true)
  }


  const handleBack = () => {
    setShowDetails(false)
  }


  return (
    <div className="app-root">
      <div className="app-container">


        {!currentCard && (
          <div className="screen screen-start">
            <h1 className="app-title">КАРТЫ ВОЛИ АЛЗАРА</h1>
            <button className="primary-button" onClick={handleDrawCard}>
              Вытянуть карту
            </button>
          </div>
        )}


        {currentCard && !showDetails && (
          <div className="screen screen-card">
            <div className="card-image-wrapper">
              <img
                src={`/cards/${currentCard.filename}`}
                alt={currentCard.title}
                className="card-image"
              />
            </div>
            <div className="card-meta">
              {currentCard.short_text && (
                <p className="card-short">{currentCard.short_text}</p>
              )}
            </div>
            <div className="card-actions">
              <button className="secondary-button" onClick={handleDrawCard}>
                Другая карта
              </button>
              <button className="primary-button" onClick={handleShowDetails}>
                Подробнее
              </button>
            </div>
          </div>
        )}


        {currentCard && showDetails && (
          <div className="screen screen-details">
            <div className="details-header">
              <button className="ghost-button" onClick={handleBack}>
                ← Назад
              </button>
            </div>


            <div className="details-content">
              <div className="card-pill">
                {currentCard.level} · {currentCard.sphere}
              </div>
              <h2 className="card-title">{currentCard.title}</h2>


              {currentCard.full_text && (
                <div className="details-block">
                  <h3 className="details-subtitle">Смысл карты</h3>
                  <p className="details-text">{currentCard.full_text}</p>
                </div>
              )}


              {currentCard.practice && (
                <div className="details-block">
                  <h3 className="details-subtitle">Практика</h3>
                  <p className="details-text">{currentCard.practice}</p>
                </div>
              )}


              {!currentCard.full_text && !currentCard.practice && (
                <p className="details-text muted">
                  Подробное описание этой карты пока в разработке.
                </p>
              )}
            </div>


            <div className="card-actions bottom">
              <button className="secondary-button" onClick={handleDrawCard}>
                Другая карта
              </button>
            </div>
          </div>
        )}


      </div>
      <Analytics />
    </div>
  )
}


export default App
