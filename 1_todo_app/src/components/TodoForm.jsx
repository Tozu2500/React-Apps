import React, { useState } from 'react';

function TodoForm({ onAddTodo }) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputValue.trim() === '') {
            window.alert("Your todo was empty");
            return;
        }

        onAddTodo(inputValue.trim());

        setInputValue('');
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                    type="text"
                    className="todo-input"
                    placeholder="Enter your to-do here"
                    value={inputValue}
                    onChange={handleChange}
                    autoFocus
                    maxLength={100}
                />
                <button
                    type="submit"
                    className="add-button"
                    disabled={inputValue.trim() === ''}
                >
                    Add Todo
                </button>
            </div>

            <div className="character-count">
                {inputValue.length}/100 characters
            </div>
        </form>
    );
}

export default TodoForm;