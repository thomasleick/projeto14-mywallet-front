import { useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const TRANSACTION_URL = '/transaction';

export default function TransactionsPage() {

  const params = useParams()
  const type = params.tipo
  const [description, setDescription] = useState('')
  const [inputValue, setInputValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [backspacePressed, setBackspacePressed] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  function handleInputChange(event) {
    if (backspacePressed) {
      return;
    }
    const value = event.target.value.replace(",", "").replace(".", "");
  
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
  
  function handleKeyDown(event) {
    // Check for backspace key
    if (event.key === 'Backspace') {
      setBackspacePressed(true);
      if (inputValue <= 9) {
        setInputValue("");
        setFormattedValue("0,00");
        return;
      }
      const newInputValue = inputValue.slice(0, -1);
      setInputValue(newInputValue);
      const floatInput = parseFloat(newInputValue) / 100;
    
    const formattedInput = floatInput.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setFormattedValue(formattedInput);
    }
  }
  
  function handleKeyUp(event) {
    if (event.key === 'Backspace') {
      setBackspacePressed(false);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const value = inputValue/100
    try {
      const response = await axiosPrivate.post(`${TRANSACTION_URL}/${type}`, {value, description});
    }
    catch (err) {
      console.log(err);
    }

  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
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
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
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
