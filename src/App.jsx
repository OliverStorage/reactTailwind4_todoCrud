import { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import useTodos from './hooks/useTodos';

function App() {
  const { todos, addTodo, toggleTodo, updateTodo, deleteTodo } = useTodos();
  const [filter, setFilter] = useState('all');
  
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          React Todo App
        </h1>
        
        <TodoForm addTodo={addTodo} />
        
        <TodoFilter
          filter={filter}
          setFilter={setFilter}
          todos={todos}
        />
        
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
                const confirmed = window.confirm('Are you sure you want to clear all completed todos?');
                if (confirmed) {
                  todos
                    .filter(todo => todo.completed)
                    .forEach(todo => deleteTodo(todo.id));
                }
              }}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Clear completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;