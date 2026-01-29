import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: #6366f1;
  font-size: 16px;
  color: white;
  outline: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: #e0e7ff;
    opacity: 1; /* важно для Firefox */
  }

  &:focus {
    border-color: #6366f1;
  }
`;

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
    return <StyledInput {...props} />;
};
