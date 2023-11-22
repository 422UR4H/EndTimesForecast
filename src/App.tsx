import axios from "axios";
import { useEffect, useState } from "react";

type Todos = {
  userId: number;
  id: number;
  title: "string";
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todos[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    const URL = import.meta.env.VITE_API_URL;
    axios
      .get(`${URL}/todos`)
      .then(({ data }) => {
        setTodos(data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  return (
    <>
      {todos.length > 0 ? (
        <ul>
          {todos?.map((t) => (
            <li key={t.id}>
              <input type="checkbox" checked={t.completed} readOnly />
              {t.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>Await...</p>
      )}
    </>
  );
}

export default App;
