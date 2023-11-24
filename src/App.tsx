import GlobalStyles from "./styles/global";
import { ThemeProvider, DefaultTheme } from "styled-components";
import light from './styles/themes/light';
import dark from './styles/themes/dark';
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
      <HomePage themeTitle={theme.title} toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}

export default App;
