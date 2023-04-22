import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import Transaction from "../components/Transaction";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
const TRANSACTION_URL = '/transaction';
const LOGOUT_URL = '/logout';

export default function HomePage() {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState('');
  const name = auth.name;
  const navigate = useNavigate();

  const handleNewTransaction = newType => {
    navigate(`/nova-transacao/${newType}`);
  }

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.get(TRANSACTION_URL);
        setTransactions(response.data);
        let newTotal = 0;
        response?.data?.forEach(transaction => {
          transaction.type === "in" ? 
            newTotal += transaction.value 
            : newTotal -= transaction.value
        })
        setTotal(newTotal)
        setIsLoading(false);
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchTransactions();
  }, []);

  const handleLogout = async event => {
    event.preventDefault();
    try {
      await axiosPrivate.post(LOGOUT_URL);
      setAuth('');
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {name}</h1>
        <BiExit onClick={handleLogout}/>
      </Header>

      <TransactionsContainer>
        {isLoading ? <p>Carregando...</p> : <>
          <ul>
            {transactions.map((transaction, id) =>
              <Transaction
                key={`Transaction${id}`}
                props={transaction}
              />
            )}
          </ul>
          <article>
            <strong>Saldo</strong>
            <Value color={total >= 0 ? "positivo" : "negativo"}>{total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Value>
          </article>
        </>
        }
      </TransactionsContainer>

      <ButtonsContainer>
        <button onClick={() => handleNewTransaction("in")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => handleNewTransaction("out")}> 
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
