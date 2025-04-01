import TodoItem from "./TodoItem";

export default function TodoList({
    todos,
    toggleTodo,
    updateTodo,
    deleteTodo,
    filter,
}) {
    // Filter todos based on the selected filter
    const filteredTodos = todos.filter((todo) => {
        if (filter === "all") return true;
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    return (
        <div className="mt-4">
            {filteredTodos.length === 0 ? (
                <p className="text-center text-gray-500 py-4">
                    No todos to display
                </p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {filteredTodos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            toggleTodo={toggleTodo}
                            updateTodo={updateTodo}
                            deleteTodo={deleteTodo}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}
