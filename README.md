# 📋 TodoApp

A modern, full-featured task management app built with **React 19 + Vite + Tailwind CSS**. Organize your tasks across multiple lists, filter by status, set due dates, search in real time, and track your progress — all saved locally in your browser.

---

## 🌐 Live Demo

> 🔗 **[Add your deployment link here] https://golden-platypus-e8305f.netlify.app/  ]**

---

## ✨ Features

- **Multiple Task Lists** — Personal, Work, Study, Shopping, or view All at once
- **CRUD Operations** — Create, read, update, and delete tasks with a sleek modal
- **Filter Pills** — Instantly switch between All, Active, Completed, and Today views
- **Live Search** — Filter tasks by title in real time from the top bar
- **Due Dates & Priority** — Assign due dates and priority levels to each task
- **Progress Bar** — Visual indicator of completed vs total tasks
- **Persistent Storage** — All tasks saved to `localStorage` — no data loss on refresh
- **Responsive Sidebar** — Collapsible sidebar on mobile with task counts per list
- **Dark Glassmorphic UI** — Deep dark background with violet/cyan accents

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Component-based UI & state management |
| Vite 6 | Fast dev server & build tool |
| Tailwind CSS 4 | Utility-first styling |
| localStorage API | Client-side data persistence |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher

### Installation & Development

```bash
# Clone the repository
git clone <repository-url>
cd TodoApp

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open **http://localhost:5173** in your browser.

```bash
npm run build      # Build for production
npm run preview    # Preview production build
```

---

## 📁 Project Structure

```
TodoApp/
├── src/
│   ├── App.jsx              ← Root: state, CRUD, filter logic
│   ├── index.css            ← Tailwind base + global styles
│   ├── main.jsx             ← React entry point
│   └── components/
│       ├── Sidebar.jsx      ← List navigation with task counts
│       ├── TaskList.jsx     ← Filtered list of tasks
│       ├── TaskItem.jsx     ← Single task card (toggle, edit, delete)
│       └── AddEditModal.jsx ← Modal form to create or edit a task
├── index.html
├── vite.config.js
└── package.json
```

---

## 🎮 How to Use

| Action | How |
|---|---|
| Add a task | Click **+ New Task** in the top bar |
| Edit a task | Click the ✏️ icon on a task card |
| Delete a task | Click the 🗑️ icon on a task card |
| Mark complete | Click the checkbox on the left of a task |
| Switch list | Click a list name in the left sidebar |
| Filter tasks | Use the All / Active / Completed / Today pills |
| Search | Type in the search bar at the top |
| Mobile sidebar | Tap the ☰ hamburger icon |

---

## 📄 License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

---

<p align="center">Built with 📋 React · Vite · Tailwind CSS · © 2026</p>
