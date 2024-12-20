import React, { useEffect, useState, useCallback } from 'react'
import { useInterval } from '../hooks/use-interval'
import { Button } from './button'
import { Timer } from './timer'
import { secondsToTime } from '../utils/seconds-to-time'
const bellStart = require('../sounds/bell-start.mp3')
const bellFinish = require('../sounds/bell-finish.mp3')

const audioStartWorking = new Audio(bellStart)
const audioStopWorking = new Audio(bellFinish)

interface Props {
   pomodoroTime: number
   shortRestTime: number
   longRestTime: number
   cycles: number
}

export function PomodoroTimer(props: Props): JSX.Element {
   const [mainTime, setMainTime] = useState(
    Number(localStorage.getItem('mainTime')) || props.pomodoroTime
    )
   const [timeCounting, setTimeCounting] = useState(false)
   const [working, setWorking] = useState(false)
   const [resting, setResting] = useState(false)
   const [cyclesQtdManager, setCyclesQtdManager] = useState(
      new Array(props.cycles - 1).fill(true)
   )
   const [completedCycles, setCompletedCycles] = useState(
      Number(localStorage.getItem('completedCycles')) || 0
   )
   const [fullWorkingTime, setFullWorkingTime] = useState(
      Number(localStorage.getItem('fullWorkingTime')) || 0
   )
   const [numberOfPomodoros, setNumberOfPomodoros] = useState(
      Number(localStorage.getItem('numberOfPomodoros')) || 0
   )

   useEffect(() => {
      localStorage.setItem('mainTime', JSON.stringify(mainTime))
      localStorage.setItem('fullWorkingTime', JSON.stringify(fullWorkingTime))
      localStorage.setItem('fullWorkingTime', JSON.stringify(fullWorkingTime))
      localStorage.setItem(
         'numberOfPomodoros',
         JSON.stringify(numberOfPomodoros)
      )
   }, [cyclesQtdManager, mainTime, completedCycles, fullWorkingTime, numberOfPomodoros])

   useInterval(
      () => {
         setMainTime(mainTime - 1)
         if (working) setFullWorkingTime(fullWorkingTime + 1)
      },
      timeCounting ? 1000 : null
   )

   const configureWork = useCallback((): void => {
      setTimeCounting(true)
      setWorking(true)
      setResting(false)
      audioStartWorking.play()
   }, [
      setTimeCounting,
      setWorking,
      setResting,
   ])
   const configureRest = useCallback(
      (isLong: boolean): void => {
         setTimeCounting(true)
         setWorking(false)
         setResting(true)
         if (isLong) setMainTime(props.longRestTime)
         if (!isLong) setMainTime(props.shortRestTime)
         audioStopWorking.play()
      },
      [
         setTimeCounting,
         setWorking,
         setResting,
         setMainTime,
         props.longRestTime,
         props.shortRestTime,
      ]
   )
   useEffect(() => {
      if (working) document.body.classList.add('working')
      if (resting) document.body.classList.remove('working')
      if (mainTime > 0) return
      if (working && cyclesQtdManager.length > 0) {
         configureRest(false)
         cyclesQtdManager.pop()
      } else if (working && cyclesQtdManager.length <= 0) {
         configureRest(true)
         setCyclesQtdManager(new Array(props.cycles - 1).fill(true))
         setCompletedCycles(completedCycles + 1)
      }
      if (working) setNumberOfPomodoros(numberOfPomodoros + 1)
      if (resting) configureWork()
   }, [
      working,
      resting,
      mainTime,
      configureRest,
      configureWork,
      setCyclesQtdManager,
      cyclesQtdManager,
      completedCycles,
      numberOfPomodoros,
      fullWorkingTime,
      props.cycles,
   ])

   return (
      <div className="pomodoro">
         <h2>
            You are: {working ? 'Working' : resting ? 'Resting' : 'Nothing'} !
         </h2>
         <Timer mainTime={mainTime} />
         <div className="controls">
            <Button text="Work" onClick={() => configureWork()}></Button>
            <Button text="Rest" onClick={() => configureRest(false)}></Button>
            <Button
               className={!working && !resting ? 'hidden' : ''}
               text={timeCounting ? 'Pause' : 'Play'}
               onClick={() => setTimeCounting(!timeCounting)}
            ></Button>
            <Button
               className={!working && !resting ? '' : 'hidden'}
               text="Restart Info"
               onClick={() => {
                  localStorage.clear()
                  window.location.reload()
               }}
            ></Button>
         </div>
         <div className="details">
            <p>Ciclos Concluidos: {completedCycles}</p>
            <p>Tempo Trabalhado: {secondsToTime(fullWorkingTime)}</p>
            <p>Número de Pomodoros: {numberOfPomodoros}</p>
         </div>
      </div>
   )
}
