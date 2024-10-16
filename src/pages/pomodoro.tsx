import React from 'react'
import { PomodoroTimer } from '../components/pomodoro-timer'
import Header from '../components/header'

export default function Pomodoro() {
   return (
      <>
         <Header />
         <div className="container">
            <PomodoroTimer
               pomodoroTime={Number(localStorage.getItem('pomodoroTime')) || 1500}
               shortRestTime={Number(localStorage.getItem('shortRestTime')) || 300}
               longRestTime={Number(localStorage.getItem('longRestTime')) || 900}
               cycles={Number(localStorage.getItem('cycles')) || 4}
            />
         </div>
      </>
   )
}