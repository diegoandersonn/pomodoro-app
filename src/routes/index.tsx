import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Pomodoro from '../pages/pomodoro'
import ConfigPage from '../pages/configPage'

export default function MyRoutes() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Pomodoro />} />
            <Route path="/Config" element={<ConfigPage />} />
         </Routes>
      </BrowserRouter>
   )
}
