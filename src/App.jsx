import { useState, useEffect } from "react";
import Header from "./components/Header";
import Board from "./components/Board";
import AddTaskModal from "./components/AddTaskModal";

// ============================================================
// REACT CONCEPT: INITIAL STATE FROM LOCALSTORAGE
//
// Instead of useState([]), we pass a FUNCTION to useState.
// This function runs ONCE on first load and checks localStorage.
// If data exists → use it. If not → start with sample tasks.
//
// This pattern is called "lazy initialization" of state.
// ============================================================
const getInitialTasks = () => {
  const saved = localStorage.getItem("kanban-tasks");
  if (saved) return JSON.parse(saved);

  // Default sample tasks so the board doesn't look empty
  return [
    {
      id: 1,
      title: "Design the UI mockup",
      priority: "high",
      dueDate: "2025-03-20",
      status: "todo",
    },
    {
      id: 2,
      title: "Set up React project",
      priority: "medium",
      dueDate: "2025-03-18",
      status: "inprogress",
    },
    {
      id: 3,
      title: "Install Tailwind CSS",
      priority: "low",
      dueDate: "2025-03-17",
      status: "done",
    },
  ];
};

export default function App() {
  // All tasks live here — single source of truth
  const [tasks, setTasks] = useState(getInitialTasks);

  // Controls whether the Add Task popup is visible
  const [showModal, setShowModal] = useState(false);

  // Filter: "all" | "low" | "medium" | "high"
  const [filter, setFilter] = useState("all");

  // ============================================================
  // REACT CONCEPT: useEffect FOR LOCALSTORAGE
  //
  // Every time `tasks` changes, this effect runs and saves
  // the updated tasks to localStorage automatically.
  //
  // Dependency array [tasks] means:
  // "run this effect whenever tasks changes"
  // ============================================================
  useEffect(() => {
    localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
  }, [tasks]); // ← runs every time tasks array changes

  // ============================================================
  // TASK OPERATIONS
  // These functions are defined here in App.jsx and passed DOWN
  // to child components as props.
  //
  // WHY here? Because `tasks` and `setTasks` live here.
  // Children can't directly touch parent state — they need
  // functions passed as props. This is called "lifting state up".
  // ============================================================

  // ADD: create a new task object and append to array
  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(), // simple unique ID using timestamp
      ...taskData,    // spread: copies title, priority, dueDate, status
    };
    setTasks([...tasks, newTask]); // spread old tasks + add new one
  };

  // DELETE: keep all tasks EXCEPT the one with this id
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // UPDATE STATUS: when dragging a card to a new column
  // Find the task by id and update just its status field
  const updateTaskStatus = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: newStatus } // update this task
          : task                            // leave others unchanged
      )
    );
  };

  // ============================================================
  // REACT CONCEPT: DERIVED STATE
  //
  // `filteredTasks` is NOT stored in useState.
  // It's calculated FROM `tasks` and `filter` on every render.
  //
  // Rule: if you can CALCULATE it, don't store it in state.
  // Storing it would create duplicate data that can go out of sync.
  // ============================================================
  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => task.priority === filter);

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Header receives filter state and functions to change it */}
      <Header
        filter={filter}
        setFilter={setFilter}
        onAddTask={() => setShowModal(true)}
        taskCount={tasks.length}
      />

      {/* Board receives tasks and the functions to modify them */}
      <Board
        tasks={filteredTasks}
        onDeleteTask={deleteTask}
        onUpdateStatus={updateTaskStatus}
      />

      {/* Modal only renders when showModal is true */}
      {showModal && (
        <AddTaskModal
          onAdd={addTask}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}