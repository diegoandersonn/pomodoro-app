import React, { useEffect, useState } from 'react'

export default function ConfigForm(): JSX.Element {
   const [pomodoroTime, setPomodoroTime] = useState<number>(
      Number(localStorage.getItem('pomodoroTime')) || 1500
   )
   const [shortRestTime, setShortRestTime] = useState<number>(
      Number(localStorage.getItem('shortRestTime')) || 300
   )
   const [longRestTime, setLongRestTime] = useState<number>(
      Number(localStorage.getItem('longRestTime')) || 900
   )
   const [cycles, setCycles] = useState<number>(
      Number(localStorage.getItem('cycles')) || 4
   )

   useEffect(() => {
      localStorage.setItem('pomodoroTime', JSON.stringify(pomodoroTime))
      localStorage.setItem('shortRestTime', JSON.stringify(shortRestTime))
      localStorage.setItem('longRestTime', JSON.stringify(longRestTime))
      localStorage.setItem('cycles', JSON.stringify(cycles))
   }, [pomodoroTime, shortRestTime, longRestTime, cycles])

   const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ): void => {
      const { name, value } = event.target
      console.log(event.target)
      if (name === 'pomodoroTime') setPomodoroTime(Number(value))
      if (name === 'shortRestTime') setShortRestTime(Number(value))
      if (name === 'longRestTime') setLongRestTime(Number(value))
      if (name === 'cycles') setCycles(Number(value))
   }

   return (
      <>
         <form className="config-form">
            <div className="form-tittle">
               <h1>Configurações</h1>
            </div>
            <div className="row">
               <div className="form-inputs">
                  <h2>Tempo de trabalho</h2>
                     <input
                        type="text"
                        name="pomodoroTime"
                        value={pomodoroTime}
                        onChange={handleInputChange}
                     />
                  <h2>Ciclos</h2>
                  <input
                     type="text"
                     name="cycles"
                     value={cycles}
                     onChange={handleInputChange}
                  />
               </div>
               <div className="form-inputs">
                  <h2>Tempo de Descanso Longo</h2>
                  <input
                     type="text"
                     name="longRestTime"
                     value={longRestTime}
                     onChange={handleInputChange}
                  />
                  <h2>Tempo de Descanso Curto</h2>
                  <input
                     type="number"
                     name="shortRestTime"
                     value={shortRestTime}
                     onChange={handleInputChange}
                  />
               </div>
            </div>
         </form>
      </>
   )
}
