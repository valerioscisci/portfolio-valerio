import React, { useEffect, useState } from 'react';
import { Stores } from './types';
import ValerioStore from './stores/ValerioStore';
import { ThemeProvider } from 'styled-components';
import { Redirect, Route, BrowserRouter, Switch } from 'react-router-dom';
import { valerioTheme } from './theme';
import { StoresContext } from './contexts';
import HomeScreen from './screens/WelcomeScreen';
import { I18NLang } from './i18n';
import { useTranslation } from 'react-i18next';
import InstagramFeed from './components/InstagramFeed';

export const App: React.FC = () => {
  const { i18n } = useTranslation();
  const [stores] = useState<Stores>(() => {
    const root: Stores = {} as Stores;
    root.home = new ValerioStore();
    return root;
  });

  useEffect(() => {
    stores.home.setLanguage(i18n.language as I18NLang);
  }, [stores.home, i18n]);

  return (
    <ThemeProvider theme={valerioTheme}>
      <StoresContext.Provider value={stores}>
        <BrowserRouter>
          <Switch>
            <Route
              path={'/'}
              render={() => (
                <HomeScreen>
                  <InstagramFeed
                    account="valerioscisci"
                    numberOfMediaElements={12}
                    discardVideos={true}
                  />
                </HomeScreen>
              )}
            />
            <Redirect to={'/'} />
          </Switch>
        </BrowserRouter>
      </StoresContext.Provider>
    </ThemeProvider>
  );
};

export default App;
