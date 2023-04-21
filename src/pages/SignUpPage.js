import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";
import axios from '../api/axios';
const REGISTER_URL = '/register';

export default function SignUpPage() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")
  const [confirmPwd, setConfirmPwd] = useState("")
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const checkPwd = () => { return pwd === confirmPwd }
  
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!checkPwd()) {
      setPwd("");
      setConfirmPwd("");
      return alert("As senhas digitadas não conferem...");
    }

    try {
      await axios.post(REGISTER_URL,
        JSON.stringify({ name, email, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log('Signed Up!!!')
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        console.log('No Server Response');
      } else if (err.response?.status === 400) {
        console.log('Missing Name, Email or Password');
      } else if (err.response?.status === 401) {
        console.log('Unauthorized');
      } else if (err.response?.status === 409) {
        console.log('Conflict');
      } else {
        console.log('Register Failed');
      }
    }
  }

  return (
    <SingUpContainer>
      <form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <input
          placeholder="Nome"
          type="text"
          value={name}
          minLength={1}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="E-mail"
          type="email"
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          minLength={3}
          required
        />
        <input
          placeholder="Confirme a senha"
          type="password"
          autoComplete="new-password"
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(e.target.value)}
          minLength={3}
          required
        />
        <button>Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
