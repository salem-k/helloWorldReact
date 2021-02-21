import React, { Suspense } from 'react';
import ThemeConfig from '~/theme';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import routes, { renderRoutes } from '~/routes';
import ScrollToTop from '~/components/ScrollToTop';
import GoogleAnalytics from '~/components/GoogleAnalytics';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import NotistackProvider from '~/components/NotistackProvider';
import FirebaseProvider from '~/components/Auth/FirebaseProvider';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

// ----------------------------------------------------------------------

import 'lazysizes';
import '~/_mock_api_';
import '~/utils/i18n';
import '~/utils/highlight';
import 'intersection-observer';
import 'simplebar/src/simplebar.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'slick-carousel/slick/slick.css';
import 'react-image-lightbox/style.css';
import 'react-quill/dist/quill.snow.css';
import 'slick-carousel/slick/slick-theme.css';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from '~/serviceWorker';
import { store, persistor } from '~/redux/store';
import LoadingScreen from '~/components/LoadingScreen';
import { PersistGate } from 'redux-persist/lib/integration/react';

const history = createBrowserHistory();

function App() {
  return ReactDOM.render(
    <Suspense fallback={<LoadingScreen />}>
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>

    <ThemeConfig>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <NotistackProvider>
          <Router history={history}>
            <FirebaseProvider>
              <ScrollToTop />
              <GoogleAnalytics />
              {renderRoutes(routes)}
            </FirebaseProvider>
          </Router>
        </NotistackProvider>
      </LocalizationProvider>
    </ThemeConfig>


      </PersistGate>
    </Provider>
  </Suspense>,
  document.getElementById('root'),
  serviceWorker.unregister()
  );
}

export default App;
