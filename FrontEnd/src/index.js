import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Provider} from 'react-redux';
import store from './store/store';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from './Store';

ReactDOM.render(
  
    <React.StrictMode>
      <StoreProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </StoreProvider>
    </React.StrictMode>,
   document.getElementById('root')
);

reportWebVitals();
