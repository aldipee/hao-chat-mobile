import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';

import IndexHome from './src/index';

const App = () => {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <IndexHome />
      </PersistGate>
    </Provider>
  );
};

export default App;
