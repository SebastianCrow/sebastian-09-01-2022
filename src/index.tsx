import 'react-app-polyfill/ie11';
import './shared/utils/polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';

import { App } from './packages/app/components/app.component';

// The same id as in the public/index.html. They need to be synced.
const ROOT_ELEMENT_ID = 'root';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById(ROOT_ELEMENT_ID)
);
