export default function Footer() {
  return (
    <footer
      className="text-center px-4 py-10 mt-10"
      style={{ borderTop: "1px solid var(--border-gold)" }}
    >
      {/* Divider ornament */}
      <div
        className="font-gurmukhi mb-4 gold-glow"
        style={{ fontSize: "1.5rem", color: "var(--accent)" }}
        aria-hidden="true"
        lang="pa-Guru"
      >
        ੴ
      </div>

      <p
        className="font-english mb-2"
        style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}
      >
        Hukamnama is read daily from{" "}
        <strong style={{ color: "var(--cream)" }}>
          Sri Darbar Sahib, Amritsar
        </strong>
      </p>

      <p
        className="font-english mb-4"
        style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}
      >
        Source:{" "}
        <a
          href="https://api.banidb.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--gold)", textDecoration: "underline" }}
        >
          BaniDB
        </a>{" "}
        &amp;{" "}
        <a
          href="https://www.sikhnet.com/hukam"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--gold)", textDecoration: "underline" }}
        >
          SikhNet
        </a>{" "}
        &amp;{" "}
        <a
          href="https://www.sgpc.net"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--gold)", textDecoration: "underline" }}
        >
          SGPC
        </a>{" "}
        (Shiromani Gurdwara Parbandhak Committee)
      </p>

      <a
        href="https://www.sgpc.net/live/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-ui inline-block px-5 py-2 rounded-full transition-colors duration-200"
        style={{
          border: "1px solid var(--border-gold)",
          color: "var(--accent)",
          fontSize: "0.8rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          textDecoration: "none",
        }}
        aria-label="Watch Golden Temple live stream on SGPC website"
      >
        🔴 Golden Temple Live Stream
      </a>

      <p
        className="font-gurmukhi mt-6"
        style={{ fontSize: "1rem", color: "var(--text-muted)" }}
        lang="pa-Guru"
      >
        ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖ਼ਾਲਸਾ, ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫ਼ਤਹਿ 🙏
      </p>
    </footer>
  );
}
