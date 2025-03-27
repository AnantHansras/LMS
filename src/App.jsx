import {Route,Routes} from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Signup from './Pages/SIgnup'
import ForgotPassword from './Pages/ForgotPassword'
import UpdatePassword from './Pages/UpdatePassword'
import OTP from './Pages/OTP'
import AllBooks from './Pages/AllBooks'
import IssuedBooks from './Pages/IssuedBooks'
import DashboardLayout from './Pages/DashboardLayout'
import AddBooks from './Pages/AddBooks'
import AllTransactions from './Pages/AllTransactions'
import Pending from './Pages/Pending'
function App() {
  

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/otp' element={<OTP/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/update-password/:id' element={<UpdatePassword/>}/>

        {/* <Route path='/allbooks' element={<AllBooks/>}/> */}

        {/* <Route path='/issuedbooks' element={<AllBooks/>}/>
        <Route path='/admin/allbooks' element={<AllBooks/>}/>
        <Route path='/admin/issuedbooks' element={<AllBooks/>}/> */}
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/allbooks" element={<AllBooks />} />
          <Route path="/addbooks" element={<AddBooks />} />
          <Route path="/issuedbooks" element={<IssuedBooks />} />
          <Route path="/admin/allbooks" element={<AllBooks />} />
          <Route path="/admin/issuedbooks" element={<IssuedBooks />} />
          <Route path="/transactions" element={<AllTransactions />} />
          <Route path="/pending-req" element={<Pending />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
