import { useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"

export default function TransactionsPage() {

  const params = useParams()
  const type = params.tipo
  const [value, setValue] = useState('')
  const [description, setDescription] = useState('')



  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(type, value, description)
  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Valor" 
          type="text"
          required
          value={value}
          onChange={e => setValue(e.target.value)}
          />
        <input 
          placeholder="Descrição" 
          type="text"
          required
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button>Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
