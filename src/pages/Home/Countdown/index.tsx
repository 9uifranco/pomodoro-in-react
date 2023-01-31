import { differenceInSeconds } from "date-fns";
import { useContext, useEffect } from "react";
import { CyclesContext } from "../../../contexts/CyclesContext";
import { CountdownContainer, SeparatorGreen, SeparatorRed } from "./styles";

interface CountdownProps {
    visible?: boolean
}

export function Countdown({ visible = true }: CountdownProps) {
    const { activeCycle, activeCycleId, amountSecondsPassed, markCurrentCycleAsFinished, setSecondsPassed } = useContext(CyclesContext)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    useEffect(() => {
        let interval: number

        if(activeCycle) {
            interval = setInterval(() => {
            const secondsPassed = differenceInSeconds(
                new Date(), 
                new Date(activeCycle.startDate)
            )

            if(secondsPassed >= totalSeconds) {
                markCurrentCycleAsFinished()
                setSecondsPassed(totalSeconds)
                clearInterval(interval)
            } else {
                setSecondsPassed(secondsPassed)
            }
            }, 1000)
        }

        return(() => {
            clearInterval(interval)
        })
    }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished, setSecondsPassed])

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const timerMinutes = Math.floor(currentSeconds / 60)
    const timerSeconds = currentSeconds % 60
  
    const minutes = String(timerMinutes).padStart(2, '0')
    const seconds = String(timerSeconds).padStart(2, '0')
  
    useEffect(() => {
      if(activeCycle) {
        document.title = `${minutes}:${seconds}`
      }
      else {
        document.title = 'pomodoro'
      }
    }, [minutes, seconds, activeCycle])

    return (
        <div>
            {
                visible ? (
                    <CountdownContainer>
                        <span>{minutes[0]}</span>
                        <span>{minutes[1]}</span>
                        {
                            activeCycle ?
                                (
                                    <SeparatorRed>:</SeparatorRed>
                                )
                                :
                                (
                                    <SeparatorGreen>:</SeparatorGreen>
                                )
                        }
                        <span>{seconds[0]}</span>
                        <span>{seconds[1]}</span>
                    </CountdownContainer>
                )
                : <span/>
            }
        </div>
    )
    
}