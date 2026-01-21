// Main application component

import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import useTodos from './hooks/useTodos';
import './styles/App.css'

const FILTERS = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed'
};

function App() {
    // Use the custom hook to manage todo state and operations
    const { todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted } = useTodos();

    const [filter, setFilter] = useState(FILTERS.ALL);

    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Filter based on active filter
    const filteredTodos = todos.filter(todo => {
        if (filter === FILTERS.ACTIVE) return !todo.completed;
        if (filter === FILTERS.COMPLETED) return todo.completed;
        return true;
    });

    // Calc stats
    const totalTodos = todos.length;
    const completedTodos = todos.filter(todo => todo.completed).length;
    const activeTodos = totalTodos - completedTodos;

    return (
        <div className="app">
            <div className="todo-container">
                <header className="app-header">
                    <h1>Your tasks</h1>
                    <p className="current-date">{getCurrentTime()}</p>

                    {/* Statistics bar*/}
                    <div className="stats">
                        <div className="stat-item">
                            <span className="stat-label">Total</span>
                            <span className="stat-value">{totalTodos}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Active</span>
                            <span className="stat-value active">{activeTodos}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Done</span>
                            <span className="stat-value completed">{completedTodos}</span>
                        </div>
                    </div>
                </header>

                <TodoForm onAddTodo={addTodo} />

                <div className="filter-buttons">
                    <button
                        className={`filter-btn ${filter === FILTERS.ALL ? 'active' : ''}`}
                        onClick={() => setFilter(FILTERS.ALL)}
                    >
                        All ({totalTodos})
                    </button>
                    <button
                        className={`filter-btn ${filter === FILTERS.ACTIVE ? 'active' : ''}`}
                        onClick={() => setFilter(FILTERS.ACTIVE)}
                    >
                        Active ({activeTodos})
                    </button>
                    <button
                        className={`filter-btn ${filter === FILTERS.COMPLETED ? 'active' : ''}`}
                        onClick={() => setFilter(FILTERS.COMPLETED)}
                    >
                        Done ({completedTodos})
                    </button>
                    {completedTodos > 0 && (
                        <button
                            className="filter-btn clear-btn"
                            onClick={clearCompleted}
                            title="Delete all completed todos"
                        >
                            Clear Done
                        </button>
                    )}
                </div>

                {/* Todo list or empty state */}
                {todos.length === 0 ? (
                    <div className="empty-state">
                        <p>No tasks yet! Add one above to get started!</p>
                    </div>
                ) : filteredTodos.length === 0 ? (
                    <div className="empty-state">
                        <p> No {filter === FILTERS.COMPLETED ? 'completed' : 'active'} tasks!</p>    
                    </div>
                ) : (
                    <TodoList
                        todos={filteredTodos}
                        onToggleTodo={toggleTodo}
                        onDeleteTodo={deleteTodo}
                        onEditTodo={editTodo}
                    />
                )}

                {/* Footer */}
                <footer className="app-footer">
                    <p>Click on the tasks to mark them as complete, or use the edit or modify buttons to modify them</p>
                </footer>
            </div>
        </div>
    );
}

export default App;