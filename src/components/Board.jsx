// ============================================================
// Board.jsx — Layout container for the 3 columns
//
// REACT CONCEPT: FILTERING BY STATUS (Derived data)
// Board receives ALL tasks but splits them into 3 groups
// by filtering on the `status` field before passing to columns.
//
// Props received from App.jsx:
//   - tasks          : filtered tasks array
//   - onDeleteTask   : passed through to TaskCard
//   - onUpdateStatus : passed through for drag and drop
// ============================================================
import Column from "./Column";

// Column definitions — easy to add more columns later
const COLUMNS = [
  { id: "todo",       label: "📝 To Do",      color: "border-blue-500" },
  { id: "inprogress", label: "⚡ In Progress", color: "border-yellow-500" },
  { id: "done",       label: "✅ Done",        color: "border-green-500" },
];

export default function Board({ tasks, onDeleteTask, onUpdateStatus }) {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Render one Column for each status */}
        {COLUMNS.map((col) => (
          <Column
            key={col.id}
            column={col}
            // Filter tasks for THIS column only
            tasks={tasks.filter((t) => t.status === col.id)}
            onDeleteTask={onDeleteTask}
            onUpdateStatus={onUpdateStatus}
          />
        ))}

      </div>
    </main>
  );
}