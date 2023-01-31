import { formatDistanceToNow } from "date-fns";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import { Countdown } from "../Home/Countdown";
import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {
  const { cycles } = useContext(CyclesContext)

  const cyclesReversed = cycles.slice(0).reverse()
  
  return (
    <HistoryContainer>
      <h1>My history</h1>
      <Countdown visible={false}/>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              cyclesReversed.map(cycle => {
                return (
                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutesAmount} min</td>
                    <td>{formatDistanceToNow(new Date(cycle.startDate), { addSuffix: true })}</td>
                    <td>
                      { cycle.finishDate && <Status statusColor="green">Done</Status> }
                      { cycle.interruptDate && <Status statusColor="red">Interrupted</Status> }
                      { !cycle.finishDate && !cycle.interruptDate && <Status statusColor="yellow">On going</Status> }
                    </td>
                  </tr>
                )
              })
            }
            
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
