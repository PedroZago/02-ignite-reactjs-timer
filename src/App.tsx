import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { CyclesProvider } from './contexts/CyclesContext';
import { Router } from './Router';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesProvider>
          <Router />
        </CyclesProvider>

        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>
  );
};
