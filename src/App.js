import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import {
  Route, Routes
} from "react-router-dom";
import { useAuth } from './contex/AuthContext';
import Dashborad from './pages/Dashborad';
import Login from './pages/Login';
function App() {
  const { currentUser } = useAuth()
  console.log(currentUser);
  const user = localStorage.getItem('userName')

  return (
    <>
      <Routes>
        {
          user ? (
            <>
              <Route path="/dashboard" element={<Dashborad />} />
              <Route path="/" element={<Dashborad />} />
            </>
          )
            : (
              <>
                <Route path="/login" element={<Login />} />
              </>
            )
        }

        {/* <Route path="/dashboard" element={<Dashborad />} />
        <Route path="/login" element={<Login />} /> */}
      </Routes>
    </>
  );
}

export default App;
