import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import './App.css';
import Dashboard from './components/Dashboard';
import rootReducer from './redux/reducers';
import logger  from 'redux-logger';

function App() {
	const store = createStore(rootReducer, applyMiddleware(logger));
  return (
		<Provider store={store}>
			<Dashboard />
		</Provider>
  );
}

export default App;
