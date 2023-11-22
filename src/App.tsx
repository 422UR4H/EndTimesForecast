import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);

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
        alert("Something wrong!");
      });
  }
  if (todos.length > 0) {
    console.log(todos)
  }

  return (
    <>
      {/* {todos.length > 0 ? (
        <ul>
          {todos?.map((t, i) => (
            <li key={i}>
              {t}
            </li>
          ))}
        </ul>
      ) : (
        <p>Await...</p>
      )} */}
    </>
  );
}

export default App;
