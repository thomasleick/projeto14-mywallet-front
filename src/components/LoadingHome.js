import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import ContentLoader from 'react-content-loader';

const ListItemLoader = () => (
    <ContentLoader
        speed={2}
        width={270}
        height={150}
        viewBox="0 0 270 150"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="15" rx="3" ry="3" width="220" height="12" />
        <circle cx="250" cy="30" r="12" />
        <rect x="0" y="65" rx="3" ry="3" width="220" height="12" />
        <circle cx="250" cy="80" r="12" />
        <rect x="0" y="115" rx="3" ry="3" width="220" height="12" />
        <circle cx="250" cy="130" r="12" />
    </ContentLoader>
);
const TextLoader = () => (
    <ContentLoader
        speed={2}
        width={200}
        height={20}
        viewBox="0 0 200 20"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="0" rx="3" ry="3" width="200" height="20" />
    </ContentLoader>
);

const ButtonLoader = () => (
    <ContentLoader
        speed={2}
        width={200}
        height={100}
        viewBox="0 0 200 100"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="15" cy="15" r="15" />
        <rect x="5" y="50" rx="3" ry="3" width="90" height="30" />
    </ContentLoader>
);

export default function LoadingHomePage() {
    return (
        <HomeContainer>
            <Header>
                <h1>Olá, </h1><TextLoader />
                <BiExit />
            </Header>
            <TransactionsContainer>
                <LoaderContainer>
                    <ListItemLoader />
                </LoaderContainer>
            </TransactionsContainer>
            <ButtonsContainer>
                <button>
                    <ButtonLoader />
                </button>
                <button>
                    <ButtonLoader />
                </button>
            </ButtonsContainer>
        </HomeContainer>
    );
}

const LoaderContainer = styled.span`
  display: flex;
  justify-content: center;
`
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