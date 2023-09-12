const Course = ({ course }) => (
    <>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
    </>
  )
  
  const Header = ({ name }) => (
    <h2> {name} </h2>
  )
  
  
  const Content = ({ parts }) => (
    <>
      {parts.map(part => 
        <Part key={part.id} part={part}/>
      )}
      <Total parts={parts}/>
    </>
  )
  
  const Total = ({ parts }) => {
    let total = parts.reduce((total, part) => total + part.exercises, 0)
    return (
      <b>Total of {total} exercises</b>
    )
  }
  
  
  const Part = ({ part }) => (
    <p> {part.name} {part.exercises} </p>
  )

export default Course