import React, { useEffect, useState } from 'react';
import { Stores } from './types';
import ValerioStore from './stores/ValerioStore';
import { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import { valerioTheme } from './theme';
import { StoresContext } from './contexts';
import { HomeScreen } from './screens/WelcomeScreen';
import { I18NLang } from './i18n';
import { useTranslation } from 'react-i18next';
import { Spinner } from './components/common/Spinner';
import { InstagramFeed } from './components/welcomePage/InstagramFeed';
import { observer } from 'mobx-react';
import { AboutScreen } from './screens/AboutScreen';
// import { Seo } from './components/navigation/Seo';
import ReactGA from 'react-ga';

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
    stores.home.fetchInstagramPics();
    if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        debug: true,
      });
    }
  }, [stores.home, i18n]);

  const Routes = (props: any) => (
    <Router {...props}>
      <Switch>
        <Route
          exact
          path={'/'}
          render={() => (
            <HomeScreen>
              <InstagramFeed
                account={'the_wanderer_developer'}
                numberOfMediaElements={12}
                media={stores.home.instagramImages}
                status={stores.home.instagramFetchingStatus}
              />
            </HomeScreen>
          )}
        />
        <Route path={'/about'} render={() => <AboutScreen />} />
        <Redirect to={'/'} />
      </Switch>
      {/* <Seo /> */}
    </Router>
  );

  return (
    <ThemeProvider theme={valerioTheme}>
      <StoresContext.Provider value={stores}>
        {stores.home.isAppLoading ? <Spinner /> : <Routes />}
      </StoresContext.Provider>
    </ThemeProvider>
  );
});

export default App;
