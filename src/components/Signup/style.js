import styled from "styled-components";

export const MyWrapper = styled.div`
  width: 800px;
  margin: auto;
  background-color: ${props => (props.color ? props.color : "white")};
`;

export const MyForm = styled.form`
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 300px;
  > input {
    margin-bottom: 0.5rem;
  }
`;
