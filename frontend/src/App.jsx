import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import { useEffect } from 'react'
import { me } from './features/auth.js'

function App() {
  useEffect(() => {
    const fetch = async () => {
      try{
         const data = await me()
      }catch(error){
         console.log(error)
      }
    }
     fetch()
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App