function CardsList({ cards }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {cards.map((card) => (
        <li
          key={card.id}
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '80px', // место под будущую картинку
          }}
        >
          <div
            style={{
              fontSize: '20px',
              fontWeight: 600,
              marginBottom: '12px',
            }}
          >
            {card.title}
          </div>

          <div
            style={{
              maxWidth: '260px',
              fontSize: '14px',
              lineHeight: 1.5,
              marginBottom: '16px',
            }}
          >
            {card.short_text}
          </div>

          <div
            style={{
              maxWidth: '260px',
              fontSize: '12px',
              lineHeight: 1.5,
              fontStyle: 'italic',
              marginBottom: '4px',
              opacity: 0.9,
            }}
          >
            Игра Нокшара: {card.nokshar_game}
          </div>
          <div
            style={{
              maxWidth: '260px',
              fontSize: '12px',
              lineHeight: 1.5,
              fontStyle: 'italic',
              opacity: 0.9,
            }}
          >
            Арена: {card.arena}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default CardsList
