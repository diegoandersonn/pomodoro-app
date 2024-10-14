import React from 'react'
import { PomodoroTimer } from '../components/pomodoro-timer'
import Header from '../components/header'

function App() {
   return (
      <>
         <Header />
         <div className="container">
            <PomodoroTimer
               pomodoroTime={1500}
               shortRestTime={300}
               longRestTime={900}
               cycles={4}
            />
         </div>
      </>
   )
}

export default App
