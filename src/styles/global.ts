import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    &::-webkit-scrollbar {
			width: 16px;
      border-radius: 8px;
      background-color: ${({ theme }) => theme.colors.primaryBackground};
      border: 3px solid ${({ theme }) => theme.colors.primary};
		}
		&::-webkit-scrollbar-thumb {
			border-radius: 8px;
      background-color: ${({ theme }) => theme.colors.primary};
		}
    &::-webkit-scrollbar-corner {
      background-color: ${({ theme }) => theme.colors.primaryBackground};
    }
  }

  body {
    background-color: ${({ theme }) => theme.colors.primaryBackground};
    color: ${({ theme }) => theme.colors.primaryText};
    font-size: 24px;
    font-weight: 400;
    line-height: 48px;
    letter-spacing: 0em;
    font-family: 'Poppins', sans-serif;
  }
`;
