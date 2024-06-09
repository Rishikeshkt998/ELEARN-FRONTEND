

import { ToastContainer } from 'react-toastify'
import './App.css'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminRoute from './Routes/AdminRoute'
import UserRoute from './Routes/UserRoute'
import TrainerRoute from './Routes/TrainerRoute'
import Error404 from './Components/common/ErrorPage/Error404'





function App() {

  return (

    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/*' element={<UserRoute/>} />
          <Route path='/tutor/*' element={<TrainerRoute />} />
          <Route path='/admin/*' element={<AdminRoute />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
