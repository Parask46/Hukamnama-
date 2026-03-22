interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      className="mx-auto w-full text-center fade-in"
      style={{
        maxWidth: "720px",
        background: "rgba(13,27,42,0.85)",
        border: "1px solid rgba(201, 147, 58, 0.2)",
        borderRadius: "16px",
        padding: "clamp(2rem, 6vw, 3.5rem)",
      }}
      role="alert"
      aria-live="assertive"
    >
      <div
        style={{ fontSize: "3rem", marginBottom: "1rem" }}
        aria-hidden="true"
      >
        🙏
      </div>

      <h2
        className="font-ui mb-2"
        style={{
          fontSize: "1.25rem",
          color: "var(--gold)",
          letterSpacing: "0.05em",
        }}
      >
        Unable to Fetch Hukamnama
      </h2>

      <p
        className="font-english mb-1"
        style={{ color: "var(--cream)", fontSize: "1rem" }}
      >
        {message ?? "Please check your connection and try again."}
      </p>

      <p
        className="font-gurmukhi mb-6"
        style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}
        lang="pa-Guru"
      >
        ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖ਼ਾਲਸਾ, ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫ਼ਤਹਿ
      </p>

      <button
        onClick={onRetry}
        className="font-ui uppercase tracking-widest px-6 py-2 rounded-full transition-colors duration-200"
        style={{
          border: "1px solid var(--gold)",
          color: "var(--deep-blue)",
          background: "var(--gold)",
          cursor: "pointer",
          fontSize: "0.85rem",
        }}
        aria-label="Retry loading Hukamnama"
      >
        Retry
      </button>
    </div>
  );
}
