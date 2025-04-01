export default function TodoFilter({ filter, setFilter, todos }) {
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 mb-4 bg-gray-100 rounded-lg p-4">
      <div className="mb-2 sm:mb-0">
        <span className="text-gray-700">
          {activeCount} {activeCount === 1 ? "item" : "items"} left
        </span>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded ${
            filter === "all"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-3 py-1 rounded ${
            filter === "active"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          Active ({activeCount})
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded ${
            filter === "completed"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>
    </div>
  );
}
