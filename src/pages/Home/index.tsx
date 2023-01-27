import { Play } from 'phosphor-react'
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="myTask">My task is</label>
          <TaskInput
            id="task"
            placeholder="type your task here"
            type="text"
            list="task-suggestions"
          />
          <datalist id="task-suggestions">
            <option value="Projeto1"/>
          </datalist>
          <label htmlFor="minutesAmount">for</label>
          <MinutesAmountInput
            id="minutesAmount"
            placeholder="00"
            type="number"
            step={5}
            min={5}
            max={5}
          />
          <span>minutes.</span>
        </FormContainer>
      
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit">
          <Play size={24}/>
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
