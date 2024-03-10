import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'  
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(()=>{
    personService.getAll()
    .then(initialPersons => setPersons(initialPersons))
  },[])
  //console.log('render', persons.length, 'persons')


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newTerm, setNewTerm] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({message: "", tipo: ""})

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleTermChange = (e) => {
    setNewTerm(e.target.value)
  }

  const PersonsToShow = (newTerm === "")
    ? persons
    : persons.filter(person => person.name.toLocaleLowerCase().includes(newTerm.toLocaleLowerCase()))

  const addPerson = (e) => {
    e.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    let duplicate = false

    persons.map(person => {
      if (person.name === newName) {
        newPerson.id=person.id  
        duplicate = true
      }
    })
    
    if(!duplicate){
      personService.create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotificationMessage(
          {
           message: `Added ${newPerson.name}`,
           tipo: 'success' 
          } 
        )
        setTimeout(() => {
          setNotificationMessage({message: "", tipo: ""})
        }, 5000)
        setNewName('')
        setNewNumber('')
        
      })   
    }else {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
        .update(newPerson.id, newPerson)
        .catch(error=>{
          setNotificationMessage( {message: `Information of '${newPerson.name}' has already removed from server`, tipo: "error"})
          setTimeout(() => {
            setNotificationMessage({message: "", tipo: ""})
          }, 5000)
          setPersons(persons.filter(n => n.id !== newPerson.id))
        })
        setPersons(persons.map(person => person.id!=newPerson.id ? person: newPerson))
        setNotificationMessage({
          message: `Updated ${newPerson.name}`, tipo: 'success'
        }
        )
        setTimeout(() => {
          setNotificationMessage({message: "", tipo: ""})
        }, 5000)
        setNewName('')
        setNewNumber('')
      }
    }
  }

  const deletePerson = (id) => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      setNotificationMessage( {message: `Information of '${person.name}' has already removed from server`, tipo: "error"})
          setTimeout(() => {
            setNotificationMessage({message: "", tipo: ""})
          }, 5000)
      personService.remove(person.id)
      setPersons(persons.filter(n => n.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={notificationMessage.message} value={notificationMessage.tipo} />
        <Filter term={newTerm} handleEvent={handleTermChange}/>
      <h2>Add a new</h2>
      <PersonForm 
        onSubmitForm={addPerson} 
        name={newName} 
        handlename={handleNameChange} 
        number={newNumber} 
        handlenumber={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={PersonsToShow} handleDeleteButton={deletePerson}/>
    </div>
  )
}

export default App