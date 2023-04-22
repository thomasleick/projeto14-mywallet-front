import React from 'react';
import styled from 'styled-components';

const Transaction = ({ props }) => {

    const { date, description, type, value } = props
    return (
        <ListItemContainer>
            <div>
                <span>{new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</span>
                <strong>{description}</strong>
            </div>
            <Value color={type === "out" ? "negativo" : "positivo"}>{value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Value>
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