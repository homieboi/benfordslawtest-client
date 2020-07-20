import { rootReducer } from './store/rootReducer'
import { createStore } from 'redux'
import React from 'react'
import { Provider }  from 'react-redux'
import { Main } from './components/Main'
import './styles/main.css'

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

function App() {
  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
}

export default App;
