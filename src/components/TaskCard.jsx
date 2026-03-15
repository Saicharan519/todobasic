// ============================================================
// TaskCard.jsx — Individual task card (draggable)
//
// REACT CONCEPT: DRAG START
// When the user starts dragging this card, we store the task's
// id in the drag event's dataTransfer object.
// The Column's onDrop handler will read this id.
//
// Props:
//   - task     : { id, title, priority, dueDate, status }
//   - onDelete : function to delete this task
// ============================================================

// Priority config — colors and labels in one place
const PRIORITY = {
  high:   { label: "High",   classes: "bg-red-500/20 text-red-400 border-red-500/30" },
  medium: { label: "Medium", classes: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  low:    { label: "Low",    classes: "bg-green-500/20 text-green-400 border-green-500/30" },
};

export default function TaskCard({ task, onDelete }) {

  // Store the task id when drag starts
  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  // Format date nicely: "2025-03-20" → "Mar 20"
  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Check if task is overdue
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "done";

  const priority = PRIORITY[task.priority];

  return (
    <div
      draggable                       // makes this element draggable
      onDragStart={handleDragStart}   // fires when drag begins
      className={`bg-gray-800 rounded-xl p-4 cursor-grab active:cursor-grabbing
                  border border-gray-700 hover:border-gray-600
                  transition-all hover:shadow-lg hover:shadow-black/30
                  hover:-translate-y-0.5 group
                  ${task.status === "done" ? "opacity-60" : ""}`}
    >
      {/* Top row: priority badge + delete button */}
      <div className="flex items-start justify-between gap-2 mb-3">

        {/* Priority badge */}
        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${priority.classes}`}>
          {priority.label}
        </span>

        {/* Delete button — hidden until hover */}
        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-600 hover:text-red-400 transition-colors
                     opacity-0 group-hover:opacity-100 text-lg leading-none"
          title="Delete task"
        >
          ×
        </button>
      </div>

      {/* Task title */}
      <p className={`text-sm text-gray-100 font-medium leading-snug
                     ${task.status === "done" ? "line-through text-gray-500" : ""}`}>
        {task.title}
      </p>

      {/* Due date */}
      {task.dueDate && (
        <div className={`mt-3 flex items-center gap-1 text-xs
                         ${isOverdue ? "text-red-400" : "text-gray-500"}`}>
          <span>{isOverdue ? "⚠️" : "📅"}</span>
          <span>{isOverdue ? "Overdue · " : ""}{formatDate(task.dueDate)}</span>
        </div>
      )}
    </div>
  );
}