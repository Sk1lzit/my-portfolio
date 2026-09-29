import Link from "next/link";

export const metadata = {
  title: "Jarvis — локальный голосовой ассистент | Sk1lz",
  description:
    "Полностью офлайн голосовой ассистент на Python: Ollama, Whisper, Vosk, Silero TTS, SQLite. Wake-word «Джарвис», tool-calling, память, 3 режима характера.",
  openGraph: {
    title: "Jarvis — локальный голосовой ассистент",
    description:
      "Полностью офлайн ассистент: LLM, распознавание речи, синтез и память — всё на ноутбуке. Ни один запрос не уходит в интернет.",
    url: "https://my-portfolio-cskm.vercel.app/works/jarvis",
    images: ["/og-image.png"],
  },
};

export default function JarvisPage() {
  return (
    <article style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1rem" }}>
      <div style={{ marginBottom: "2rem", fontSize: "0.9rem" }}>
        <Link href="/works" style={{ color: "var(--purple-light)" }}>
          ← Назад к проектам
        </Link>
      </div>

      <header style={{ marginBottom: "3rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            color: "var(--purple-light)",
            marginBottom: "1rem",
          }}
        >
          🎙 Jarvis — локальный голосовой ассистент
        </h1>
        <div className="project-tags" style={{ marginBottom: "1.5rem" }}>
          {[
            "Python 3.12",
            "Ollama",
            "faster-whisper",
            "Vosk",
            "Silero TTS",
            "SQLite",
            "pycaw",
            "pyautogui",
          ].map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: 1.7 }}>
          Полностью офлайн голосовой ассистент. LLM, распознавание речи, синтез
          и память — всё крутится локально на ноутбуке. Ни один запрос во время
          работы не уходит в интернет.
        </p>
      </header>

      <section style={{ display: "grid", gap: "1.5rem", marginBottom: "3rem" }}>
        <div
          style={{
            borderLeft: "4px solid #ef4444",
            background: "rgba(239,68,68,0.05)",
            padding: "1.5rem",
            borderRadius: "0 12px 12px 0",
          }}
        >
          <div
            style={{
              color: "#f87171",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontSize: "0.85rem",
              marginBottom: "0.8rem",
            }}
          >
            ❌ Проблема
          </div>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
            Все существующие голосовые ассистенты (Siri, Alice, Google) требуют
            постоянного интернета, отправляют данные на сервера и не умеют
            работать с локальными файлами и приложениями. Нужен был ассистент,
            который полностью автономен, не сливает данные и управляет системой.
          </p>
        </div>

        <div
          style={{
            borderLeft: "4px solid #a78bfa",
            background: "rgba(167,139,250,0.05)",
            padding: "1.5rem",
            borderRadius: "0 12px 12px 0",
          }}
        >
          <div
            style={{
              color: "#a78bfa",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontSize: "0.85rem",
              marginBottom: "0.8rem",
            }}
          >
            💡 Решение
          </div>
          <div style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
            <p style={{ marginBottom: "1rem" }}>
              Разработал модульного ассистента на Python. Каждая подсистема —
              отдельный пакет:
            </p>
            <ul style={{ paddingLeft: "1.2rem", display: "grid", gap: "0.5rem" }}>
              <li>
                <strong>brain</strong> — LLM через Ollama (локально), история
                диалога, 3 режима характера (butler / brief / joker)
              </li>
              <li>
                <strong>ears</strong> — микрофон с VAD, wake-word «Джарвис» на
                Vosk с грамматикой, распознавание речи через faster-whisper
                (auto-detect языка — понимает смешанную русско-английскую речь)
              </li>
              <li>
                <strong>voice</strong> — Silero TTS, нормализация чисел через
                num2words, разбиение на фразы с паузами
              </li>
              <li>
                <strong>hands</strong> — tool-calling: открытие приложений,
                громкость (pycaw), скриншоты (pyautogui), файлы, время
              </li>
              <li>
                <strong>memory</strong> — SQLite с WAL: факты о пользователе,
                история диалога (200 последних), метаданные
              </li>
            </ul>
            <p style={{ marginTop: "1rem" }}>
              Прямые роутеры в обход LLM для предсказуемых команд (время, дата,
              «запомни ...») — экономят ресурсы и ускоряют отклик.
            </p>
          </div>
        </div>

        <div
          style={{
            borderLeft: "4px solid #34d399",
            background: "rgba(52,211,153,0.05)",
            padding: "1.5rem",
            borderRadius: "0 12px 12px 0",
          }}
        >
          <div
            style={{
              color: "#34d399",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontSize: "0.85rem",
              marginBottom: "0.8rem",
            }}
          >
            ✅ Результат
          </div>
          <ul
            style={{
              color: "var(--text-muted)",
              lineHeight: 1.7,
              paddingLeft: "1.2rem",
              display: "grid",
              gap: "0.5rem",
            }}
          >
            <li>Ни одного запроса в интернет во время работы — полный офлайн</li>
            <li>
              Wake-word «Джарвис» работает на CPU почти без нагрузки (Vosk с
              грамматикой игнорирует всё лишнее)
            </li>
            <li>Понимает смешанную русско-английскую речь</li>
            <li>3 режима характера: дворецкий, краткий, шутник</li>
            <li>Работает на ноутбуке без GPU (CPU-only)</li>
            <li>
              Модульная архитектура: любую подсистему можно заменить (Whisper →
              Whisper.cpp, Silero → другая TTS, Ollama → любая LLM)
            </li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            color: "var(--purple-light)",
            fontSize: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          🔧 Что было нетривиально
        </h2>
        <div style={{ display: "grid", gap: "1rem" }}>
          {[
            {
              title: "Python 3.14 несовместим с бинарными колёсами",
              text: "Поставили Python 3.12 рядом, не трогая системный.",
            },
            {
              title: "Ошибка CUDA: device kernel image is invalid",
              text: "Старый драйвер NVIDIA не тянул новые ядра Ollama. Обновили драйвер.",
            },
            {
              title: "Зацикливание LLM на длинных креативных запросах",
              text: "Добавили repeat_penalty, num_predict и жёсткие строки в system-промпт.",
            },
            {
              title: "Silero проглатывал цифры",
              text: "«29 сентября» превращалось в «сентября». Нормализация через num2words.",
            },
            {
              title: "SQLite падал из wake-word-потока",
              text: "check_same_thread=False + PRAGMA journal_mode=WAL.",
            },
            {
              title: "Регексы с буквой ё",
              text: "Заменили на str.find() в роутере памяти — работает стабильно.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "1.2rem",
              }}
            >
              <div style={{ color: "var(--purple-light)", fontWeight: 600, marginBottom: "0.4rem" }}>
                {item.title}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "2rem 0" }}>
        <Link href="/works" className="btn btn-primary">
          ← Все проекты
        </Link>
      </footer>
    </article>
  );
}