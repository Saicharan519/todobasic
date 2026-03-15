# 📋 KanbanBoard — React Learning Project

A full-featured Kanban board built with React, Vite, and Tailwind CSS.

---

## 🚀 Tech Stack

- **React 18** — UI library
- **Vite** — Build tool (faster than Create React App)
- **Tailwind CSS v3** — Utility-first styling

---

## ⚡ Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Install Tailwind (if not done already)
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

# 3. Start the dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 📁 File Structure

```
kanban-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx        ← Title, filter buttons, Add Task button
│   │   ├── Board.jsx         ← 3-column layout container
│   │   ├── Column.jsx        ← Single column with drag-and-drop
│   │   ├── TaskCard.jsx      ← Individual draggable task card
│   │   └── AddTaskModal.jsx  ← Popup form to create tasks
│   ├── App.jsx               ← Root component, holds ALL state
│   ├── index.css             ← Tailwind imports
│   └── main.jsx              ← React entry point
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## ✨ Features

| Feature | How it works |
|---|---|
| ➕ Add tasks | Click "Add Task" → fill form → task appears in chosen column |
| 🗑️ Delete tasks | Hover over a card → click × button |
| 🔀 Drag & Drop | Drag any card → drop into another column to change status |
| 🔍 Filter by priority | Click Low / Medium / High in header to filter all columns |
| 💾 LocalStorage | Tasks auto-save — they persist after closing the browser |
| ⚠️ Overdue indicator | Cards show a warning if due date has passed |

---

## 🧠 React Concepts Covered

### 1. `useState` with arrays and objects
```js
const [tasks, setTasks] = useState([]);

// Add — spread old array + new item
setTasks([...tasks, newTask]);

// Delete — filter out the task
setTasks(tasks.filter(t => t.id !== id));

// Update — map and replace matching task
setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
```

### 2. Lazy `useState` initialization
```js
// Runs ONCE on first load — reads from localStorage
const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem("kanban-tasks");
  return saved ? JSON.parse(saved) : defaultTasks;
});
```

### 3. `useEffect` for side effects
```js
// Runs every time `tasks` changes → auto-saves to localStorage
useEffect(() => {
  localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
}, [tasks]);
```

### 4. Lifting State Up
All task data and functions live in `App.jsx`.
Functions are passed DOWN to children as props.
Children call those functions to modify state.
```
App.jsx (owns state)
  → Board → Column → TaskCard (calls onDelete, drag events)
  → AddTaskModal (calls onAdd)
```

### 5. Derived State
```js
// Don't store filteredTasks in useState — calculate it instead
const filteredTasks = filter === "all"
  ? tasks
  : tasks.filter(t => t.priority === filter);
```

### 6. Rendering lists with `.map()`
```jsx
{tasks.map(task => (
  <TaskCard key={task.id} task={task} onDelete={onDeleteTask} />
))}
```
Always add a unique `key` prop when rendering lists!

### 7. HTML5 Drag and Drop
```jsx
// On the draggable card:
<div draggable onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}>

// On the drop target column:
onDragOver={(e) => e.preventDefault()}
onDrop={(e) => {
  const id = parseInt(e.dataTransfer.getData("taskId"));
  onUpdateStatus(id, column.id);
}}
```

### 8. Controlled Form Inputs
```js
const [formData, setFormData] = useState({ title: "", priority: "medium" });

// One handler for ALL inputs using computed property names
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
```

### 9. Conditional Rendering
```jsx
{showModal && <AddTaskModal />}
{tasks.length === 0 ? <EmptyState /> : tasks.map(...)}
```

---

## 📦 Task Data Shape

```js
{
  id: 1710000000000,     // Date.now() — unique timestamp ID
  title: "Build the UI", // string
  priority: "high",      // "low" | "medium" | "high"
  dueDate: "2025-03-20", // string (YYYY-MM-DD) or ""
  status: "todo",        // "todo" | "inprogress" | "done"
}
```

---

## 🔧 Tailwind Config Note

Make sure your `tailwind.config.js` content array includes `.jsx`:
```js
content: ["./index.html", "./src/**/*.{js,jsx}"]
```

And `src/index.css` must have:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🐛 Common Issues

| Problem | Fix |
|---|---|
| Tailwind not applying | Check `index.css` is imported in `main.jsx` |
| Yellow underlines on `@tailwind` | Install "Tailwind CSS IntelliSense" VS Code extension |
| Tasks not saving | Check browser allows localStorage (not in incognito) |
| Drag not working | Make sure `draggable` prop is on the card div |