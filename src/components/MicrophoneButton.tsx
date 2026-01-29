import styled from "styled-components";

interface MicrophoneButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const StyledButton = styled.button<{ active?: boolean }>`
  background-color: #6366f1;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 50%;
  font-size: 20px;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`;

export const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({ active, ...props }) => {
  return <StyledButton active={active} {...props}>🎤</StyledButton>;
};
