import { useEffect, useState } from "react";

function App() {
  const [mode, setMode] = useState(null); // "one" | "three" | null
  const [cards, setCards] = useState([]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // загружаем cards.json один раз
  useEffect(() => {
    async function loadCards() {
      try {
        setLoading(true);
        const res = await fetch("/cards.json");
        const data = await res.json();
        setCards(data.cards || []);
      } catch (e) {
        setError("Не удалось загрузить колоду.");
      } finally {
        setLoading(false);
      }
    }
    loadCards();
  }, []);

  function drawOne() {
    if (!cards.length) return;
    const idx = Math.floor(Math.random() * cards.length);
    setDrawnCards([cards[idx]]);
    setMode("one");
  }

  function drawThree() {
    if (cards.length < 3) return;
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setDrawnCards(shuffled.slice(0, 3));
    setMode("three");
  }

  const isRootScreen = mode === null;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#050816",
        color: "#f5f5f5",
      }}
    >
      <div
        style={{
          maxWidth: 520,
          width: "100%",
          padding: "24px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>Путь Алзара</h1>
        <p style={{ fontSize: 14, opacity: 0.8, marginBottom: 24 }}>
          Это не гадание, а способ выбрать один маленький шаг, который можно сделать сегодня.
        </p>

        {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}
        {loading && <p>Загружаю колоду…</p>}

        {isRootScreen && (
          <>
            <p style={{ marginBottom: 16 }}>Выбери формат:</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                onClick={drawOne}
                style={{
                  padding: "12px 16px",
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                1 карта
              </button>
              <button
                onClick={drawThree}
                style={{
                  padding: "12px 16px",
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                3 карты
              </button>
            </div>
          </>
        )}

        {mode && drawnCards.length > 0 && (
          <div
            style={{
              marginTop: 24,
              display: "grid",
              gap: 16,
              textAlign: "left",
            }}
          >
            {drawnCards.map((card) => (
              <div
                key={card.id}
                style={{
                  background: "#0b1020",
                  borderRadius: 16,
                  padding: 16,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
                }}
              >
                <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>
                  Уровень {card.level} · область {card.sphere}
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                  {card.title}
                </div>
                <div style={{ marginBottom: 8 }}>{card.short_text}</div>
                <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 6 }}>
                  <span style={{ fontWeight: 600 }}>Игра Нокшара:</span> {card.nokshar_game}
                </div>
                <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 6 }}>
                  <span style={{ fontWeight: 600 }}>Арена:</span> {card.arena}
                </div>
                <div style={{ fontSize: 14, marginTop: 4 }}>
                  <span style={{ fontWeight: 600 }}>Маленький шаг:</span> {card.small_step}
                </div>
              </div>
            ))}
          </div>
        )}

        {mode && (
          <button
            onClick={() => {
              setMode(null);
              setDrawnCards([]);
            }}
            style={{
              marginTop: 24,
              fontSize: 12,
              background: "transparent",
              border: "none",
              color: "#999",
              cursor: "pointer",
            }}
          >
            ◀ Назад
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
