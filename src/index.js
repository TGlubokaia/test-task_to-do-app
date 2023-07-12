import React from 'react';
import ReactDOM from 'react-dom/client';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { Provider } from 'react-redux';
import './index.css';
import { reducer } from './store/reducer';
import functionMiddleware from './store/middleware/function';
import { fetchProjects } from './store/api-action';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { projects } from './mocks/tasks';

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(functionMiddleware))
);

// Для добавления моков

localStorage.clear();
for (let key of Object.keys(projects)) {
  localStorage.setItem(`${key}`, JSON.stringify(projects[key]));
}

store.dispatch(fetchProjects());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
