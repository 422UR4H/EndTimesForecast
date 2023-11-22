import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
      .get(`${URL}/todosa`)
      .then(({ data }) => {
        setTodos(data);
      })
      .catch((e) => {
        Swal.fire({
          title: "Ooops",
          text: "Something went wrong",
          timer: 5000,
          showCloseButton: true,
          confirmButtonText: "Okay...",
          confirmButtonColor: "red",
          icon: "error",
        });
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
