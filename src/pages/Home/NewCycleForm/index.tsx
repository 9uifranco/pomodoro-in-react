import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useFormContext } from 'react-hook-form'
import { useContext } from "react";
import { CyclesContext } from "../../../contexts/CyclesContext";

export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext)

    const { register } = useFormContext()
    
    return (
        <FormContainer>
          <label htmlFor="myTask">My task is</label>
          <TaskInput
            id="task"
            placeholder="type your task here"
            type="text"
            list="task-suggestions"
            disabled={!!activeCycle}
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto1"/>
          </datalist>
          <label htmlFor="minutesAmount">for</label>
          <MinutesAmountInput
            id="minutesAmount"
            placeholder="00"
            type="number"
            step={1}
            min={1}
            max={60}
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutes.</span>
        </FormContainer>
    )
}