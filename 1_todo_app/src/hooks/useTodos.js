import { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'react-todo-app-todos';

function useTodos() {
    const [todos, setTodos] = useState(() => {
        try {
            const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
            return savedTodos ? JSON.parse(savedTodos) : [];
        } catch (error) {
            console.error("Error loading todos from localstorage.", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
        } catch (error) {
            console.error("Error saving todos to localstorage.", error);
        }
    }, [todos]);

    const addTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            text: text.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };

        setTodos(prevTodos => [...prevTodos, newTodo]);
    };

    const toggleTodo = (id) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    };

    const editTodo = (id, newText) => {
        const trimmedText = newText.trim();
        if (!trimmedText) {
            return;
        }

        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id
                    ? { ...todo, text: trimmedText }
                    : todo
            )
        );
    };

    const clearCompleted = () => {
        setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    };

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        clearCompleted
    };
}

export default useTodos;