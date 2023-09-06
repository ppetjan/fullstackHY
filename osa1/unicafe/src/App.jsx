import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = ({value, text, unit}) => (
  <tbody>
    <tr>
      <td> {text} </td>
      <td> {value} {unit} </td>
    </tr>
  </tbody>
)

const Statistics = ({good, neutral, bad}) => {
  let total = good + neutral + bad
  if (!total) return (<p> No feedback given </p>)
  return (
    <table>
      <StatisticsLine value={good} text="good"/>
      <StatisticsLine value={neutral} text="neutral"/>
      <StatisticsLine value={bad} text="bad"/>
      <StatisticsLine value={total} text="total"/>
      <StatisticsLine value={(good-bad)/total} text="average"/>
      <StatisticsLine value={(good/total*100)} text="positive" unit="%"/>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral"/>
      <Button handleClick={() => setBad(bad+1)} text="bad"/>

      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App