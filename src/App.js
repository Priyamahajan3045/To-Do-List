import { useState } from "react";
import "./styles.css";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { text: input, completed: false }]);
    setInput("");
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const updated = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

  const saveEdit = () => {
    const updated = todos.map((todo, i) =>
      i === editIndex ? { ...todo, text: editText } : todo
    );
    setTodos(updated);
    setEditIndex(null);
    setEditText("");
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );

  const completed = todos.filter((t) => t.completed).length;

  return (
    <div className={darkMode ? "container dark" : "container"}>
      <div className="header">
        <h1>📝 Todo App</h1>
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <div className="stats">
        <span>Total: {todos.length}</span>
        <span>✅ Done: {completed}</span>
        <span>⏳ Left: {todos.length - completed}</span>
      </div>

      <div className="input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
          className="input"
        />
        <button className="add-btn" onClick={addTodo}>
          Add
        </button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍 Search tasks..."
        className="input search-input"
      />

      <ul className="todo-list">
        {filteredTodos.map((todo, index) => (
          <li
            key={index}
            className={todo.completed ? "todo-item completed" : "todo-item"}
          >
            {editIndex === index ? (
              <div className="input-row">
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="input edit-input"
                />
                <button className="save-btn" onClick={saveEdit}>
                  💾
                </button>
              </div>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(index)}
                />
                <span className="todo-text">{todo.text}</span>
                <div className="btn-group">
                  <button className="edit-btn" onClick={() => startEdit(index)}>
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTodo(index)}
                  >
                    ❌
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="empty">No tasks yet! Add one above ☝️</p>
      )}
    </div>
  );
}
