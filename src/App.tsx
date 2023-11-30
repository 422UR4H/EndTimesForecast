import GlobalStyles from "./styles/global";
import { ThemeProvider, DefaultTheme } from "styled-components";
import light from "./styles/themes/light";
import dark from "./styles/themes/dark";
import usePersistedState from "./hooks/usePersistedState";
import HomePage from "./pages/HomePage";
import { THEME_PERSISTED_KEY } from "./utils/constants";
import { Theme } from "./utils/enums";

// type Todos = {
//   userId: number;
//   id: number;
//   title: "string";
//   completed: boolean;
// };

function App() {
  const [theme, setTheme] = usePersistedState<DefaultTheme>(
    THEME_PERSISTED_KEY,
    light
  );

  function toggleTheme() {
    setTheme(theme.title === Theme.Light ? dark : light);
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <HomePage themeTitle={theme.title} toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}

export default App;
