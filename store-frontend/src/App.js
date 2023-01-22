import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard';
import { ActionCableProvider } from 'react-actioncable-provider';
import { ACTION_CABLE_URL } from './components/constants';

function App() {
  return (
    <div className="App">
      <ActionCableProvider url={ACTION_CABLE_URL}>
        <Dashboard />
      </ ActionCableProvider>
    </div>
  );
}

export default App;
