import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const TRANSACTION_URL = '/transaction';

export default function EditTransactionPage() {
    const { state } = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState(state.description)
    const [inputValue, setInputValue] = useState(state.value*100);
    const [formattedValue, setFormattedValue] = useState(state.value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }));
    const type = state.type
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    function handleInputChange(event) {
        const input = event.target;
        const value = input.value.replace(/[,\.]/g, "");
      
        if (!/^\d{0,16}(\,\d{0,2})?$/.test(value)) {
          alert("Invalid input");
          return;
        }
      
        const floatInput = parseFloat(value) / 100;
        const formattedInput = floatInput.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      
        const cursorPos = input.selectionStart;
        setInputValue(value);
        setFormattedValue(formattedInput);
        input.setSelectionRange(cursorPos, cursorPos);
      }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const value = inputValue / 100
        try {
            await axiosPrivate.put(`${TRANSACTION_URL}/${state._id}`, { value, description });
            setIsLoading(false);
            navigate('/home');
        }
        catch (err) {
            console.log(err);
            setIsLoading(false);
            alert('Algum erro aconteceu...')
        }
    }

    return (
        <TransactionsContainer>
            <h1>Editar {type === "in" ? "Entrada" : "Saída"}</h1>
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
                    disabled={isLoading}
                    pattern="^(?!0+(?:,00?)?$)\d{1,3}(?:\.\d{3})*,\d{2}$"
                    title="Enter a positive float in the format (X,XX)"
                />
                <input
                    placeholder="Descrição"
                    type="text"
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    disabled={isLoading}
                />
                <button disabled={isLoading}>Salvar TRANSAÇÃO</button>
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