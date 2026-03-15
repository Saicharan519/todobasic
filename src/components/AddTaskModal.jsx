// ============================================================
// AddTaskModal.jsx — Popup form to create a new task
//
// REACT CONCEPT: FORMS WITH CONTROLLED INPUTS
//
// We store the entire form in ONE state object:
//   { title, priority, dueDate, status }
//
// One onChange handler updates any field using computed property:
//   [e.target.name]: e.target.value
// This means `name="title"` updates formData.title automatically.
//
// Props:
//   - onAdd   : function to add the task (from App.jsx)
//   - onClose : function to close the modal
// ============================================================
import { useState } from "react";

export default function AddTaskModal({ onAdd, onClose }) {

  // Single state object for the whole form
  const [formData, setFormData] = useState({
    title: "",
    priority: "medium",
    dueDate: "",
    status: "todo",
  });

  const [error, setError] = useState("");

  // ONE handler for ALL inputs — uses input's `name` attribute
  const handleChange = (e) => {
    setFormData({
      ...formData,                       // keep existing fields
      [e.target.name]: e.target.value,   // update just this field
    });
  };

  const handleSubmit = () => {
    // Validation — title is required
    if (!formData.title.trim()) {
      setError("Please enter a task title.");
      return;
    }
    onAdd(formData);  // send data up to App.jsx
    onClose();        // close the modal
  };

  return (
    // Backdrop — clicking outside closes the modal
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose} // click backdrop → close
    >
      {/* Modal box — stop click from bubbling to backdrop */}
      <div
        className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()} // ← prevents modal close when clicking inside
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Add New Task</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-2xl leading-none">×</button>
        </div>

        <div className="flex flex-col gap-4">

          {/* Title input */}
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Task Title *</label>
            <input
              type="text"
              name="title"                      // ← matches formData.title
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Design homepage layout"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3
                         text-white placeholder-gray-600 focus:outline-none focus:border-blue-500
                         transition-colors"
            />
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
          </div>

          {/* Priority select */}
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Priority</label>
            <select
              name="priority"                   // ← matches formData.priority
              value={formData.priority}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3
                         text-white focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>

          {/* Due date */}
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Due Date</label>
            <input
              type="date"
              name="dueDate"                    // ← matches formData.dueDate
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3
                         text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Starting column */}
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Start in column</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3
                         text-white focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="todo">📝 To Do</option>
              <option value="inprogress">⚡ In Progress</option>
              <option value="done">✅ Done</option>
            </select>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-gray-800 hover:bg-gray-700
                         text-gray-300 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500
                         text-white font-semibold transition-colors"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}