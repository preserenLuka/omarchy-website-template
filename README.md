# Omarchy Website Template

A React + TypeScript tile-based workspace template.  
Each tile acts as a separate, self-contained page. Includes keyboard navigation, theming, and modular components.

---

## Features

- Tile-based layout (open, close, move, and focus multiple pages)
- Built-in menus for themes, navigation, and keybinds
- Configurable keyboard shortcuts
- Modular structure — easily add or remove tiles
- Internal scrolling for large tile content
- Responsive grid layout

---

## Getting Started

### Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/omarchy-website-template.git
cd omarchy-website-template
npm install
npm run dev
```
Open http://localhost:5173 in your browser.

## Project Structure

```text
src/
├── App.tsx
├── App.module.css
├── components/
│   └── Tile.tsx
├── data/
│   └── tiles.ts
├── hooks/
│   ├── useKeyboardShortcut.ts
│   ├── useTileShortcuts.ts
│   └── moveTile.ts
├── Menu/
│   ├── NavMenu.tsx
│   ├── ThemeMenu.tsx
│   └── KeybindsMenu.tsx
└── pages/
    ├── TemplatePage.tsx
    ├── SettingsPage.tsx
    └── AboutPage.tsx
```

## Theme examples:

<img width="2559" height="1439" alt="Posnetek zaslona 2025-10-23 215528" src="https://github.com/user-attachments/assets/04f7f876-b929-4399-bc75-bf7b280f9360" />


<img width="2559" height="1439" alt="Posnetek zaslona 2025-10-23 215648" src="https://github.com/user-attachments/assets/1a6f2747-624b-4ca3-97ed-8c607f225801" />


<img width="2559" height="1438" alt="Posnetek zaslona 2025-10-23 215656" src="https://github.com/user-attachments/assets/476c6451-921c-44dd-9f9c-66af46324cc0" />

## Tieling hyprland style:

<img width="2559" height="1439" alt="Posnetek zaslona 2025-11-04 010651" src="https://github.com/user-attachments/assets/b83e1ec0-c6b8-4a1d-81ee-a432b057229a" />

<img width="563" height="477" alt="Posnetek zaslona 2025-11-04 010705" src="https://github.com/user-attachments/assets/906d9481-01ff-4390-bf34-b8cfb5fa5142" />

