"use client";

interface DateNavProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

function toDateString(d: Date): string {
  return d.toISOString().split("T")[0];
}

function addDays(d: Date, n: number): Date {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + n);
  return copy;
}

export default function DateNav({ currentDate, onDateChange }: DateNavProps) {
  const todayStr = toDateString(new Date());
  const currentStr = toDateString(currentDate);
  const isToday = currentStr === todayStr;

  const handlePrev = () => onDateChange(addDays(currentDate, -1));
  const handleNext = () => onDateChange(addDays(currentDate, 1));
  const handleToday = () => onDateChange(new Date());

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) return;
    // parse as local date to avoid timezone shift
    const [y, m, d] = val.split("-").map(Number);
    onDateChange(new Date(y, m - 1, d));
  };

  const btnBase: React.CSSProperties = {
    background: "transparent",
    border: "1px solid var(--border-gold)",
    color: "var(--accent)",
    borderRadius: "8px",
    padding: "0.45rem 1rem",
    cursor: "pointer",
    fontFamily: "Cinzel, serif",
    fontSize: "0.85rem",
    letterSpacing: "0.05em",
    transition: "background 0.2s, color 0.2s",
  };

  const arrowBtn: React.CSSProperties = {
    ...btnBase,
    padding: "0.45rem 0.85rem",
    fontSize: "1.1rem",
    lineHeight: 1,
  };

  return (
    <nav
      aria-label="Date navigation"
      className="flex flex-wrap items-center justify-center gap-3 my-6 px-4"
    >
      <button
        onClick={handlePrev}
        style={arrowBtn}
        aria-label="Previous day"
        title="Previous day"
      >
        ←
      </button>

      <input
        type="date"
        value={currentStr}
        max={todayStr}
        onChange={handleDateInput}
        aria-label="Select date"
        style={{
          ...btnBase,
          padding: "0.45rem 0.65rem",
          background: "rgba(13,27,42,0.8)",
          color: "var(--cream)",
          fontFamily: "EB Garamond, serif",
          fontSize: "0.95rem",
        }}
      />

      <button
        onClick={handleNext}
        disabled={isToday}
        style={{
          ...arrowBtn,
          opacity: isToday ? 0.35 : 1,
          cursor: isToday ? "not-allowed" : "pointer",
        }}
        aria-label="Next day"
        title="Next day"
      >
        →
      </button>

      {!isToday && (
        <button
          onClick={handleToday}
          style={btnBase}
          aria-label="Go to today"
        >
          Today
        </button>
      )}
    </nav>
  );
}
