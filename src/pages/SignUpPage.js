import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import { useRef, useState, useEffect } from "react";
import axios from '../api/axios';
import { ThreeDots } from 'react-loader-spinner';
const REGISTER_URL = '/register';

export default function SignUpPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";
  const errRef = useRef();

  useEffect(() => {
    setErrMsg('');
  }, [name, email, pwd, confirmPwd])

  const checkPwd = () => { return pwd === confirmPwd }



  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!checkPwd()) {
      setPwd("");
      setConfirmPwd("");
      alert("As senhas digitadas não conferem...");
      setIsLoading(false);
      return;
    }

    try {
      await axios.post(REGISTER_URL,
        JSON.stringify({ name, email, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      setIsLoading(false);
      navigate(from, { replace: true });
    } catch (err) {
      setIsLoading(false);
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Name, Email or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else if (err.response?.status === 409) {
        setErrMsg('Email already in use');
      } else {
        setErrMsg('Register Failed');
        console.log(err);
      }
      errRef.current.focus();
    }
  }

  return (
    <SingUpContainer>
      <form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <p ref={errRef} aria-live="assertive">{errMsg}</p>
        <input
          placeholder="Nome"
          type="text"
          value={name}
          minLength={1}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
        />
        <input
          placeholder="E-mail"
          type="email"
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          minLength={3}
          required
          disabled={isLoading}
        />
        <input
          placeholder="Confirme a senha"
          type="password"
          autoComplete="new-password"
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(e.target.value)}
          minLength={3}
          required
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
            "Cadastrar"}
        </button>
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
`
const Span = styled.span`
    width: 100%;
    height: 24px;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`
