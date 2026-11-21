import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import { me } from './features/auth.js'
import { setUserData } from './redux/userSlice.js'
import Agents from './pages/Agents.jsx'
import Integration from './pages/Integration.jsx'
import CreateAgent from './pages/CreateAgent.jsx'

function App() {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.user.userData)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await me()
        dispatch(setUserData(data))
      } catch (error) {
        console.log(error)
      }
    }

    fetchUser()
  }, [dispatch])

  return (
   <>
<BrowserRouter>
<Routes>
  <Route path='/login' element={userData?<Navigate to={"/"}/>:<Login/>}/>
  <Route path='/' element={userData?<Home/>:<Navigate to={"/login"}/>}/>
  <Route path='/agents' element={userData?<Agents/>:<Navigate to={"/login"}/>}/>
  <Route path='/integration' element={userData?<Integration/>:<Navigate to={"/login"}/>}/>
  <Route path='/agents/new' element={userData?<CreateAgent/>:<Navigate to={"/login"}/>}/>
</Routes>
</BrowserRouter>
</>

  )
}

export default App