import { useState } from "react";

export default function TodoItem({ todo, toggleTodo, updateTodo, deleteTodo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(todo.title);

    const handleEditSubmit = () => {
        if (editValue.trim()) {
            updateTodo(todo.id, editValue);
            setIsEditing(false);
        }
    };

    return (
        <li className="border rounded-lg mb-2 overflow-hidden">
            <div className="p-4 flex items-center justify-between bg-white">
                {isEditing ? (
                    <div className="flex-grow flex items-center gap-2">
                        <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="flex-grow px-2 py-1 border rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            autoFocus
                        />
                        <button
                            onClick={handleEditSubmit}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center flex-grow">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                                className="h-5 w-5 text-blue-500 rounded accent-blue-500 focus-visible:ring-0"
                            />
                            <span
                                className={`ml-3 ${
                                    todo.completed
                                        ? "line-through text-gray-500"
                                        : "text-gray-800"
                                }`}
                            >
                                {todo.title}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </li>
    );
}
