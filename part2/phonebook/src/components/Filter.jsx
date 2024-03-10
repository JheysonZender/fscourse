const Filter = ({term, handleEvent}) => {
  return (
    <>
    filter shown with <input value={term} onChange={handleEvent}/>
    </>
  )
}

export default Filter