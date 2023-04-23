import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionPage from "./pages/TransactionPage";
import AuthRoute from "./components/AuthRoute";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import EditTransactionPage from "./pages/EditTransactionPage";

export default function App() {
  return (
    <PagesContainer>
      <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<AuthRoute />} >
          <Route path="/" element={<SignInPage />} exact />
          <Route path="/cadastro" element={<SignUpPage />} />
        </Route>
        {/*<Route element={<PersistLogin />}>*/}
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/nova-transacao/:tipo" element={<TransactionPage />} />
            <Route path="/editar-transacao" element={<EditTransactionPage />} />
          </Route>
        </Route>
      </Routes>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`;
