import React, { useState } from 'react';
import { Stores } from './types';
import ValerioStore from './stores/ValerioStore';
import { ThemeProvider } from 'styled-components';
import { Redirect, Route, BrowserRouter, Switch } from 'react-router-dom';
import { valerioTheme } from './theme';
import { StoresContext } from './contexts';
import HomeScreen from './screens/WelcomeScreen';

export const App: React.FC = () => {
  const [stores] = useState<Stores>(() => {
    const root: Stores = {} as Stores;
    root.home = new ValerioStore();
    return root;
  });

  return (
    <ThemeProvider theme={valerioTheme}>
      <StoresContext.Provider value={stores}>
        <BrowserRouter>
          <Switch>
            <Route path={'/'} component={HomeScreen} />
            <Redirect to={'/'} />
          </Switch>
        </BrowserRouter>
      </StoresContext.Provider>
    </ThemeProvider>
  );
};

export default App;
