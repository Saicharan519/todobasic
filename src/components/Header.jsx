// ============================================================
// Header.jsx — Top bar with title, filters, and Add button
//
// Props received from App.jsx:
//   - filter      : current active filter ("all"/"low"/"medium"/"high")
//   - setFilter   : function to change the filter
//   - onAddTask   : function to open the modal
//   - taskCount   : total number of tasks
// ============================================================
export default function Header({ filter, setFilter, onAddTask, taskCount }) {

  const filters = ["all", "low", "medium", "high"];

  // Color for each priority filter button when active
  const activeColors = {
    all: "bg-blue-600",
    low: "bg-green-600",
    medium: "bg-yellow-500",
    high: "bg-red-600",
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            📋 KanbanBoard
          </h1>
          <p className="text-gray-400 text-sm mt-0.5">
            {taskCount} task{taskCount !== 1 ? "s" : ""} total
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">

          {/* Filter buttons */}
          {/* ============================================================
              REACT CONCEPT: RENDERING LISTS WITH .map()
              Instead of writing 4 buttons manually, we map over the
              filters array and return a button for each one.

              KEY PROP: React needs a unique `key` on each element
              in a list so it can track which item is which.
              Always use a unique value — never use the array index
              if the list can reorder.
              ============================================================ */}
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-all
                  ${filter === f
                    ? `${activeColors[f]} text-white`       // active style
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700" // inactive style
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Add Task button */}
          <button
            onClick={onAddTask}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white
                       rounded-lg text-sm font-semibold transition-all
                       hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            + Add Task
          </button>
        </div>
      </div>
    </header>
  );
}