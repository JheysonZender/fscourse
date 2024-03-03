import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}> {text} </button>

const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  if(good == 0 && neutral == 0 && bad == 0)
    return (<p>No feedback given</p>)
  else 
  return (
    <table>
      <tbody>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={good+neutral+bad}/>
      <StatisticLine text="average" value={((good-bad)/(good+neutral+bad)).toFixed(1) }/>
      <StatisticLine text="positive" value={((good/(good+neutral+bad))*100).toFixed(1)+"  %"} />
      </tbody>
    </table>
  )
}

const App = () => {

  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const newGood = good+1
    setGood(newGood)
  }

  const handleBad = () => {
    const newBad = bad+1
    setBad(newBad)
  }

  const handleNeutral = () => {
    const newNeutral = neutral+1
    setNeutral(newNeutral)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick = {handleGood} text = "good" />
      <Button onClick = {handleNeutral} text = "neutral" />
      <Button onClick = {handleBad} text = "bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App