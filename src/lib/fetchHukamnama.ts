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

// Parse BaniDB v2 response — primary source
// https://api.banidb.com/v2/hukamnamas/today  or  /v2/hukamnamas/YYYY/MM/DD
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseBaniDB(data: any, dateStr: string): HukamnamaData {
  const hukam = data?.hukamnama ?? data;

  const gurmukhiLines: string[] = [];
  const englishLines: string[] = [];
  const translitLines: string[] = [];

  // BaniDB shape: hukamnama.shabads[].shabad.lines[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shabads: any[] = hukam?.shabads ?? [];
  for (const s of shabads) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lines: any[] = s?.shabad?.lines ?? [];
    for (const line of lines) {
      const g: string =
        line?.verse?.unicode ?? line?.verse?.gurmukhi ?? "";
      // Only English translation — no Hindi/Punjabi
      const e: string =
        line?.translation?.en?.bdb ??
        line?.translation?.en?.ssk ??
        line?.translation?.en?.ms ??
        "";
      const t: string =
        line?.transliteration?.english?.ssk ??
        line?.transliteration?.english?.ipa ??
        "";
      if (g) gurmukhiLines.push(g);
      if (e) englishLines.push(e);
      if (t) translitLines.push(t);
    }
  }

  const firstShabad = shabads[0]?.shabad;
  const ang =
    hukam?.ang ??
    firstShabad?.bani?.source?.pageNo ??
    "";
  const raag =
    firstShabad?.bani?.raag?.unicode ??
    firstShabad?.bani?.chapter?.unicode ??
    hukam?.raag ??
    "";

  return {
    date: dateStr,
    ang,
    raag,
    source: "BaniDB",
    gurmukhi: gurmukhiLines,
    english: englishLines,
    transliteration: translitLines.length > 0 ? translitLines : undefined,
    raw: data,
  };
}

// Parse SikhNet response — first fallback
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseSikhNet(data: any, dateStr: string): HukamnamaData {
  const hukam = data?.hukamnama ?? data;

  const gurmukhiLines: string[] = [];
  const englishLines: string[] = [];
  const translitLines: string[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lines: any[] =
    hukam?.lines ??
    hukam?.verse?.lines ??
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hukam?.shabads?.flatMap((s: any) => s.shabad?.map((v: any) => v) ?? []) ??
    [];

  for (const line of lines) {
    const g: string =
      line?.gurmukhi?.unicode ??
      line?.gurmukhi?.akhar ??
      line?.naad?.gurbani ??
      "";
    // Only English translation — no Hindi/Punjabi
    const e: string =
      line?.translation?.english?.ssk ??
      line?.translation?.english?.bdb ??
      line?.translation?.en?.bdb ??
      "";
    const t: string =
      line?.romanized ?? line?.transliteration ?? line?.roman ?? "";

    if (g) gurmukhiLines.push(g);
    if (e) englishLines.push(e);
    if (t) translitLines.push(t);
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
  const payload = data?.data ?? data;
  const hukam = payload?.hukamnama ?? payload;

  const gurmukhiLines: string[] = [];
  const englishLines: string[] = [];
  const translitLines: string[] = [];

  const verses = hukam?.verses ?? hukam?.shabad ?? [];
  for (const verse of verses) {
    const g: string = verse?.gurmukhi ?? verse?.verse?.gurmukhi ?? "";
    // Only English translation — no Hindi/Punjabi
    const e: string =
      verse?.translation?.en?.bdb ??
      verse?.englishTranslation ??
      verse?.english ??
      "";
    const t: string = verse?.transliteration ?? verse?.roman ?? "";
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

// Parse SGPC / akashdhami proxy response — last resort fallback
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseSGPC(data: any, dateStr: string): HukamnamaData {
  const gurmukhiLines: string[] = [];
  const englishLines: string[] = [];

  const lines =
    data?.hukamnama?.lines ??
    data?.lines ??
    data?.hukamnama?.shabad ??
    data?.shabad ??
    [];

  for (const line of lines) {
    const g: string =
      line?.gurmukhi?.unicode ??
      line?.gurmukhi ??
      line?.gurbani?.unicode ??
      line?.punjabi ??
      "";
    // Only English translation — no Hindi/Punjabi
    const e: string = line?.translation?.english ?? line?.english ?? "";
    if (g) gurmukhiLines.push(g);
    if (e) englishLines.push(e);
  }

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
    // Only English translation — no Hindi/Punjabi
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

  // BaniDB uses YYYY/MM/DD path segments; "today" shortcut is also valid
  const today = formatDate(new Date());
  const baniDbPath =
    dateStr === today
      ? "today"
      : dateStr.replace(/-/g, "/");

  // --- Primary: BaniDB ---
  try {
    const res = await fetch(
      `https://api.banidb.com/v2/hukamnamas/${baniDbPath}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error(`BaniDB HTTP ${res.status}`);
    const json = await res.json();
    const parsed = parseBaniDB(json, dateStr);
    if (parsed.gurmukhi.length > 0) return parsed;
    throw new Error("BaniDB returned empty Gurmukhi");
  } catch {
    // --- First fallback: SikhNet ---
    try {
      const res = await fetch(
        `https://www.sikhnet.com/hukam/fetchHukamnama?date=${dateStr}`,
        { next: { revalidate: 3600 } }
      );
      if (!res.ok) throw new Error(`SikhNet HTTP ${res.status}`);
      const json = await res.json();
      const parsed =
        json?.hukamnama?.verses != null ||
        json?.data?.hukamnama?.verses != null
          ? parseSikhNetV2(json, dateStr)
          : parseSikhNet(json, dateStr);
      if (parsed.gurmukhi.length > 0) return parsed;
      throw new Error("SikhNet returned empty Gurmukhi");
    } catch {
      // --- Last resort: SGPC via akashdhami proxy ---
      const res = await fetch(
        `https://app.akashdhami.com/hukamnama/?date=${dateStr}`,
        { next: { revalidate: 3600 } }
      );
      if (!res.ok) throw new Error(`SGPC HTTP ${res.status}`);
      const json = await res.json();
      return parseSGPC(json, dateStr);
    }
  }
}
