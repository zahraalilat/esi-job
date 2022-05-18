import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles.css';
import { ThemeProvider } from 'styled-components';
import App from './App';
import store from './store'
import reportWebVitals from './reportWebVitals';

const theme = {
    bgs: {
      primaryBg: localStorage.getItem('theme')==='dark' ? '#1c1c27' : '#fff',
      secondaryBg: 'rgb(250, 250, 250)'
    },
    colors: {
      mainColor: localStorage.getItem('theme')==='dark' ? '#fff' : '#222',
      secondaryColor: localStorage.getItem('theme')==='light' ? '#12182b' : '#fff',
      listColor: localStorage.getItem('theme')==='dark' ? '#fff' : '#444',
      listHover: localStorage.getItem('theme')==='dark' ? '#38395c' : '#f6f8fc',
      blueColor: '#3ea2f9',
      borderColor: localStorage.getItem('theme')==='dark' ? '#38395c' : '#e0e1ea',
      lightGray: '#33333e',
      darkGray: '#555870',
      primaryBlue: '#3568d4',
      secondaryBlue: '#3d7bfa',
      lightBlue: '#6798ff',
      darkGreen: '#05c270',
      lightGreen: '#57eba3',
      darkRed: '#ff3b3b',
      lightRed: '#ff8080',
    }
}

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
