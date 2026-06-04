# ⚽ World Cup Sticker Tracker

A mobile-friendly Progressive Web App (PWA) for tracking a Panini FIFA World Cup 2026 sticker collection.

The application allows collectors to manage their sticker album, track duplicates, monitor completion progress, and store data locally for offline use.

---

## Features

### 📊 Dashboard

* View overall album completion percentage
* Track:

  * Owned stickers
  * Missing stickers
  * Tradeable extras
  * Total stickers in the collection
* Progress bar showing album completion

### 🔍 Search

* Search stickers by:

  * Sticker Code
  * Player Name
  * Country
* Quickly update sticker quantities
* Visual status indicators:

  * 🔴 Need
  * 🟢 Have
  * 🔵 Duplicate

### 🌎 Countries

* View progress by country/team
* Country completion percentages
* Progress bars for each country
* Countries sorted by completion percentage

### 🤝 Trade Mode

* View all missing stickers
* View all duplicate stickers
* Search within needs and duplicates
* Track tradeable extras

### 💾 Backup & Restore

* Export collection to JSON
* Import collection from JSON
* Protect collection data from accidental loss

### 🌙 Dark Mode

* Toggle between light and dark themes
* Mobile-friendly design

### 📱 Offline Support

* Uses IndexedDB via Dexie.js
* Collection data stored locally on the device
* Works without an internet connection

---

## Technology Stack

### Frontend

* React
* Vite
* React Router

### Local Database

* Dexie.js
* IndexedDB

### Styling

* CSS
* Responsive mobile-first layout

### PWA

* vite-plugin-pwa

---

## Project Structure

```text
src
│
├── components
│   ├── BottomNav.jsx
│   ├── SearchBar.jsx
│   ├── Stats.jsx
│   ├── StickerCard.jsx
│   └── ThemeToggle.jsx
│
├── context
│   └── ThemeContext.jsx
│
├── data
│   └── stickers.json
│
├── db
│   └── db.js
│
├── pages
│   ├── Backup.jsx
│   ├── Countries.jsx
│   ├── CountryDetail.jsx
│   ├── Dashboard.jsx
│   ├── Duplicates.jsx
│   ├── NeedList.jsx
│   ├── Search.jsx
│   └── Trade.jsx
│
├── App.jsx
├── App.css
└── main.jsx
```

---

## Running the Project

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

Production files will be generated in:

```text
dist/
```

Preview production build:

```bash
npm run preview
```

---

## Data Storage

Collection data is stored locally using IndexedDB.

No account is required.

Data remains on the device unless:

* Browser data is cleared
* IndexedDB is manually deleted
* A backup file is imported over the existing collection

---
