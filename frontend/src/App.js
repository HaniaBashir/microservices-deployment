import React, { useState } from 'react';
export default function App() {
  const [token, setToken] = useState('');
  const [todos, setTodos] = useState([]);
  const login = async () => {
    const res = await fetch('/api/auth/login', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ username:'user', password:'pass' })
    });
    const { token } = await res.json();
    setToken(token);
  };
  const fetchTodos = async () => {
    const res = await fetch('/api/todo/todos', { headers:{ Authorization:`Bearer ${token}` } });
    setTodos(await res.json());
  };
  return (
    <div>
      <button onClick={login}>Login</button>
      <button onClick={fetchTodos}>Get Todos</button>
      <ul>{todos.map((t,i)=><li key={i}>{t.text}</li>)}</ul>
    </div>
  );
}