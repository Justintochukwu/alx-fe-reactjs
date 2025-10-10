// src/App.jsx
import React from "react";
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';


function App() {
  return (
    <div>
      <TodoList />
      <AddTodoForm />
      <h1>Todo App</h1>
    </div>
  );
}

export default App;
