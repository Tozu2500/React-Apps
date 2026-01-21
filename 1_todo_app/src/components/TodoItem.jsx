import React, { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
    // Local state to track if the item is in edit mode
    const [isEditing, setIsEditing] = useState(false);

    // Local state to track the edit input value
    const [editValue, setEditValue] = useState(todo.text);

    // Checkbox clicking handle to toggle completion
    const handleToggle = () => {
        onToggle(todo.id);
    };

    // Delete button handling
    const handleDelete = () => {
        // Confirmation
        if (window.confirm("Are you sure you wan't to delete this todo?")) {
            onDelete(todo.id);
        }
    };

    // Enter edit mode and set the current text
    const handleEditClick = () => {
        setIsEditing(true);
        setEditValue(todo.text);
    };

    // Save edited text and exit edit mode
    const handleSaveEdit = () => {
        // Don't save, if the text is empty
        if (editValue.trim()) {
            onEdit(todo.id, editValue);
            setIsEditing(false);
        }
    };

    // Cancel editing and restore old text
    const handleCancelEdit = () => {
        setEditValue(todo.text);
        setIsEditing(false);
    };

    // Handle key presses in edit mode
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSaveEdit();
        } else if (e.key === 'Escape') {
            handleCancelEdit();
        }
    };

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {isEditing ? (
                <div className="edit-mode">
                    <input
                        type="text"
                        className="edit-input"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        maxLength={100}
                    />
                    <div className="edit-actions">
                        <button
                            className="save-button"
                            onClick={handleSaveEdit}
                            disabled={!editValue.trim()}
                        >
                            Save
                        </button>
                        <button
                            className="cancel-button"
                            onClick={handleCancelEdit}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                // Normal display mode
                <>
                    <input
                        type="checkbox"
                        className="todo-checkbox"
                        checked={todo.completed}
                        onChange={handleToggle}
                        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                    />

                    <span
                        className="todo-text"
                        onClick={handleToggle}
                        style={{
                            cursor: 'pointer',
                            textDecoration: todo.completed ? 'line-through' : 'none',
                            opacity: todo.completed ? 0.6 : 1
                        }}
                    >
                        {todo.text}
                    </span>

                    <div className="todo-actions">
                        {!todo.completed && (
                            <button
                                className="edit-button"
                                onClick={handleEditClick}
                                aria-label={`Edit "${todo.text}"`}
                            >
                                Edit
                            </button>
                        )}

                        <button
                            className="delete-button"
                            onClick={handleDelete}
                            aria-label={`Delete "${todo.text}"`}
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default TodoItem;