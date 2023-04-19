import React from 'react';
import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MyWalletLogo from "../components/MyWalletLogo";
import useInput from '../hooks/useInput';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
const LOGIN_URL = '/login';



export default function SignInPage() {
  const { setAuth } = useAuth();
  const [email, resetEmail, emailAttribs] = useInput('email', '')
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const handlePwdChange = (event) => {
    setPwd(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ email, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      const accessToken = response?.data?.accessToken;
      const name = response?.data?.name;
      const id = response?.data?.id;
      setAuth({ name, email, id, accessToken });
      resetEmail()
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        console.log('No Server Response');
      } else if (err.response?.status === 400) {
        console.log('Missing Username or Password');
      } else if (err.response?.status === 401) {
        console.log('Unauthorized');
      } else {
        console.log('Login Failed');
      }
    }
  };

  return (
    <SingInContainer>
      <form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <input
          placeholder="E-mail"
          type="email"
          required
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
          autoComplete="off"
          {...emailAttribs}
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          required
          minLength="3"
          value={pwd}
          onChange={handlePwdChange}
        />
        <button>Entrar</button>
      </form>

      <Link to="/signup">Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  );
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;