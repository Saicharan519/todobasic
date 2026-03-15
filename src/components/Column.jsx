// ============================================================
// Column.jsx — One Kanban column (To Do / In Progress / Done)
//
// REACT CONCEPT: DRAG AND DROP with HTML5 APIs
//
// HTML5 gives us these drag events for FREE (no library needed):
//   onDragOver  → fires when a dragged item is OVER this element
//   onDrop      → fires when you RELEASE (drop) on this element
//
// The draggable item (TaskCard) sets the task id using:
//   onDragStart → stores the task id in the drag event
//
// Flow:
//   1. User drags a card   → TaskCard's onDragStart fires, saves id
//   2. Card is over column → Column's onDragOver fires (must preventDefault)
//   3. User drops card     → Column's onDrop fires, reads id, updates status
// ============================================================
import TaskCard from "./TaskCard";

export default function Column({ column, tasks, onDeleteTask, onUpdateStatus }) {

  // Must call preventDefault() to ALLOW dropping
  // (by default browsers don't allow dropping on elements)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // When a card is dropped here, get the task id and update its status
  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData("taskId")); // read the id
    onUpdateStatus(taskId, column.id); // update status to this column's id
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`bg-gray-900 rounded-2xl border-t-4 ${column.color}
                  min-h-96 flex flex-col`}
    >
      {/* Column Header */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-800 flex items-center justify-between">
        <h2 className="font-semibold text-white">{column.label}</h2>
        {/* Task count badge */}
        <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      {/* Task Cards */}
      <div className="p-3 flex flex-col gap-3 flex-1">
        {tasks.length === 0 ? (
          // Empty state — show when no tasks in this column
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-600 text-sm">Drop tasks here</p>
          </div>
        ) : (
          // Render a TaskCard for each task in this column
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}