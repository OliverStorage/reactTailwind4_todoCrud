import { useState, useEffect } from "react";

export default function useTodos() {
    // Get todos from localStorage or start with empty array
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    // Store todos in localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    // Add a new todo
    function addTodo(title) {
        const newTodo = {
            id: Date.now(),
            title,
            completed: false,
            createdAt: new Date().toISOString(),
        };

        setTodos((prevTodos) => [newTodo, ...prevTodos]);
    }

    // Toggle completion status
    function toggleTodo(id) {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo,
            ),
        );
    }

    // Update todo title
    function updateTodo(id, title) {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, title } : todo,
            ),
        );
    }

    // Delete a todo
    function deleteTodo(id) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }

    return {
        todos,
        addTodo,
        toggleTodo,
        updateTodo,
        deleteTodo,
    };
}
