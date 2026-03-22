export interface HukamnamaData {
  date: string;
  ang: number | string;
  raag?: string;
  source?: string;
  gurmukhi: string[];
  english: string[];
  transliteration?: string[];
  raw?: unknown;
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

// Parse SikhNet response into our normalised shape
// SikhNet returns a rich JSON — we extract what we need
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseSikhNet(data: any, dateStr: string): HukamnamaData {
  const hukam = data?.hukamnama ?? data;

  const gurmukhiLines: string[] = [];
  const englishLines: string[] = [];
  const translitLines: string[] = [];

  // SikhNet structures verses under hukamnama.lines or hukamnama.verse
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lines: any[] =
    hukam?.lines ??
    hukam?.verse?.lines ??
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hukam?.shabads?.flatMap((s: any) => s.shabad?.map((v: any) => v) ?? []) ??
    [];

  for (const line of lines) {
    const gurmukhi =
      line?.gurmukhi?.unicode ??
      line?.gurmukhi?.akhar ??
      line?.naad?.gurbani ??
      "";
    const english =
      line?.translation?.english?.ssk ??
      line?.translation?.english?.bdb ??
      line?.translation?.en?.bdb ??
      "";
    const translit =
      line?.romanized ?? line?.transliteration ?? line?.roman ?? "";

    if (gurmukhi) gurmukhiLines.push(gurmukhi);
    if (english) englishLines.push(english);
    if (translit) translitLines.push(translit);
  }

  return {
    date: dateStr,
    ang: hukam?.ang ?? hukam?.sttm?.ang ?? hukam?.pageNo ?? "",
    raag: hukam?.raag?.unicode ?? hukam?.raag?.akhar ?? hukam?.raag ?? "",
    source: "SikhNet",
    gurmukhi: gurmukhiLines,
    english: englishLines,
    transliteration: translitLines.length > 0 ? translitLines : undefined,
    raw: data,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseSikhNetV2(data: any, dateStr: string): HukamnamaData {
  // Alternative SikhNet shape used by newer endpoints
  const payload = data?.data ?? data;
  const hukam = payload?.hukamnama ?? payload;

  const gurmukhiLines: string[] = [];
  const englishLines: string[] = [];
  const translitLines: string[] = [];

  const verses = hukam?.verses ?? hukam?.shabad ?? [];
  for (const verse of verses) {
    const g = verse?.gurmukhi ?? verse?.verse?.gurmukhi ?? "";
    const e =
      verse?.translation?.en?.bdb ??
      verse?.englishTranslation ??
      verse?.english ??
      "";
    const t = verse?.transliteration ?? verse?.roman ?? "";
    if (g) gurmukhiLines.push(g);
    if (e) englishLines.push(e);
    if (t) translitLines.push(t);
  }

  return {
    date: dateStr,
    ang: hukam?.ang ?? payload?.ang ?? "",
    raag: hukam?.raag ?? payload?.raag ?? "",
    source: "SikhNet",
    gurmukhi: gurmukhiLines,
    english: englishLines,
    transliteration: translitLines.length > 0 ? translitLines : undefined,
    raw: data,
  };
}

// Parse the akashdhami / SGPC fallback response
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseSGPC(data: any, dateStr: string): HukamnamaData {
  const gurmukhiLines: string[] = [];
  const englishLines: string[] = [];

  // Possible shapes from the SGPC proxy
  const lines =
    data?.hukamnama?.lines ??
    data?.lines ??
    data?.hukamnama?.shabad ??
    data?.shabad ??
    [];

  for (const line of lines) {
    const g =
      line?.gurmukhi?.unicode ??
      line?.gurmukhi ??
      line?.gurbani?.unicode ??
      line?.punjabi ??
      "";
    const e = line?.translation?.english ?? line?.english ?? "";
    if (g) gurmukhiLines.push(g);
    if (e) englishLines.push(e);
  }

  // Some SGPC responses have a single blob rather than per-line
  if (gurmukhiLines.length === 0) {
    const blob =
      data?.hukamnama?.gurmukhi ??
      data?.gurmukhi ??
      data?.hukamnama?.gurbani ??
      "";
    if (blob) {
      blob.split("\n").forEach((l: string) => {
        if (l.trim()) gurmukhiLines.push(l.trim());
      });
    }
    const eblob =
      data?.hukamnama?.translation ?? data?.translation ?? data?.english ?? "";
    if (eblob) {
      eblob.split("\n").forEach((l: string) => {
        if (l.trim()) englishLines.push(l.trim());
      });
    }
  }

  return {
    date: dateStr,
    ang: data?.hukamnama?.ang ?? data?.ang ?? data?.pageNo ?? "",
    raag: data?.hukamnama?.raag ?? data?.raag ?? "",
    source: "SGPC",
    gurmukhi: gurmukhiLines,
    english: englishLines,
    raw: data,
  };
}

export async function fetchHukamnama(
  date: Date = new Date()
): Promise<HukamnamaData> {
  const dateStr = formatDate(date);

  // --- Primary: SikhNet ---
  try {
    const res = await fetch(
      `https://www.sikhnet.com/hukam/fetchHukamnama?date=${dateStr}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error(`SikhNet HTTP ${res.status}`);
    const json = await res.json();

    // Try to detect which shape we got
    const parsed =
      json?.hukamnama?.verses != null || json?.data?.hukamnama?.verses != null
        ? parseSikhNetV2(json, dateStr)
        : parseSikhNet(json, dateStr);

    if (parsed.gurmukhi.length > 0) return parsed;
    throw new Error("SikhNet returned empty Gurmukhi");
  } catch {
    // --- Fallback: SGPC via akashdhami proxy ---
    const res = await fetch(
      `https://app.akashdhami.com/hukamnama/?date=${dateStr}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error(`SGPC HTTP ${res.status}`);
    const json = await res.json();
    return parseSGPC(json, dateStr);
  }
}
