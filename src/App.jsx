import {Route,Routes} from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Signup from './Pages/SIgnup'
import ForgotPassword from './Pages/ForgotPassword'
import UpdatePassword from './Pages/UpdatePassword'
import OTP from './Pages/OTP'
function App() {
  

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/otp' element={<OTP/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/update-password/:id' element={<UpdatePassword/>}/>
      </Routes>
    </div>
  )
}

export default App
