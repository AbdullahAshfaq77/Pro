import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import { me } from './features/auth.js'
import { setUserData } from './redux/userSlice.js'

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
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={userData ? <Navigate to="/home" replace /> : <Login />}
        />
        <Route
          path="/home"
          element={userData ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={userData ? <Navigate to="/home" replace /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App