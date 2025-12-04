import { Outlet } from 'react-router-dom';
import Header from './shared/components/layout/Header';
import './index.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
