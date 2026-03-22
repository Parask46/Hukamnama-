"use client";

import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import HukamCard from "@/components/HukamCard";
import DateNav from "@/components/DateNav";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorState from "@/components/ErrorState";
import Footer from "@/components/Footer";
import type { HukamnamaData } from "@/lib/fetchHukamnama";

export default function HukamnamaPage() {
  const [date, setDate] = useState<Date>(() => new Date());
  const [data, setData] = useState<HukamnamaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (d: Date) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const dateStr = d.toISOString().split("T")[0];
      const res = await fetch(`/api/hukamnama?date=${dateStr}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? `Server error ${res.status}`);
      }
      const json: HukamnamaData = await res.json();
      setData(json);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch Hukamnama"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(date);
  }, [date, load]);

  const handleDateChange = (d: Date) => {
    setDate(d);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--deep-blue)",
      }}
    >
      <main
        style={{
          flex: 1,
          maxWidth: "860px",
          margin: "0 auto",
          width: "100%",
          padding: "0 1rem",
        }}
      >
        <Header date={date} />

        <DateNav currentDate={date} onDateChange={handleDateChange} />

        <div style={{ marginBottom: "3rem" }}>
          {loading && <LoadingSkeleton />}
          {!loading && error && (
            <ErrorState message={error} onRetry={() => load(date)} />
          )}
          {!loading && data && <HukamCard data={data} />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
