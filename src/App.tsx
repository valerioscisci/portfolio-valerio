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
import { Spinner } from './components/Spinner';
import InstagramFeed from './components/InstagramFeed';
import { observer } from 'mobx-react';

export const App: React.FC = observer(() => {
  const { i18n } = useTranslation();
  const [stores] = useState<Stores>(() => {
    const root: Stores = {} as Stores;
    root.home = new ValerioStore();
    return root;
  });

  useEffect(() => {
    stores.home.setLanguage(i18n.language as I18NLang);
    stores.home.fetchImages();
    stores.home.fetchInstagramPics('valerioscisci');
  }, [stores.home, i18n]);

  return (
    <ThemeProvider theme={valerioTheme}>
      <StoresContext.Provider value={stores}>
        {stores.home.isAppLoading ? (
          <Spinner />
        ) : (
          <BrowserRouter>
            <Switch>
              <Route
                path={'/'}
                render={() => (
                  <HomeScreen>
                    <InstagramFeed
                      account={'valerioscisci'}
                      numberOfMediaElements={12}
                      media={stores.home.instagramImages}
                      status={stores.home.instagramFetchingStatus}
                    />
                  </HomeScreen>
                )}
              />
              <Redirect to={'/'} />
            </Switch>
          </BrowserRouter>
        )}
      </StoresContext.Provider>
    </ThemeProvider>
  );
});

export default App;
