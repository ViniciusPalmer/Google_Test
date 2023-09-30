import { ThemeProvider } from "styled-components";
import {defaultTheme} from './styles/themes/default';
import { GlobalStyle } from "./styles/global";
import { Home } from "./pages/Home";
import { Result } from "./pages/Results";

export function App() {

  return (
    <ThemeProvider theme={defaultTheme} >
      <GlobalStyle />
      {/* <Home /> */}
      <Result />
    </ThemeProvider>
  )
}