import { useState, useEffect } from 'react'
import peopleService from './services/people'

const Filter = ({ currentFilter, handleFilter }) => (
  <div>
    filter shown with
    <input
      onChange={handleFilter}
      value={currentFilter}
    /> 
  </div>
)

const PersonsForm = ({ addPerson, handleNameChange, handleNumberChange,
                       newName, newNumber }) => (
  <form onSubmit={addPerson}>
    <div>
      name: 
      <input 
        onChange={handleNameChange} 
        value={newName}
      />
    </div>
    <div>
      number:
      <input
        onChange={handleNumberChange}
        value={newNumber}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form> 
)

const Persons = ({ persons, currentFilter, deletePerson }) => (
  persons.filter(person => person.name.toLowerCase().includes(currentFilter.toLowerCase()))
        .map(person => 
          <p key={person.name}> 
            {person.name} {person.number} 
            <button onClick={() => deletePerson(person)}>delete</button>
          </p>)
)

const Notification = ({ message, error }) => {
  if ( message === null ) {
    return null
  }
  
  if (error) return (
    <div className='errorNotification'>
      {message}
    </div>
  )

  return (
    <div className='actionNotification'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    peopleService.getAll()
      .then(people => setPersons(people))
  }, [])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [currentFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorCaught, setErrorCaught] = useState(false)

  const addPerson = (event) => {
    event.preventDefault()  
    const duplicate = persons.find(person => person.name === newName)

    if (duplicate) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        peopleService.update(duplicate.id, {...duplicate, number: newNumber})
          .then(response => {
            setPersons(persons.map(person => 
              person.id !== duplicate.id ? person : response)
            )})
          .catch(error => {
            setErrorCaught(true)
            setNotificationMessage(`${duplicate.name} was already removed from the server`)
            setTimeout(() => { 
              setNotificationMessage(null)
              setErrorCaught(false)
            }, 5000)
          })
        setNotificationMessage(`Added new number for ${duplicate.name}`)
        setTimeout(() => setNotificationMessage(null), 5000)
      }
      setNewName('')
      setNewNumber('')
      return
    }
    
    peopleService.create({name: newName, number: newNumber})
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        setNotificationMessage(`Added ${addedPerson.name}`)
        setTimeout(() => setNotificationMessage(null), 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setErrorCaught(true)
        setNotificationMessage(error.response.data.error)
        setTimeout(() => {
          setNotificationMessage(null)
          setErrorCaught(false)
        }, 5000)
      })
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      peopleService.remove(person.id)
        .then(() =>
          peopleService.getAll()
            .then(response => {
              setPersons(response)
              setNotificationMessage(`Removed ${person.name}`)
              setTimeout(() => setNotificationMessage(null), 5000)
            }))
    }
    return
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}
                    error={errorCaught}/>
      <Filter currentFilter={currentFilter}
              handleFilter={handleFilter}/> 
      <h3>Add a new person</h3>
      <PersonsForm addPerson={addPerson} 
                   handleNameChange={handleNameChange} 
                   handleNumberChange={handleNumberChange}
                   newName={newName} newNumber={newNumber}/>
      <h3>Numbers</h3>
      <Persons persons={persons} currentFilter={currentFilter}
               deletePerson={deletePerson}/>
    </div>
  )
}

export default App