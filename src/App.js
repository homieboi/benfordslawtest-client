import { rootReducer} from './store/rootReducer'
import { createStore } from 'redux'
import React from 'react'
import { View } from 'react-native-web'
import { Provider }  from 'react-redux'
import Header from './components/Header'
import NumbersList from './components/NumbersList'
import Result from './components/Result'
import './styles/main.css'

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

function App() {
  return (
    <Provider store={store}>
      <Header />
      <View style={{ flexDirection: 'row' }}>
        <NumbersList />
        <Result />
      </View>
    </Provider>
  );
}

export default App;
