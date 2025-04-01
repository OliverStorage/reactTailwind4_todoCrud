import { useState } from "react";

export default function TodoForm({ addTodo }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (!title.trim()) {
      setError("Todo cannot be empty");
      return;
    }

    // Add the todo and reset form
    addTodo(title.trim());
    setTitle("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      <button
        type="submit"
        className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
      >
        Add Todo
      </button>
    </form>
  );
}
