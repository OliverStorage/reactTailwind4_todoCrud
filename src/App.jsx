import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import useTodos from "./hooks/useTodos";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthContainer from "./components/auth/AuthContainer";
import Profile from "./components/auth/Profile";

// Protected App Component
function TodoApp() {
  const { todos, addTodo, toggleTodo, updateTodo, deleteTodo } = useTodos();
  const [filter, setFilter] = useState("all");
  const { currentUser } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="min-h-dvh bg-gray-100 py-8">
      <div className="max-w-md mx-auto">
        {/* Header with User Info */}
        <div className="flex justify-between items-center mb-4 px-6">
          <h1 className="text-2xl font-bold text-gray-800">React Todo App</h1>

          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 bg-white hover:bg-gray-100 px-3 py-1 rounded-lg border transition duration-200"
          >
            {currentUser?.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt="Profile"
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-xs text-gray-600">
                  {currentUser?.email?.charAt(0)?.toUpperCase() || "?"}
                </span>
              </div>
            )}
            <span>{currentUser?.displayName?.split(" ")[0] || "Profile"}</span>
          </button>
        </div>

        {showProfile ? (
          <Profile />
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            <TodoForm addTodo={addTodo} />

            <TodoFilter filter={filter} setFilter={setFilter} todos={todos} />

            <TodoList
              todos={todos}
              toggleTodo={toggleTodo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
              filter={filter}
            />

            {todos.length > 0 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    const confirmed = window.confirm(
                      "Are you sure you want to clear all completed todos?",
                    );
                    if (confirmed) {
                      todos
                        .filter((todo) => todo.completed)
                        .forEach((todo) => deleteTodo(todo.id));
                    }
                  }}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Clear completed
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Main App with Auth Wrapper
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

// Content based on auth state
function AppContent() {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-dvh bg-gray-100 py-8">
      <div className="max-w-md mx-auto">
        {currentUser ? (
          <TodoApp />
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Todo App
            </h1>
            <AuthContainer />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
