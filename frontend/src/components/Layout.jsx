import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import PlayerBar from './PlayerBar';

const Layout = () => {
  return (
    <div className="app-container">
      <div className="main-flex">
        <Sidebar />
        <Outlet />
      </div>
      <PlayerBar />
    </div>
  );
};

export default Layout;
