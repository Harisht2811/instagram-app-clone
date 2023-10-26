import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { Login } from './Component/Pages/Login';
import { Signup } from './Component/Pages/Signup';
import { Mainpage } from './Component/Layout/Mainpage';
import { UserAuthContextProvider } from './Firebase/Userauth';
import ProtectedRoute from './Utils/Protectedroute';

function App() {

  return (
    <div className="App">
      <Toaster />
      <BrowserRouter>
        <UserAuthContextProvider>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route exact path='/:screens' element={<Mainpage />} />
            </Route>
            <Route exact path='/' element={<Login />}></Route>
            <Route exact path='/signup' element={<Signup />}></Route>

          </Routes>
        </UserAuthContextProvider>

      </BrowserRouter>
    </div>
  );
}

export default App;
