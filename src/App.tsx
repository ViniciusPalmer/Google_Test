import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";

import { SearchInputProvider } from "./contexts/searchInput";
import { AnimalsDataProvider } from "./contexts/animalData";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <SearchInputProvider>
          <AnimalsDataProvider>
            <Router />
          </AnimalsDataProvider>
        </SearchInputProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
