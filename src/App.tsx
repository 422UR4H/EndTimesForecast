// import axios from "axios";
import { useEffect } from "react";
import GlobalStyles from "./styles/global";
import { ThemeProvider, DefaultTheme } from "styled-components";
import light from './styles/themes/light';
import dark from './styles/themes/dark';
import Swal from "sweetalert2";
import Switch from "react-switch";
import usePersistedState from "./hooks/usePersistedState";
import HomePage from "./pages/HomePage";

// type Todos = {
//   userId: number;
//   id: number;
//   title: "string";
//   completed: boolean;
// };

function App() {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light);
  // const themeContext = useContext(ThemeContext);

  function toggleTheme() {
    setTheme(theme.title === 'light' ? dark : light);
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <HomePage theme={theme} toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}

export default App;
