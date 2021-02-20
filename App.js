import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import ThemeConfig from './theme';
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

const history = createBrowserHistory();

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    
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
    </View>
  );
}
