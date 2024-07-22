import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard.jsx';
import Navbar from './Components/Navbar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './Components/Signin.jsx';
import SignUp from './Components/Signup.jsx';
import Forgetpassword from './Components/Forgetpassword.jsx';
import FetchData from './Components/FetchData.jsx';
import AddUser from './Components/AddUser.jsx';
import ConfirmPassword from './Components/ConfirmPassword.jsx'
import Update from './Components/Update.jsx';

const App = () => {

  const [token,setToken] = useState('')

  return (
    <div>

      {/* <h1>App</h1> */}
      {/* <Navbar/>*/}

      <div>
      <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/forgetpass' element={<Forgetpassword/>}/>
          <Route path='/fetchdata' element={<FetchData/>}/>
          <Route path='/confirmpassword/:id/token' element={<ConfirmPassword token = {token}/>}/>
          <Route path='/adduser' element={<AddUser/>}/>
          <Route path='/update/:id' element={<Update/>}/>
      </Routes>
      </div>
    </div>
  );
};

export default App;