const PersonForm = ({onSubmitForm, name, handlename, number, handlenumber}) => {
  return (
    <form onSubmit={onSubmitForm}>
      <div>
        name: <input value={name} onChange={handlename} />
      </div>
      <div>
        number: <input value={number} onChange={handlenumber} />
      </div>
      <div>
        <button type="submit"  >add</button>
      </div>
    </form>
  )
}

export default PersonForm