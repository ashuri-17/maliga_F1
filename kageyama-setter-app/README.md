# 👑 King of the Court - Setter Training App

A Kageyama-inspired volleyball setter training app with animated exercise demonstrations, progressive difficulty, daily challenges, and XP-based leveling system.

## Features

- **18 Complete Drills** across 5 categories with 54 individual exercises
- **SVG Animated Demonstrations** showing how to perform each exercise
- **Progressive Difficulty**: Beginner → Intermediate → Advanced → Elite
- **XP & Leveling System** with 20 levels and 7 Kageyama-themed ranks
- **Daily Training Tasks** with customizable goals
- **18 Challenges** across Bronze, Silver, Gold, and Diamond tiers
- **12 Achievements** to unlock
- **Training Plans**: Daily, Weekly, and Intensive Camp programs
- **Skill Radar Chart** and progress analytics
- **Offline-capable** PWA with Service Worker caching

## Drill Categories

| Category | Icon | Focus |
|----------|------|-------|
| Accuracy | 🎯 | Precision setting to targets |
| Hand Form | 🤲 | Perfect setter hand shape |
| Footwork | 👟 | Court movement and positioning |
| Quick Sets | ⚡ | Tempo, deception, speed |
| Game IQ | 🏐 | Court vision, reading blockers |

## Ranks

1. 🏐 Beginner Setter (Lv.1)
2. 🎯 Junior Setter (Lv.3)
3. ⭐ Varsity Setter (Lv.5)
4. 🔥 Ace Setter (Lv.8)
5. 💎 Elite Setter (Lv.12)
6. 👑 Master Setter (Lv.16)
7. 🏆 King of the Court (Lv.20)

## Tech Stack

- Pure HTML5 / CSS3 / JavaScript (no frameworks)
- SVG animations for exercise demonstrations
- LocalStorage for data persistence
- PWA with Service Worker for offline use
- Capacitor for APK packaging

## Building the APK

```bash
cd kageyama-setter-app
npm install
npx cap add android
npx cap sync
npx cap open android
# Build APK from Android Studio, or:
cd android && ./gradlew assembleDebug
```

## Running Locally

Simply open `index.html` in a browser, or serve with any static server:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Inspired by Kageyama Tobio

> "The last ones standing are the strongest."
