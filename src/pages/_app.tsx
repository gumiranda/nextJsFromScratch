import '../../styles/style.scss';
import { Provider } from 'react-redux';
import { appStore, appPersistor } from '@/appStore/appStore';
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={appStore}>
      <PersistGate persistor={appPersistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
