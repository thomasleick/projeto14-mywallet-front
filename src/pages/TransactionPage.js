import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const TRANSACTION_URL = '/transaction';

export default function TransactionsPage() {

  const params = useParams()
  const type = params.tipo
  const [description, setDescription] = useState('')
  const [inputValue, setInputValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  function handleInputChange(event) {

    const value = event.target.value.replace(/[,\.]/g, "");
  
    if (!/^\d{0,16}(\,\d{0,2})?$/.test(value)) {
      alert("Invalid input");
      return;
    }
    
    const floatInput = parseFloat(value) / 100;
    const formattedInput = floatInput.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    
    setInputValue(value);
    setFormattedValue(formattedInput);
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const value = inputValue/100
    try {
      await axiosPrivate.post(`${TRANSACTION_URL}/${type}`, {value, description});
      navigate('/home');
    }
    catch (err) {
      console.log(err);
      alert('Algum erro aconteceu...')
    }

  }

  return (
    <TransactionsContainer>
      <h1>Nova {type === "in" ? "Entrada" : "Saída"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Valor"
          type="string"
          step="0.01"
          min="0"
          max="100000000000000"
          required
          value={formattedValue}
          onChange={handleInputChange} 

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