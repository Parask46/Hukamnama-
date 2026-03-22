# 🕉️ Hukamnama — Daily Divine Order

A beautiful, devotional web application that displays the **daily Hukamnama** — the sacred daily divine order from Sri Darbar Sahib (the Golden Temple), Amritsar.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FParask46%2FHukamnama-)

---

## What is the Hukamnama?

The Hukamnama (ਹੁਕਮਨਾਮਾ) is the daily divine order — a passage from the Guru Granth Sahib Ji read each morning from Sri Darbar Sahib (the Golden Temple) in Amritsar, India. It serves as guidance and inspiration for Sikhs worldwide throughout the day.

---

## Features

- 📖 **Today's Hukamnama** — automatically fetched on page load
- 🔤 **Dual language display** — Gurmukhi script + English translation, line by line
- 📅 **Date navigator** — browse any past Hukamnama with prev/next arrows or a date picker
- ✨ **Sacred minimalist design** — deep blue background, warm gold accents, devotional typography
- 🔄 **Graceful loading & error states** — shimmer skeleton while fetching, retry on failure
- ♿ **Accessible** — `lang="pa-Guru"` on Gurmukhi text, ARIA labels, keyboard navigation
- 📱 **Responsive** — works on mobile, tablet, and desktop
- 🔴 **Golden Temple live stream** link in footer

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** (App Router) | Framework |
| **TypeScript** | Language |
| **Tailwind CSS** | Styling utility |
| **Google Fonts** | Noto Serif Gurmukhi, EB Garamond, Cinzel |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## API Sources

The app fetches Hukamnama data from two sources with automatic fallback:

1. **Primary — SikhNet**
   - `GET https://www.sikhnet.com/hukam/fetchHukamnama?date=YYYY-MM-DD`
   - Returns Gurmukhi (Unicode), English translation, and metadata
   - Free, no API key required

2. **Fallback — SGPC (via akashdhami proxy)**
   - `GET https://app.akashdhami.com/hukamnama/?date=YYYY-MM-DD`
   - Pulls directly from the Shiromani Gurdwara Parbandhak Committee

All API requests are proxied server-side via `/api/hukamnama?date=YYYY-MM-DD` to avoid CORS issues.

---

## Project Structure

```
src/
├── app/
│   ├── api/hukamnama/route.ts   # Server-side API proxy
│   ├── globals.css              # CSS variables, fonts, animations
│   ├── layout.tsx               # Root layout with metadata
│   └── page.tsx                 # Home page
├── components/
│   ├── Header.tsx               # Ik Onkar + title + date
│   ├── HukamCard.tsx            # Gurmukhi + English + Ang + Raag
│   ├── DateNav.tsx              # Prev/Next/Today + date picker
│   ├── LoadingSkeleton.tsx      # Shimmer placeholder
│   ├── ErrorState.tsx           # Error message + retry
│   ├── Footer.tsx               # Attribution + live stream link
│   └── HukamnamaPage.tsx        # Client component (state orchestrator)
└── lib/
    └── fetchHukamnama.ts        # API logic with SikhNet + SGPC fallback
```

---

## Deploying to Vercel

The easiest way to deploy is via the button above, or:

1. Push this repository to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Click **Deploy** — no environment variables needed

---

## Attribution

- **SGPC** (Shiromani Gurdwara Parbandhak Committee) — official source of daily Hukamnama
- **SikhNet** — API provider ([sikhnet.com](https://www.sikhnet.com))
- Gurbani text is displayed exactly as returned by the API — unaltered, unparaphrased

---

*Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh* 🙏
