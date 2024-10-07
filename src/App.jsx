import PWABadge from './PWABadge.jsx';
import Navbar from './components/Navbar.jsx';
import './App.css';

function App() {
  return (
    <>
      <div className="flex justify-center"><Navbar/></div>
      <PWABadge />
    </>
  );
}

export default App;
