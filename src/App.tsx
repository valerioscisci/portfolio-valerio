import React, { useState } from 'react';
import { Stores } from './types';
import ValerioStore from './stores/ValerioStore';
import { ThemeProvider } from 'styled-components';
import { valerioTheme } from './theme';
import { StoresContext } from './contexts';

export const App: React.FC = () => {
  const [stores] = useState<Stores>(() => {
    const root: Stores = {} as Stores;
    root.home = new ValerioStore();
    return root;
  });
  return (
    <ThemeProvider theme={valerioTheme}>
      <StoresContext.Provider value={stores}>
        <div>{`Valerio Portfolio`}</div>
      </StoresContext.Provider>
    </ThemeProvider>
  );
};

export default App;
