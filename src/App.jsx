import { Outlet } from 'react-router-dom';
import Home from './Home/Home';
import Navbar from './Navbar/Navbar';

const App = () => {
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <Outlet></Outlet>
      </div>

    </div>
  );
};

export default App;