import { differenceInSeconds } from "date-fns";
import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";

interface CreateCycleData {
    task: string
    minutesAmount: number
}

interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
    interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
    children: ReactNode
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {

    const storedStateAsJSON = localStorage.getItem('@pomodoro:cycles-state-1.0.0')

    const initialState = {
        cycles: [],
        activeCycleId: null 
    }

    const initialStateJSON = JSON.stringify(initialState)
    
    if(!storedStateAsJSON) {
        localStorage.setItem('@pomodoro:cycles-state-1.0.0', initialStateJSON)
    }

    const [cyclesState, dispatch] = useReducer(cyclesReducer, initialState, () => {
        if(storedStateAsJSON) {
            return JSON.parse(storedStateAsJSON)
        }
    })

    

    const { cycles, activeCycleId } = cyclesState;

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if(activeCycle) {
            return differenceInSeconds(
                new Date(), 
                new Date(activeCycle.startDate)
            )
        }
        
        return 0
    })

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)
        
        localStorage.setItem('@pomodoro:cycles-state-1.0.0', stateJSON)
    }, [cyclesState])


    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
     }

    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime())
    
        const newCycle: Cycle = {
          id,
          task: data.task,
          minutesAmount: data.minutesAmount,
          startDate: new Date()
        }

        dispatch(addNewCycleAction(newCycle))
        setAmountSecondsPassed(0)
      }
    
    function interruptCurrentCycle() {
        dispatch(interruptCurrentCycleAction())
    }

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction())
    }

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                amountSecondsPassed,
                markCurrentCycleAsFinished,
                setSecondsPassed,
                createNewCycle,
                interruptCurrentCycle
            }}>
            {children}
        </CyclesContext.Provider>
    )
}