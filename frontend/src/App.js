import './App.css';
import { Routes as Switch ,Route,Navigate, Routes} from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import useAuthStore from './authStore/Store';
import React,{useEffect} from 'react';

// function App() {
//   return (
//     <div className="App">
//       <Switch>

//       <Route path='/' element={<Home/>}></Route>
//       <Route path='/login' element={<Login/>}></Route>
//       <Route path='/register' element={<Register/>}></Route>
      

//       </Switch>
//     </div>
//   );
// }

const App = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const initializeAuth = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login/>} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register/>} />
          <Route path="/" element={isAuthenticated ? <Home/> : <Navigate to="/login" />} />
        </Routes>
      </Container>
    </React.Fragment>
  );
};



export default App;
