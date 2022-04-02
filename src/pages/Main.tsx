import styled from "styled-components";
import { Board } from "../components/Board";
import { GameSetting } from "../components/GameSetting";
import { GameState } from "../components/GameState";

export const Main = () => {
  return (
    <MainContainer>
      <GameSetting />
      <GameState />
      <Board />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
