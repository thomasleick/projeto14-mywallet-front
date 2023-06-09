import React from 'react';
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MyWalletLogo from "../components/MyWalletLogo";
import useInput from '../hooks/useInput';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { ThreeDots } from 'react-loader-spinner';
const LOGIN_URL = '/login';

export default function SignInPage() {
  const { setAuth } = useAuth();
  const [email, resetEmail, emailAttribs] = useInput('email', '')
  const [pwd, setPwd] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";
  const errRef = useRef();

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd])

  const handlePwdChange = (event) => {
    setPwd(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
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
      setIsLoading(false);
      navigate(from, { replace: true });
    } catch (err) {
      setIsLoading(false);
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
        console.log(err);
      }
    }
  };

  return (
    <SingInContainer>
      <form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <p ref={errRef} aria-live="assertive">{errMsg}</p>
        <input
          placeholder="E-mail"
          type="email"
          required
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
          autoComplete="off"
          {...emailAttribs}
          disabled={isLoading}
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          required
          minLength="3"
          value={pwd}
          onChange={handlePwdChange}
          disabled={isLoading}
        />
        <button disabled={isLoading}>
          {isLoading ?
            <Span><ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#FFFFFF"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            /></Span>
            :
            "Entrar"}
        </button>
      </form>

      <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  );
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
        width: 232px;
        height: 24px;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: salmon;
    }
`;
const Span = styled.span`
    width: 100%;
    height: 24px;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`