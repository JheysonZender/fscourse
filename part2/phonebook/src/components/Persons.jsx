const Persons = ({persons, handleDeleteButton}) => {
  return (
    <>
    {persons.map(person => 
    <p key={person.name}>
      {person.name} {person.number} <button onClick={()=>handleDeleteButton(person.id)}> delete</button>
    </p>)}
    </>
  )
}

export default Persons