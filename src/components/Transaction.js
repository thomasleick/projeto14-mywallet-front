import React from 'react';
import styled from 'styled-components';
import deleteIcon from '../images/delete.svg'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
const TRANSACTION_URL = '/transaction';

const Transaction = ({ props, transactions, setTransactions }) => {
  const axiosPrivate = useAxiosPrivate();
  const { _id, date, description, type, value } = props;
  const navigate = useNavigate();


  const deleteTransactionFromStateList = (id) => {
    const updatedTransactions = transactions.filter((transaction) => transaction._id !== id);
    setTransactions(updatedTransactions);
  };

  const handleDelete = async event => {
    event.preventDefault();
    if (!window.confirm(`Deseja realmente deletar a transação 
        ${description} no valor de ${type === "out" ? "-" : ""}
        ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} ?`))
      return

    try {
      await axiosPrivate.delete(`${TRANSACTION_URL}/${_id}`);
      deleteTransactionFromStateList(_id);
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleClickEdit = () => {
    navigate('/editar-transacao', { state: props })
  }

  return (
    <ListItemContainer>
      <div>
        <span>{new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</span>
        <strong onClick={handleClickEdit}>{description}</strong>
      </div>
      <Value color={type === "out" ? "negativo" : "positivo"}>{value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Value>
      <img src={deleteIcon} alt="deletar" onClick={handleDelete} />
    </ListItemContainer>
  );
};

const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
export default Transaction;