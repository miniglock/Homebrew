import styled from "styled-components";

export const Wrapper = styled.div`
  width: 800px;
  margin: auto;
  background-color: ${props => (props.color ? props.color : "white")};
`;

export const Form = styled.form`
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 300px;
  > input {
    margin-bottom: 0.5rem;
  }
`;
