import styled from "styled-components";

interface ModalProps {
  children: React.ReactNode;
}
export const Modal = ({ children }: ModalProps) => (
  <ModalContainer>{children}</ModalContainer>
);

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  label {
    display: block;
    margin: 0 0 10px 10px;
  }
  input {
    width: 150px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    margin-left: 10px;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #ccc;
    color: #fff;
    cursor: pointer;
  }
`;
