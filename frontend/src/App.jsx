import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
function App() {

   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [user, setUser] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      const token = localStorage.getItem('token');

      if (token) {
         const jwtPayload = JSON.parse(window.atob(token && token.split('.')[1]))

         if (!jwtPayload || Date.now() / 1000 > jwtPayload.exp) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setIsAuthenticated(false);
            navigate('/auth');
            alert('Session expired! Please login again.');
            return
         }
         setIsAuthenticated(true);
      }
      else {
         setIsAuthenticated(false);
      }

      if (isAuthenticated) {
         const user = JSON.parse(localStorage.getItem('user'));
         setUser(user);
         navigate('/');
      }
      else {
         navigate('/auth');
      }

   }, [isAuthenticated, navigate]);

   return (
      <>
         <Routes>
            <Route path='/' element={<Dashboard user={user} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />} />
            <Route path='/auth' element={<Auth setUser={setUser} setIsAuthenticated={setIsAuthenticated} />} />
         </Routes>
      </>
   );
}

export default App;
