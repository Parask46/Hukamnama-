"use client";

interface HeaderProps {
  date: Date;
}

const PUNJABI_MONTHS = [
  "ਜਨਵਰੀ", "ਫ਼ਰਵਰੀ", "ਮਾਰਚ", "ਅਪ੍ਰੈਲ", "ਮਈ", "ਜੂਨ",
  "ਜੁਲਾਈ", "ਅਗਸਤ", "ਸਤੰਬਰ", "ਅਕਤੂਬਰ", "ਨਵੰਬਰ", "ਦਸੰਬਰ",
];

const PUNJABI_WEEKDAYS = [
  "ਐਤਵਾਰ", "ਸੋਮਵਾਰ", "ਮੰਗਲਵਾਰ", "ਬੁੱਧਵਾਰ",
  "ਵੀਰਵਾਰ", "ਸ਼ੁੱਕਰਵਾਰ", "ਸ਼ਨੀਵਾਰ",
];

export default function Header({ date }: HeaderProps) {
  const englishDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const punjabiDate = `${PUNJABI_WEEKDAYS[date.getDay()]}, ${date.getDate()} ${PUNJABI_MONTHS[date.getMonth()]} ${date.getFullYear()}`;

  return (
    <header className="text-center py-10 px-4">
      {/* Ik Onkar */}
      <div
        className="font-gurmukhi gold-glow select-none"
        style={{
          fontSize: "72px",
          color: "var(--accent)",
          marginBottom: "0.25rem",
          lineHeight: 1.2,
        }}
        aria-label="Ik Onkar — One God"
        role="img"
      >
        ੴ
      </div>

      {/* Site title */}
      <h1
        className="font-ui tracking-widest uppercase mb-1"
        style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "var(--gold)" }}
      >
        Hukamnama
      </h1>

      <p
        className="font-gurmukhi mb-3"
        style={{ fontSize: "1.1rem", color: "var(--text-muted)" }}
        lang="pa-Guru"
      >
        ਹੁਕਮਨਾਮਾ — ਸ੍ਰੀ ਦਰਬਾਰ ਸਾਹਿਬ
      </p>

      {/* Divider */}
      <div
        className="mx-auto mb-4"
        style={{
          width: "120px",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, var(--gold), transparent)",
        }}
      />

      {/* Dates */}
      <time
        dateTime={date.toISOString().split("T")[0]}
        className="block"
      >
        <span
          className="font-ui block"
          style={{ fontSize: "1rem", color: "var(--cream)", letterSpacing: "0.08em" }}
        >
          {englishDate}
        </span>
        <span
          className="font-gurmukhi block mt-1"
          style={{ fontSize: "1rem", color: "var(--text-muted)" }}
          lang="pa-Guru"
        >
          {punjabiDate}
        </span>
      </time>
    </header>
  );
}
