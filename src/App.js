import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navigate,
  Route, Routes
} from "react-router-dom";
import { useAuth } from './contex/AuthContext';
import CreateNewProject from './pages/CreateNewProject';
import Dashborad from './pages/Dashborad';
import Login from './pages/Login';
import NotFound from './pages/NotFound';


function App() {
  const { currentUser } = useAuth()
  // console.log(currentUser);
  // const user = localStorage.getItem('userName')


  return (
    <>
      <Routes>

        {
          currentUser.length ?
            (
              <>
                <Route path="/dashboard/:id" element={<Dashborad />} />
                <Route path="/" element={<Navigate to="/dashboard/1" replace />} />
                <Route path="/create" element={<CreateNewProject />} />
              </>
            )
            :
            (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Login />} />
              </>
            )
        }
        <Route path="*" element={<NotFound />} />
        <Route path="/out" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashborad />} />
        <Route path="/login" element={<Login />} /> */}
      </Routes>
    </>
  );
}

export default App;
