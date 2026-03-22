"use client";

import { useState } from "react";
import type { HukamnamaData } from "@/lib/fetchHukamnama";

interface HukamCardProps {
  data: HukamnamaData;
}

export default function HukamCard({ data }: HukamCardProps) {
  const [showTranslit, setShowTranslit] = useState(false);
  const hasTranslit =
    data.transliteration && data.transliteration.length > 0;

  const maxLines = Math.max(data.gurmukhi.length, data.english.length);

  return (
    <article
      className="card-glow fade-in mx-auto w-full"
      style={{
        maxWidth: "720px",
        background: "var(--card-bg)",
        border: "1px solid var(--border-gold)",
        borderRadius: "16px",
        padding: "clamp(1.5rem, 4vw, 2.5rem)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Meta row */}
      <div
        className="flex flex-wrap gap-3 mb-6"
        style={{ justifyContent: "center" }}
      >
        {data.ang && (
          <MetaBadge label="Ang" value={String(data.ang)} />
        )}
        {data.raag && (
          <MetaBadge label="Raag" value={data.raag} lang="pa-Guru" />
        )}
        {data.source && (
          <MetaBadge label="Source" value={data.source} />
        )}
      </div>

      {/* Transliteration toggle */}
      {hasTranslit && (
        <div className="text-center mb-5">
          <button
            onClick={() => setShowTranslit((v) => !v)}
            aria-pressed={showTranslit}
            className="font-ui text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border transition-colors duration-200"
            style={{
              borderColor: "var(--border-gold)",
              color: showTranslit ? "var(--deep-blue)" : "var(--gold)",
              background: showTranslit ? "var(--gold)" : "transparent",
            }}
          >
            {showTranslit ? "Hide" : "Show"} Transliteration
          </button>
        </div>
      )}

      {/* Verses */}
      <div className="space-y-6">
        {Array.from({ length: maxLines }).map((_, i) => {
          const g = data.gurmukhi[i];
          const e = data.english[i];
          const t = data.transliteration?.[i];

          if (!g && !e) return null;

          return (
            <div key={i} className="verse-pair">
              {g && (
                <p
                  className="font-gurmukhi text-center mb-1"
                  style={{
                    fontSize: "clamp(1.4rem, 3vw, 1.875rem)",
                    color: "var(--cream)",
                  }}
                  lang="pa-Guru"
                >
                  {g}
                </p>
              )}
              {showTranslit && t && (
                <p
                  className="text-center italic mb-1"
                  style={{
                    fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
                    color: "var(--text-muted)",
                    fontFamily: "EB Garamond, serif",
                  }}
                >
                  {t}
                </p>
              )}
              {e && (
                <p
                  className="font-english text-center"
                  style={{
                    fontSize: "clamp(1rem, 2vw, 1.15rem)",
                    color: "var(--text-muted)",
                  }}
                >
                  {e}
                </p>
              )}
              {i < maxLines - 1 && (
                <div
                  className="mx-auto mt-4"
                  style={{
                    width: "60px",
                    height: "1px",
                    background:
                      "linear-gradient(90deg, transparent, var(--border-gold), transparent)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </article>
  );
}

function MetaBadge({
  label,
  value,
  lang,
}: {
  label: string;
  value: string;
  lang?: string;
}) {
  return (
    <span
      className="font-ui text-xs uppercase tracking-widest px-3 py-1 rounded-full"
      style={{
        border: "1px solid var(--border-gold)",
        color: "var(--accent)",
        background: "rgba(201, 147, 58, 0.08)",
      }}
    >
      <span style={{ color: "var(--text-muted)" }}>{label}:</span>{" "}
      <span lang={lang}>{value}</span>
    </span>
  );
}
