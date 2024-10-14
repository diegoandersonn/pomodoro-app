import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../pages/pomodoro'
import ConfigPage from '../pages/configPage'

export default function MyRoutes() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<App />} />
            <Route path="/Config" element={<ConfigPage />} />
         </Routes>
      </BrowserRouter>
   )
}
